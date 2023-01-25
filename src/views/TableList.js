
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





function Tables() {


  // for all investor
  let [products, setProducts] = useState("")
  // for single investor
  let [getProductNameByDetail, setInvestorNameByDetail] = useState("")
  let [getProductNameByName, setInvestorNameById] = useState("")
  let [singleProduct, setSingleProduct] = useState([])
  

  useEffect(() =>
  onSnapshot(collection(db, 'products'),
    snapshot => {
      setProducts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    })
  , [])



 const setProductNameThroughId = (e) =>{
  setInvestorNameById(e.target.value)
 } 

 const setProductNameThroughDetail = (e) =>{
  setInvestorNameByDetail(e.target.value)

 }

  const getProductByName = async() =>{

    const q = query(collection(db, "products"), where("category", "==", getProductNameByName));

    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({id:doc.id,...doc.data()})
    });
    
    console.log(data)

    setSingleProduct(data)

    console.log(getProductNameByName)


  }

  const getProductByDetail = async() => {
    console.log(getProductNameByDetail)
    
    const q = query(collection(db, "products"), where("name", "==", getProductNameByDetail));
    let data = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({id:doc.id,...doc.data()})
    });
    setSingleProduct(data)


  }
  
  

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Product Report";
    const headers = [["ID", "NAME","CATEGORY"]];

    const data = products.map(e=> [e.id, e.name, e.category]);

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
                <CardTitle tag="h4">All Products</CardTitle>
                
                <Button onClick={() => exportPDF()} className="btn-fill" color="primary" type="button">
                Generate Report
                </Button>

              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>

                    {products.length > 0 ? products.map((e,i)=>{
                      return <tr key={i}>
                      <td style={{maxWidth:"350px"}}>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.category}</td>
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
                <CardTitle tag="h4">Search for a Specific Product</CardTitle>
                <p className="category">Use Name or Product Category</p>
               
               
                <Form>
                  <Row>


                <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Search By Categroy</label>
                        <Input
                          // defaultValue="1"
                          placeholder="Category Name"
                          type="text"
                          disabled={getProductNameByDetail !=="" ? true:false}
                          onChange={e => setProductNameThroughId(e)}
                        />
                <Button onClick={()=> getProductByName()} className="btn-fill" color="primary" type="button">
                  Search
                </Button>
                      </FormGroup>
                    </Col>

                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Search By Name</label>
                        <Input
                          placeholder="Product Name"
                          type="text"
                          disabled={getProductNameByName !=="" ? true:false}

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
                    

                    <tr>
                      <th style={{minWidth:"150px",maxWidth:"350px"}}>Id</th>
                      <th style={{minWidth:"150px",maxWidth:"350px"}}>Name</th>
                      <th style={{minWidth:"150px",maxWidth:"350px"}}>Category</th>
                    </tr>



                  </thead>
                  
                  <tbody>
                    {singleProduct !== undefined ? singleProduct.map((e,i) => {
                      return <tr key={i}>
                      <td style={{maxWidth:"350px"}}>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.category}</td>
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

export default Tables;

