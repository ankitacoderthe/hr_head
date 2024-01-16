import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";

class Donutchart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [this.props.series],
            options: {
                chart: {
                    type: 'radialBar',


                }, dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: '75%',

                        },
                        track: {
                            margin: 0,
                            borderRadius: 10
                        },
                        dataLabels: {
                            show: false
                        }
                    }
                },
                colors: ['#F17D03'],
                stroke: {
                    lineCap: 'round'
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 100
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },


        };
    }



    render() {
        return (
            <ReactApexChart
                options={this.state.options}
                series={[this.props.series]}
                type="radialBar"
                height={'100%'} />
        )
    }
}

export default Donutchart