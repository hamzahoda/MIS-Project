
import React,{useState,useEffect} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,

} from "reactstrap";
import { db } from "../Firebase";
import {getDocs,onSnapshot ,addDoc, collection, query,where } from "@firebase/firestore"


const Form1 = ()=> {

    const [submitForm, setSubmitForm] = useState(false)
    const [products,setProducts] = useState([])

    const [data, setData] = useState({
      order_id:"",
      customer_name:"",
      employee_name:"",
      product_id :"" ,
      quantity : 0 , 
    
    })

    const valuesChangeHandler = (event) =>{
        setData({...data, [event.target.name]: event.target.value})
        console.log(event.target.value)
    }

    const numberValuesChangeHandler = (event) =>{
      if(event.target.value.length <= 15){
      setData({...data, [event.target.name]: event.target.value.replace(/[a-zA-Z](.*)/g, '')})
      }
    }

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
  

   const saveDataHandler = async()=>{
     
     let product = products.filter(e=> e.id == data.product_id)
     let newdata = {
       ...data,
       product_name:product[0].name
      }
      console.log(newdata)

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "orders"), newdata);
      console.log("Document written with ID: ", docRef.id);
      setData({
        order_id:"",
        customer_name:"",
        employee_name:"",
        product_id :"" ,
        quantity : 0 , 
      
      })
      alert("Order added successfuly")
   }





  return (
    <>
      

<div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Order Creation Form</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Order ID</label>
                        <Input
                        //   defaultValue="michael23"
                          placeholder="ID"
                          type="text"
                          name="order_id"
                          onChange={valuesChangeHandler}
                          value={data.order_id}

                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                        //   defaultValue="michael23"
                          placeholder="Customer Name"
                          type="text"
                          name="customer_name"
                          onChange={valuesChangeHandler}
                          value={data.customer_name}

                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Employee Name
                        </label>
                        <Input 
                        placeholder="Enter Employee Name" 
                        type="text" 
                        name="employee_name"
                        onChange={valuesChangeHandler}
                        value={data.employee_name}

                        />
                      </FormGroup>
                    </Col>
                  </Row>




                  <Row>

                  <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Product Name</label>
                        <Input placeholder="Select Product" type="select" 
                          onChange={valuesChangeHandler}
                          value={data.product_id}
                          name="product_id"
                          >
                           <option value="">Select Product</option>
                           {products.length>0 && products.map((e)=>{
                            return <option key={e.id} value={e.id}>{e.name}</option>
                           })}
                          </Input>
                      </FormGroup>
                    </Col>

                    <Col className="px-md-3" md="6">
                    <FormGroup>
                        <label>Quantity</label>
                        <Input
                        //   defaultValue="Andrew"
                          placeholder="Enter Quantity"
                          type="text"
                          name="quantity"
                          onChange={numberValuesChangeHandler}
                          value={data.quantity}
                          
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>

{ submitForm ?

                <div className="display-loader"><div></div><div></div><div></div><div></div></div>
  

:
              <div>

                <Button 
                
                disabled={data.name !=="" && data.customer_name !== "" && data.employee_name !=="" && data.product !== "" && data.quantity !== "" ? false : true}

                onClick={()=> saveDataHandler()} className="btn-fill" color="primary" type="submit">
                  Save
                </Button>

</div>

}


              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Form1;


