
import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { db } from "../Firebase";
import {getDocs,onSnapshot ,addDoc, collection, query,where } from "@firebase/firestore"

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");

  const [orders, setOrders] = useState("")
  const [products, setProducts] = useState("")

  const setBgChartData = (name) => {
    setbigChartData(name);
  };


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



  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Orders</h5>
                    <CardTitle tag="h2">{orders.length}</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Orders
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                     
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
              {orders.length > 0 &&    <Line
                    data={
                      (canvas) => {
                        let ctx = canvas.getContext("2d");
                    
                        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                    
                        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
                    
                        return {
                          labels: [
                            "JAN",
                            "FEB",
                          ],
                          datasets: [
                            {
                              label: "Orders graph",
                              fill: true,
                              backgroundColor: gradientStroke,
                              borderColor: "#1f8ef1",
                              borderWidth: 2,
                              borderDash: [],
                              borderDashOffset: 0.0,
                              pointBackgroundColor: "#1f8ef1",
                              pointBorderColor: "rgba(255,255,255,0)",
                              pointHoverBackgroundColor: "#1f8ef1",
                              pointBorderWidth: 20,
                              pointHoverRadius: 4,
                              pointHoverBorderWidth: 15,
                              pointRadius: 4,
                              data: [0,orders.length],
                            },
                          ],
                        };}
                    }
                    options={chartExample1.options}
                  />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        

          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Products</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  {products.length}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={
                      (canvas) => {
                        let ctx = canvas.getContext("2d");
                    
                        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                    
                        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
                    
                        return {
                          labels: [
                            "JAN",
                            "FEB",
                          
                          ],
                          datasets: [
                            {
                              label: "Products",
                              fill: true,
                              backgroundColor: gradientStroke,
                              borderColor: "#1f8ef1",
                              borderWidth: 2,
                              borderDash: [],
                              borderDashOffset: 0.0,
                              pointBackgroundColor: "#1f8ef1",
                              pointBorderColor: "rgba(255,255,255,0)",
                              pointHoverBackgroundColor: "#1f8ef1",
                              pointBorderWidth: 20,
                              pointHoverRadius: 4,
                              pointHoverBorderWidth: 15,
                              pointRadius: 4,
                              data: [products.length],
                            },
                          ],
                        };
                      }}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
         
        </Row>
       
      </div>
    </>
  );
}

export default Dashboard;
