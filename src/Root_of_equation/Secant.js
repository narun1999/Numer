import React, { Component } from 'react';
import Header from '../Header';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, Button } from 'reactstrap';
import { compile } from 'mathjs';
import { Table, Layout } from 'antd';
import Chart from '../Chart';
import 'antd/dist/antd.css'

var datainChart = [];
var iter = [];
var dataTable = [];
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X0",
        dataIndex: "x0",
        key: "x0"
    },
    {
        title: "X1",
        dataIndex: "x1",
        key: "x1"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        dataIndex: "error",
        key: "error"
    }
];

class Secant extends Component {

    constructor() {
        super();
        this.state = {
            fx: '',
            x0: 0,
            x1: 0,
            iteration: 20,
            chartData: {},
            showTable: false,
            showGraph: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        this.setState({
            chartData: {
                labels: iter,
                datasets: [{
                    label: 'X',
                    data: datainChart,
                    backgroundColor: [
                        'rgba(255,99,132,0.6',
                        'rgba(54,162,235,0.6',
                        'rgba(255,206,86,0.6',
                        'rgba(75,192,192,0.6',
                        'rgba(153,102,255,0.6',
                        'rgba(255,159,64,0.6',
                        'rgba(255,99,132,0.6',
                        'rgba(255,99,132,0.6',
                        'rgba(54,162,235,0.6',
                        'rgba(255,206,86,0.6',
                        'rgba(75,192,192,0.6',
                        'rgba(153,102,255,0.6',
                        'rgba(255,159,64,0.6',
                        'rgba(255,99,132,0.6',
                        'rgba(255,99,132,0.6',
                        'rgba(54,162,235,0.6',
                        'rgba(255,206,86,0.6',
                        'rgba(75,192,192,0.6',
                        'rgba(153,102,255,0.6',
                        'rgba(255,159,64,0.6'
                    ]
                }]
            }
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.Secant(parseFloat(this.state.x0), parseFloat(this.state.x1));
    }

    Secant(x0, x1) {
        //console.log(x0, x1);
        var fx0, fxi, dfxi, e, xi;
        var i = 0;
        var data = [];
        data['x0'] = [];
        data['x1'] = [];
        data['x'] = [];
        data['error'] = [];
        do {
            data['x0'][i] = x0.toFixed(6);
            data['x1'][i] = x1.toFixed(6);
            fx0 = this.func(x0);
            fxi = this.func(x1);
            dfxi = (fx0 - fxi) / (x0 - x1);
            xi = x0 - (fx0 / dfxi);
            data['x'][i] = xi.toFixed(6);
            //console.log(xi); 
            e = this.Error(x1, x0);
            data['error'][i] = e.toFixed(6);
            x0 = x1;
            x1 = xi;
            iter.push(i);
            i++;
            //console.log("------------");
        } while (e > 0.000001 && i < 20)
        for (var k = 0; k < iter.length; k++) {
            //console.log(data['x'][k])
            datainChart.push(data['x'][k]);
        }
        this.CreatedataTable(data['x0'], data['x1'], data['x'], data['error']);
        this.setState({
            showTable: true,
            showGraph: true
        })
    }

    CreatedataTable(x0, x1, x, error) {
        dataTable = [];
        for (var i = 0; i < x0.length; i++) {
            dataTable.push({
                iteration: i,
                x0: x0[i],
                x1: x1[i],
                x: x[i],
                error: error[i]
            })
        }
    }

    func(X) {
        var expr = compile(this.state.fx);
        var scope = { x: parseFloat(X) };
        //console.log(expr.evaluate(scope));
        return expr.evaluate(scope);
    }

    Error(Xnew, Xold) {
        return Math.abs((Xnew - Xold) / Xnew);
    }

    render() {
        return (
            <div className="App">
                <Header />
                <h1 style={{ textAlign: "center" }}>Secant Method</h1>
                <br />
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >F<sub>x</sub></InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="fx" placeholder="x^3-x-1" value={this.state.fx} onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText   >X<sub>0</sub></InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="x0" placeholder="1.0" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText   >X<sub>1</sub></InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="x1" placeholder="2.0" onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <Button color="primary" size="lg" onClick={this.handleSubmit}>Submit</Button>
                        </Col>
                    </Row>
                </Container>
                {this.state.showTable &&
                    <Table bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }} columns={columns} dataSource={dataTable}></Table>
                }
                {this.state.showGraph &&
                    <Chart chartData={this.state.chartData} name="False_Position Method" legendPosition="bottom" />
                }
            </div>

        );
    }
}
export default Secant;