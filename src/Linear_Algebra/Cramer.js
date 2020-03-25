import React, { Component } from 'react';
import Header from '../Header';
import { InputGroup, InputGroupAddon, InputGroupText, Container, Row, Col, Button, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Input, Table, Layout } from 'antd';
import { det, round } from 'mathjs';
import 'antd/dist/antd.css'

/*
-2 3 1          9
3 4 -5          0
1 -2 1          -4

x0 = -1
x1 = 2
x2 = 1
*/ 

var A = [], B = [], answer = [], matrixA = [], matrixB = []

class Cramer extends Component {

    constructor() {
        super();
        this.state = {
            col: 0,
            row: 0,
            InputRowCol: true,
            InputMatrix: false,
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

        this.Cramer(this.state.row,this.state.col)
    }

    Cramer(row, column) {
        this.initMatrix()
        var detA = det(A)
        console.log('detA : '+detA)
        console.log(A)
        var n = 0
        while(n<row){
            var X = JSON.parse(JSON.stringify(A))
            for(var i=0;i<row;i++){
               X[i][n] = B[i]
            }
            console.log(X)
            var detX = det(X)
            var ans = detX/detA
            answer.push("X"+(n+1)+" = "+round(ans))
            answer.push(<br/>)
            n++
        }
        console.log(answer)
        this.setState({
            OutputAns: true
        })
    }

    createMatrix(row, column) {
        console.log(row, column)
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%",
                    backgroundColor: "#06d9a0",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} />)
            matrixB.push(<br/>)
        }

        this.setState({
            InputMatrix: true
        });

    }

    initMatrix() {
        for(var i=0 ; i<this.state.row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
    }

    render() {
        return (
            <div className="Cramer">
                <Header />
                <h1>This is Cramer Rule Page</h1>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >Row</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="row" placeholder="3" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >Column</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="column" placeholder="3" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <Button color="primary" size="lg" onClick={() => this.createMatrix(this.state.row, this.state.column)}>Submit</Button>
                        </Col>
                    </Row>
                    {this.state.InputMatrix && <div><h2>Matrix [A]</h2><br />{matrixA}<h2>Matrix [B]</h2><br/>{matrixB}
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

export default Cramer;