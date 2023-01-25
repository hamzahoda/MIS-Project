
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


const ProductForm = ()=> {

    const [submitForm, setSubmitForm] = useState(false)
    const [products,setProducts] = useState([])

    const [data, setData] = useState({
      product_name:"",
      category:"",
    })

    const valuesChangeHandler = (event) =>{
        setData({...data, [event.target.name]: event.target.value})
        console.log(event.target.value)
    }
  

   const saveDataHandler = async()=>{
     

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "products"), data);
      console.log("Document written with ID: ", docRef.id);
      setData({
        product_name:"",
        category:""
      })
      alert("Product added successfuly")
   }


  return (
    <>
      

<div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Product Adding Form</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-md-3" md="5">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                        //   defaultValue="michael23"
                          placeholder="product Name"
                          type="text"
                          name="product_name"
                          onChange={valuesChangeHandler}
                          value={data.product_name}

                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="5">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Category 
                        </label>
                        <Input 
                        placeholder="Enter category " 
                        type="text" 
                        name="category"
                        onChange={valuesChangeHandler}
                        value={data.category}

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
                
                disabled={data.name !=="" && data.product_name !== "" && data.category !=="" ? false : true}

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

export default ProductForm;


