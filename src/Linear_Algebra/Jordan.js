import React, { Component } from 'react';
import Header from '../Header';
import { InputGroup, InputGroupAddon, InputGroupText, Container, Row, Col, Button, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Input, Table, Layout } from 'antd';
import { round } from 'mathjs';
import 'antd/dist/antd.css'

var A = [], B = [], X ,answer = [], matrixA = [], matrixB = []

class Jordan extends Component {

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

        this.Jordan(this.state.row,this.state.col)
    }

    Jordan(row, column) {
        this.initMatrix()
        var n = this.state.row
        var k=1
        while(k<this.state.row){
            for(var i=k;i<this.state.row;i++){
                var z = A[i][k-1]/A[k-1][k-1];
                for(var j=k-1;j<this.state.column;j++){
                    A[i][j] = A[i][j]-(z*A[k-1][j]);
                }
                B[i] = B[i]-(z*B[k-1])
            }
            k++
        }
        for(k=n-1;k>=0;k--){
            for(var i=k;i>=0;i--){
                if(i==k){
                    var z = 1 / A[i][k]
                    for(var j=0;j<n;j++){
                        A[i][j] = A[i][j]*z
                    }
                    B[i] = B[i]*z
                }
                else{
                    var z = A[i][k] / A[k][k]
                    for(j=0;j<n;j++){
                        A[i][j] = A[i][j] - z*A[k][j]
                    }
                    B[i] = B[i] - z*B[k]
                }
            }
        }
        for(i=0;i<n;i++){
            answer.push(round(B[i]))
            answer.push(<br/>)
        }
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
                <h1>This is Jordan Page</h1>
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

export default Jordan;