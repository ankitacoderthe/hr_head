import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
import classes from './Areachart2.module.css'

class Areachart2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            seriesSpark3: [{
                data: [
                    [1327359600000, 12.95],
                    [1327446000000, 31.34],
                    [1327446000000, 31.34],
                    [1327532400000, 34.18],
                    [1327618800000, 67.05],
                    [1327878000000, 31.00],
                    [1327964400000, 42.95],
                    [1328050800000, 60.24],
                    [1328137200000, 32.29],
                    [1328223600000, 21.85]
                ]
            }],
            optionsSpark3: {
                chart: {
                    type: 'area',
                    sparkline: {
                        enabled: true
                    },
                },
                stroke: {
                    curve: 'straight'
                },
                fill: {
                    opacity: 0.3
                },
                xaxis: {
                    crosshairs: {
                        width: 2
                    },
                },
                yaxis: {
                    min: 0
                },

            }


        }
    }



    render() {
        return (
            <div className={classes.container}>
                <ReactApexChart options={this.state.optionsSpark3} series={this.state.seriesSpark3} type="area" height={'220'} />
            </div>
            )
    }
}

export default Areachart2
