import React, { Component } from 'react';
import Header from '../Header';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, Button, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { compile, abs } from 'mathjs';
import 'antd/dist/antd.css'
import axios from 'axios';


var Algebrite = require('algebrite')
var answer = []
class Trapezoidal extends Component {
    data() {
        axios.get('http://localhost:4000/trapezoidal').then(res => {
          this.setState({
            fx: res.data[0].fx,
            a: res.data[0].a,
            b: res.data[0].b,
          });
          console.log(this.state.fx)
          console.log(this.state.a)
          this.forceUpdate();
          this.Trapezoidal(Number(this.state.a), Number(this.state.b));
        });
    }

    constructor() {
        super();
        this.state = {
            fx: ' ',
            a: 0,
            b: 0,
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
        this.Trapezoidal(parseFloat(this.state.a), parseFloat(this.state.b));
    }

    Trapezoidal(a, b) {
        var h = b - a
        var Ical = (h / 2) * (this.func(a) + this.func(b))
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
                <h1 style={{ textAlign: "center" }}>This is Trapezoidal page</h1>
                <br />
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >F<sub>x</sub></InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="fx" placeholder="2x^3-5x^2+3x+1" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText   >a</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="a" placeholder="0" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText   >b</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="b" placeholder="2" onChange={this.handleChange} />
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
export default Trapezoidal;
