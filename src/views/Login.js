
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
  Alert,
} from "reactstrap";

function Login(props) {

    console.log(props)

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");


    const getUsername = (e) =>{
        setUsername(e.target.value)
    }

    const getPassword = (e) => {
        setPassword(e.target.value)
    }


    const registerHandler = (e)=>{
      props.setRegisterData({
        ...props.registerData,
        [e.target.name] :e.target.value
      })
    }


  return (
    <>
      <div style={{overflow:"hidden",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center"}} className="content">
        <Row style={{flexDirection:"column",justifyContent:"center",alignSelf:"center", alignContent:"center",padding:"10px" }}>
          <Col >
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={"https://th.bing.com/th/id/R.7494ea050cb798c9cc748f2494dfe41c?rik=aQApm%2bi1eyWqkw&pid=ImgRaw&r=0"}
                    />
                    <h5 className="title">Welcome</h5>
                  </a>
                  <p className="description">Admin Panel</p>
                </div>

          {     props.register ?

            <Form>
            <Row>
           
              <Col className="px-md-3" md="6">
                <FormGroup>
                  <label>Name</label>
                  <Input
                    defaultValue="hamza"
                    placeholder="Username"
                    type="text"
                    name="username"
                    onChange={(e)=>registerHandler(e)}
                  />
                </FormGroup>
              </Col>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">
                    Email address
                  </label>
                  <Input placeholder="hamza@email.com" name="email" type="email" 
                    onChange={(e)=>registerHandler(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="12">
                <FormGroup>
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={(e)=>registerHandler(e)}
                  />
                </FormGroup>
              </Col>
             
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Address</label>
                  <Input
                    placeholder="Home Address"
                    type="text"
                    name="address"
                    onChange={(e)=>registerHandler(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label>City</label>
                  <Input
                    defaultValue="Karachi"
                    placeholder="City"
                    type="text"
                    name="city"
                    onChange={(e)=>registerHandler(e)}
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="4">
                <FormGroup>
                  <label>Country</label>
                  <Input
                    defaultValue="Pakistan"
                    placeholder="Country"
                    type="text"
                    name="country"
                    onChange={(e)=>registerHandler(e)}
                  />
                </FormGroup>
              </Col>
              <Col className="pl-md-1" md="4">
                <FormGroup>
                  <label>Postal Code</label>
                  <Input placeholder="ZIP Code" type="number" name="postalcode"
                    onChange={(e)=>registerHandler(e)}
                
                  />
                </FormGroup>
              </Col>
            </Row>
            </Form>

            :
          
          
          
          <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          placeholder="Username"
                          type="text"
                          onChange={(e)=>getUsername(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          placeholder="Password"
                          type="password"
                          onChange={(e)=>getPassword(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                </Form>
                
                
                }
              </CardBody>
              <CardFooter>

                <div style={{ alignItems:"center" }} className="d-flex">
            {props.register ?   <Button onClick={()=> props.registerUser(props.registerData)} className="btn-fill" color="primary" type="button">
                  Register
                </Button> :  <Button onClick={()=> props.loginUser(username,password)} className="btn-fill" color="primary" type="button">
                  Login
                </Button>}
                <h5 style={{ marginLeft:"20px" }} onClick={()=>props.setRegister(!props.register)} className="card-category">{props.register ? "Login":"Register"}</h5>


                </div>


                <div className="button-container">
                  <a href="https://www.facebook.com/hamza.hoda.3/" target="__blank" >
                    <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                    </Button>
                  </a>
                  
                  <a href="https://www.linkedin.com/in/syed-hamza-hoda-83ab3a207/" target="__blank">
                  <Button className="btn-icon btn-round" color="linkedin">
                    <i className="fab fa-linkedin" />
                  </Button>
                  </a>
                  
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
