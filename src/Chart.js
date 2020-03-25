import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
        
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend:true,
        legendPosition:'right',
        name:"Bisection Method"
    }
    render(){
        return (
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    options={{ 
                        title:{
                            display:this.props.displayTitle,
                            text:this.props.name,
                            fontSize:25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        } 
                    }}
                />
            

            </div>
        )
    }
}
export default Chart;