
import React,{useEffect,useState} from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { db } from "../Firebase";
import {getDocs,onSnapshot ,addDoc, collection, query,where } from "@firebase/firestore"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  FormGroup,
  CardFooter,
  Button,
  Form
} from "reactstrap";





function Orders() {


  // for all investor
  let [orders, setOrders] = useState("")
  // for single investor
  let [getOrderNameByDetail, setOrderNameByDetail] = useState("")
  let [getOrderNameByName, setOrderNameById] = useState("")
  let [singleOrder, setSingleOrder] = useState([])
  

  useEffect(() =>
  onSnapshot(collection(db, 'orders'),
    snapshot => {
      setOrders(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    })
  , [])



 const setProductNameThroughId = (e) =>{
  setOrderNameById(e.target.value)
 } 

 const setProductNameThroughDetail = (e) =>{
  setOrderNameByDetail(e.target.value)

 }

  const getProductByName = async() =>{

    const q = query(collection(db, "orders"), where("employee_name", "==", getOrderNameByName));

    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({id:doc.id,...doc.data()})
    });
    
    console.log(data)

    setSingleOrder(data)

    console.log(getOrderNameByName)


  }

  const getProductByDetail = async() => {
    console.log(getOrderNameByDetail)
    
    const q = query(collection(db, "orders"), where("customer_name", "==", getOrderNameByDetail));

    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({id:doc.id,...doc.data()})
    });

    setSingleOrder(data)

  }
  
  

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Product Report";
    const headers = [["ORDERID", "CUSTOMERNAME","EMPLOYEENAME","PRODUCTNAME","QUANTITY","PRODUCTID"]];

    const data = orders.map(e=> [e.order_id, e.customer_name, e.employee_name,e.product_name,e.quantity,e.product_id]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All orders</CardTitle>
                
                <Button onClick={() => exportPDF()} className="btn-fill" color="primary" type="button">
                Generate Report
                </Button>

              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Order Id</th>
                      <th>Customer Name</th>
                      <th>Employee Name</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Product Id</th>
                    </tr>
                  </thead>
                  <tbody>

                    {orders.length > 0 ? orders.map((e,i)=>{
                      return <tr key={i}>
                      <td style={{maxWidth:"350px"}}>{e.order_id}</td>
                      <td>{e.customer_name}</td>
                      <td>{e.employee_name}</td>
                      <td>{e.product_name}</td>
                      <td>{e.quantity}</td>
                      <td>{e.product_id}</td>
                    </tr>

                    }):<tr><td>List Empty</td>
                    </tr>}



                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Search for a Specific Order</CardTitle>
               
               
                <Form>
                  <Row>


                <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Search By employee name</label>
                        <Input
                          // defaultValue="1"
                          placeholder="Employee Name"
                          type="text"
                          disabled={getOrderNameByDetail !=="" ? true:false}
                          onChange={e => setProductNameThroughId(e)}
                        />
                <Button onClick={()=> getProductByName()} className="btn-fill" color="primary" type="button">
                  Search
                </Button>
                      </FormGroup>
                    </Col>

                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Search By Customer Name</label>
                        <Input
                          placeholder="Customer Name"
                          type="text"
                          disabled={getOrderNameByName !=="" ? true:false}

                          onChange={e => setProductNameThroughDetail(e)}

                        />
                <Button onClick={()=> getProductByDetail()} className="btn-fill" color="primary" type="button">
                  Search
                </Button>
                      </FormGroup>
                    </Col>

                    </Row>
                    </Form>

              </CardHeader>

              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    

                  <th>Order Id</th>
                      <th>Customer Name</th>
                      <th>Employee Name</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Product Id</th>



                  </thead>
                  
                  <tbody>
                    {singleOrder !== undefined ? singleOrder.map((e,i) => {
                      return <tr key={i}>
                     <td style={{maxWidth:"350px"}}>{e.order_id}</td>
                      <td>{e.customer_name}</td>
                      <td>{e.employee_name}</td>
                      <td>{e.product_name}</td>
                      <td>{e.quantity}</td>
                      <td>{e.product_id}</td>
                    </tr>
                    
                    } )
                    
                    :null}
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Orders;

