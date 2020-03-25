import React, { Component } from 'react';
import Header from '../Header';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, Button } from 'reactstrap';
import { compile, derivative } from 'mathjs';
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
        title: "Error",
        dataIndex: "error",
        key: "error"
    }
];

class Newton_Rapshon extends Component {

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
        this.Newton_Rapshon(parseFloat(this.state.x0));
    }

    Newton_Rapshon(x0) {
        var x1, fx, dfx, e;
        var i = 0;
        var data = [];
        data['x0'] = [];
        data['x1'] = [];
        data['error'] = [];
        do {
            fx = this.func(x0);
            dfx = this.difFunc(x0);
            x1 = x0 - (fx / dfx);
            data['x0'][i] = x0.toFixed(6);
            data['x1'][i] = x1.toFixed(6);
            //console.log(x1);
            e = this.Error(x1, x0);
            data['error'][i] = e.toFixed(6);
            x0 = x1;
            iter.push(i);
            i++;
            //console.log("-------------");
        } while (e > 0.000001 && i < 20)
        for (var k = 0; k < iter.length; k++) {
            //console.log(data['x'][k])
            datainChart.push(data['x1'][k]);
        }
        this.CreatedataTable(data['x0'], data['x1'], data['error']);
        this.setState({
            showTable: true,
            showGraph: true
        })
    }

    CreatedataTable(x0, x1, error) {
        dataTable = [];
        for (var i = 0; i < x0.length; i++) {
            dataTable.push({
                iteration: i,
                x0: x0[i],
                x1: x1[i],
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
    difFunc(X) {
        var expr = derivative(this.state.fx, 'x');
        var scope = { x: parseFloat(X) };
        //console.log(expr.evaluate(scope));
        return expr.evaluate(scope);
    }
    Error(Xnew, Xold) {
        return Math.abs((Xnew - Xold) / Xnew);
    }
    render() {
        return (
            <div className="Newton_Raphson">
                <Header />
                <h1 style={{ textAlign: "center" }}>Newton Rapshon Method</h1>
                <br />
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >F<sub>x</sub></InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="fx" placeholder="x^2-5" value={this.state.fx} onChange={this.handleChange} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText   >X<sub>0</sub></InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" name="x0" placeholder="2.0" onChange={this.handleChange} />
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
                    <Chart chartData={this.state.chartData} name="Newton Raphson Method" legendPosition="bottom" />
                }
            </div>
        );
    }
}
export default Newton_Rapshon;