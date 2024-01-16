import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";


class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'Net Profit',
                data: [100, 55, 57, 56, 61, 58]
            }, {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 450
                },
                    colors: ['#F17D03', '#96503F'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '60%',
                        // endingShape: 'rounded',
                        borderRadius: 2,
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'],
                },
                yaxis: {
                    // title: {
                    //     text: '$ (thousands)'
                    // }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                }
            },


        };
    }



    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height='100%' width='100%' />
        );
    }
}


export default BarChart