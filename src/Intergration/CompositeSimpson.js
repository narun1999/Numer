import React, { Component } from 'react';
import Header from '../Header';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, Button, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { compile, abs } from 'mathjs';
import { Table, Layout } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios';


var Algebrite = require('algebrite')
var answer = []
var x = []
class CompositeSimpson extends Component {
    data() {
        axios.get('http://localhost:4000/composite').then(res => {
          this.setState({
            fx: res.data[0].fx,
            a: res.data[0].a,
            b: res.data[0].b,
            n: res.data[0].n
          });
          console.log(this.state.fx)
          console.log(this.state.a)
          this.forceUpdate();
          this.CompositeSimpson(Number(this.state.a), Number(this.state.b), Number(this.state.n));
        });
    }
    constructor() {
        super();
        this.state = {
            fx: ' ',
            a: 0,
            b: 0,
            n: 0,
            showOutput: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.data = this.data.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log(this.state.fx);
        this.CompositeSimpson(parseFloat(this.state.a), parseFloat(this.state.b), parseFloat(this.state.n));
    }

    CompositeSimpson(a, b, n) {
        var h = (b - a)/n
        x[0] = a
        for(var i=0;i<n;i++){
            x[i+1] = x[0]+((i+1)*h)
        }
        console.log(x)
        var sum1 = 0
        var sum2 = 0
        for(var i=1;i<n;i++){
            if(i%2 != 0){
                console.log("Doing sum1"+" "+x[i])
                sum1 += this.func(x[i])
            }
            else{
                console.log("Doing sum2"+" "+x[i])
                sum2 += this.func(x[i])
            }
        }
        console.log(sum1)
        console.log(sum2)
        var Ical = (h / 3) * (this.func(a) + this.func(b) + (4*sum1) + (2*sum2))
        var Ieval = this.Integrate(a,b)
        var error = abs((Ieval-Ical)/Ieval)
        console.log(Ieval, error)
        answer.push("Ical = "+Ical.toFixed(6))
        answer.push(<br/>)
        answer.push("Ieval = "+Ieval.toFixed(6))
        answer.push(<br/>)
        answer.push("Error = "+error.toFixed(6))
        this.setState({
            showOutput: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        var scope = { x: parseFloat(X) };
        //console.log(expr.evaluate(scope));
        return expr.evaluate(scope);
    }

    

    Integrate(a,b){
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})
    }

    render() {
        return (

            <div className="App">
                <Header />
                <h1 style={{ textAlign: "center" }}>This is CompositeSimpson page</h1>
                <br />
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >F<sub>x</sub></InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="fx" placeholder="4x^5-3x^4+x^3-6x+2" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText   >a</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="a" placeholder="2" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText   >b</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="b" placeholder="8" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText   >n</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="n" placeholder="2" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <Button color="primary" size="lg" onClick={this.handleSubmit}>Submit</Button>
                            <br />
                            <Button color="secondary" size="sm" onClick={this.data}>Auto</Button>
                        </Col>
                    </Row>
                    {this.state.showOutput && 
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
export default CompositeSimpson;
