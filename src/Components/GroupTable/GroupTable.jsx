import React from 'react'
import classes from './GroupTable.module.css'

const GroupTable = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.table_header}>
                <div>Earning</div>
                <div>Deduction</div>
            </div>
            <div className={classes.table_body}>
                <div className={classes.table_body_div}>
                    <div className={classes.table_body_data_div}>
                        Computed Salary <span>₹{props.salary[0]?.computed.toFixed(2)}</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Commission <span>₹{props.salary[0]?.commission?.toFixed(2)}</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Tea <span>{props.salary[0]?.tea.toFixed(2)}</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Expense <span>₹{props.salary[0]?.expense.toFixed(2)}</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Gross Salary <span>₹{props.salary[0]?.total_earnings.toFixed(2)}</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                    </div>
                    <div className={classes.table_body_data_div}>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Total : <span>₹{props.salary[0]?.net_payable_salary!==null?props.salary[0]?.net_payable_salary.toFixed(2):props.salary[0]?.net_salary.toFixed(2)}</span>
                    </div>
                </div>
                <div className={classes.table_body_div}>
                    <div className={classes.table_body_data_div}>
                        Advance <span>₹{props.salary[0]?.advance.toFixed(2)}</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Adv. EMI <span>₹{props.salary[0]?.loan_emi.toFixed(2)}</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Total Fine <span>₹{props.salary[0]?.fine?.toFixed(2)===undefined?0:props.salary[0]?.fine?.toFixed(2)}</span>
                    </div>
                    {/* <div className={classes.table_body_data_div}>
                        Tea <span>₹{props.salary[0]?.tea?.toFixed(2)}</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Total Expense <span>₹{props.salary[0]?.expense?.toFixed(2)}</span>
                    </div> */}
                    {/* <div className={classes.table_body_data_div}>
                        Advance Salary <span>₹14452</span>
                    </div> */}
                    <div className={classes.table_body_data_div}>
                        Total <span>₹{props.salary[0]?.total_deductions?.toFixed(2)}</span>
                    </div>
                   {props.salary[0]?.esi? <div><div className={classes.table_body_data_div}>
                        ESI <span>₹{props.salary[0]?.esi?.toFixed(2)}</span>
                    </div>
                    </div>:null}
                    <div className={classes.table_body_data_div}>
                        PF <span>₹{props.salary[0]?.pf?.toFixed(2)}</span>
                    </div>
                    {/* <div className={classes.table_body_data_div}>
                        <span></span> <span>₹14452</span>
                    </div> */}
                </div>
            </div>
            <div className={classes.table_footer}>
                <div className={classes.table_footer_data}>
                    Net Salary <span>₹{props.salary[0]?.net_payable_salary!==null?props.salary[0]?.net_payable_salary.toFixed(2):props.salary[0]?.net_salary.toFixed(2)}</span>
                </div>
                <div className={classes.table_footer_data}>
                    Paid Incentive <span>{props.salary[0]?.cash_incentive!==null?"₹"+props.salary[0]?.cash_incentive?.toFixed(2):null}</span>
                </div>
                {/* <div className={classes.table_footer_data}>
                    Remaining Advance <span>₹00</span>
                </div> */}
            </div>
        </div>
    )
}

export default GroupTable
