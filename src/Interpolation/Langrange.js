import React, { Component } from 'react';
import Header from '../Header';
import { InputGroup, InputGroupAddon, InputGroupText, Container, Row, Col, Button, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Input, Table, Layout } from 'antd';
import { det, round } from 'mathjs';
import 'antd/dist/antd.css'

var A = [], B = [], answer = []
var X = [], Fx = []
class Langrange extends Component {

    constructor() {
        super();
        this.state = {
            nPoint: 0,
            x:0,
            InputX: false,
            OutputAns: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.Langrange(this.state.nPoint,this.state.x)
    }

    Langrange(nPoint,x) {
        this.initX()
        console.log(x)
        console.log(nPoint)
        console.log(X)
        console.log(Fx)
        var ans
        if(nPoint==2){
            console.log("nPoint==2")
            var L0,L1
            L0 = (X[1]-this.state.x)/(X[1]-X[0])
            L1 = (X[0]-this.state.x)/(X[0]-X[1])
            ans = (L0*Fx[0])+(L1*Fx[1])
        }
        if(nPoint==3){
            var L0,L1,L2
            L0 = ((X[1]-this.state.x)*(X[2]-this.state.x))/((X[1]-X[0])*(X[2]-X[0]))
            L1 = ((X[0]-this.state.x)*(X[2]-this.state.x))/((X[0]-X[1])*(X[2]-X[1]))
            L2 = ((X[0]-this.state.x)*(X[1]-this.state.x))/((X[0]-X[2])*(X[1]-X[2]))
            ans = (L0*Fx[0])+(L1*Fx[1])+(L2*Fx[2])
        }
        if(nPoint>3){
            alert("Number of Point must 2 or 3")
        }
        answer.push(ans)
        this.setState({
            OutputAns: true
        })
    }

    

    createNx(nPoint){
        console.log(nPoint)
        for(var i=0;i<nPoint;i++){
            A.push(<Input style={{
                width: "18%",
                height: "50%",
                backgroundColor: "#eddfdf",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"x" + i} key={"x" + i} placeholder={"x" + i} />)
            A.push(<br />)
            B.push(<Input style={{
                width: "18%",
                height: "50%",
                backgroundColor: "#eddfdf",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"fx" + i} key={"fx" + i} placeholder={"fx" + i} />)
            B.push(<br />)
        }
        this.setState({
            InputX: true
        });
    }
        
    initX() {
        for(var i=0 ; i<this.state.nPoint ; i++) {
            X.push(parseFloat(document.getElementById("x"+i).value));
            Fx.push(parseFloat(document.getElementById("fx"+i).value));
        }
    }

    render() {
        return (
            <div className="Cramer">
                <Header />
                <h1>This is Newton Page</h1>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >Number of Point</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="nPoint" placeholder="2-3" onChange={this.handleChange} />
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >x</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="x" placeholder="3.2" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <Button color="primary" size="lg" onClick={() => this.createNx(this.state.nPoint)}>Submit</Button>
                        </Col>
                    </Row>
                    {this.state.InputX && <div><h2>x</h2><br />{A}<h2>F<sub>x</sub></h2><br/>{B}
                    <br /> <Button color="secondary" size="lg" onClick={this.handleSubmit}>Submit</Button></div>}
                    <br />
                    {this.state.OutputAns &&
                        <div>
                        <Card style={{fontSize: "24px", fontWeight: "bold"}}>
                          <CardBody>
                            <CardTitle>Output</CardTitle>
                            <CardText>{answer}</CardText>
                          </CardBody>
                        </Card>
                      </div>
                    }
                </Container>
                
            </div>
        );
    }

    
}

export default Langrange;