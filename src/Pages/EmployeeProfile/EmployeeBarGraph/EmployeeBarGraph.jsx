import React from 'react'
import classes from './EmployeeBarGraph.module.css'
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";

class EmployeeBarGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'Net Profit',
                data: [100, 55, 57, 56 , 45]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 450
                },
                colors:['#F17D03'] ,
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '60%',
                        borderRadius: 3,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                          }
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                      return val;
                    },
                    offsetY: -30,
                    style: {
                      fontSize: '12px',
                      colors: ["#304758"]
                    }
                  },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr' , 'May'],
                },
                yaxis: {
                        position: 'top', // top, center, bottom
                     show:false
                },
                fill: {
                    opacity: 1
                }
            },


        };
    }



    render() {
        return (
            <div className={classes.container}>
                <div className={classes.div}>
                    <span>Total Sales</span>
                    <span>In Lacks</span>
                </div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height='300' width='100%' />
            </div>
        );
    }
}

export default EmployeeBarGraph
