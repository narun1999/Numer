import React, { Component } from 'react';
import Header from '../Header';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, Button } from 'reactstrap';
import { compile } from 'mathjs';
import { Table, Layout } from 'antd';
import Chart from '../Chart';
import 'antd/dist/antd.css'
import axios from 'axios';

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
    title: "XL",
    dataIndex: "xl",
    key: "xl"
  },
  {
    title: "XR",
    dataIndex: "xr",
    key: "xr"
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

class False_Position extends Component {

  data() {
    axios.get('http://localhost:4000/falseposition').then(res => {
      this.setState({
        fx: res.data[0].fx,
        xl: res.data[0].xl,
        xr: res.data[0].xr,
      });
      console.log(this.state.fx)
      console.log(this.state.xl)
      this.forceUpdate();
      this.False_Position(Number(this.state.xl), Number(this.state.xr));
    });
  }
  constructor() {
    super();
    this.state = {
      fx: '',
      xl: 0,
      xr: 0,
      iteration: 20,
      chartData: {},
      showTable: false,
      showGraph: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.data = this.data.bind(this);
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
    //alert('A name was submitted: ' + this.state.fx);
    //alert('A name was submitted: ' + this.state.xl);
    event.preventDefault();
    //console.log(this.state.fx);
    //console.log(this.state.xl);
    //console.log(this.state.xr);
    this.False_Position(parseFloat(this.state.xl), parseFloat(this.state.xr));
  }


  False_Position(xl, xr) {
    var xm, xmn, fxr, fxl, fxm, e;
    var data = [];
    data['xl'] = [];
    data['xr'] = [];
    data['x'] = [];
    data['error'] = [];
    fxl = this.func(xl);
    fxr = this.func(xr);
    xm = ((xl * fxr) - (xr * fxl)) / (fxr - fxl);
    fxm = this.func(xm);
    data['xl'][0] = xl.toFixed(6);
    data['xr'][0] = xr.toFixed(6);
    data['x'][0] = xm.toFixed(6);
    data['error'][0] = "-";
    if (fxm * fxr > 0) {
      xr = xm;
    }
    else {
      xl = xm;
    }
    iter.push(0);
    var i = 1;
    do {
      fxl = this.func(xl);
      fxr = this.func(xr);
      xmn = ((xl * fxr) - (xr * fxl)) / (fxr - fxl);
      fxm = this.func(xmn);
      data['xl'][i] = xl.toFixed(6);
      data['xr'][i] = xr.toFixed(6);
      data['x'][i] = xmn.toFixed(6);
      if (fxm * fxr > 0) {
        xr = xmn;
      }
      else {
        xl = xmn;
      }
      e = this.Error(xmn, xm);
      data['error'][i] = e.toFixed(6);
      xm = xmn;
      //console.log("Iteration : ",i," error is : ",e.toFixed(6))
      iter.push(i);
      i++;
    } while (e > 0.000001 && i < 20)
    for (var k = 0; k < iter.length; k++) {
      //console.log(data['x'][k])
      datainChart.push(data['x'][k]);
    }
    this.CreatedataTable(data['xl'], data['xr'], data['x'], data['error']);
    this.setState({
      showTable: true,
      showGraph: true
    })
  }

  CreatedataTable(xl, xr, x, error) {
    dataTable = [];
    for (var i = 0; i < xl.length; i++) {
      dataTable.push({
        iteration: i,
        xl: xl[i],
        xr: xr[i],
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
      <div className="False_Position">
        <Header />
        <h1 style={{ textAlign: "center" }}>False Position Method</h1>
        <br />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText >F<sub>x</sub></InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="fx" placeholder="(1/x)-43" value={this.state.fx} onChange={this.handleChange} />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText   >X<sub>L</sub></InputGroupText>
                </InputGroupAddon>
                <Input type="number" name="xl" placeholder="0.02" onChange={this.handleChange} />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText   >X<sub>R</sub></InputGroupText>
                </InputGroupAddon>
                <Input type="number" name="xr" placeholder="0.03" onChange={this.handleChange} />
              </InputGroup>
              <br />
              <Button color="primary" size="lg" onClick={this.handleSubmit}>Submit</Button>
              <br/>
              <Button color="secondary" size="sm" onClick={this.data}>Auto</Button>
            </Col>
          </Row>
          {this.state.showTable &&
            <Table bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }} columns={columns} dataSource={dataTable}></Table>
          }
          {this.state.showGraph &&
            <Chart chartData={this.state.chartData} name="False_Position Method" legendPosition="bottom" />
          }
        </Container>

      </div>
    );
  }
}
export default False_Position;
