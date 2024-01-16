import classes from './MainTable.module.css'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HoverableTableActions from '../HoverableTableActions/HoverableTableActions'
import { CSVLink } from 'react-csv';
import DownloadIcon from '../../assets/download.png';
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { url } from '../../util';
const MainTable = (props) => {

    const runParentFunc = (data) =>{
        props.searchFunc(data)
    }


    const ExportButton = ({ data }) => {
        // Transform data into CSV format

        let csvData = []
        if (data?.length > 0) {
            console.log(data)

            data.forEach((row, index) => {
                let keyArray = props.keys
let headingArray=props.headings
                if (index === 0) {
                    let mainArray = []
                    headingArray.forEach((key) => {
                        mainArray.push(key['heading'])
                    })
                    csvData.push(mainArray)
                }

                let array = []
                keyArray.forEach((key) => {
                    array.push(row[key])
                })
                csvData.push(array)
            });
            console.log(csvData)
            return (
            <CSVLink data={csvData}  filename={"data.csv"} className={classes.exp_btn}>
                Export to Excel
            </CSVLink>
        );
        }

        
    };
    // const [rows, setRows] = useState(5)
    const location = useLocation();
    const tableHeadings = props.headings
    const tableData = props.data
    const newData = tableData
const [isAscending,setIsAscending]=useState(true)
    const clickHandler = (element) => {
        props.func([true, element])
    }
    const restructureLoan = (month, e) => {
        props.restructureLoan(month)

    }
    // Switch for data uploading
    const runSwitch = (element) => {
        switch (element) {
            case 'name':
                return classes.name_feild
                break;
            case 'attendence':
                return classes.attendence
                break;
            case 'load_req':
                return classes.loan_req
                break;

            default:
                return ''
                break;
        }
    }
    const  togglesorting=()=>{
      
        setIsAscending(isAscending=>!isAscending)
  if(isAscending){
    tableData.sort((a,b)=>{
        if (a.status < b.status) {
            return -1;
          }
          if (a.status > b.status) {
            return 1;
          }
          return 0;
    })
  }else{
    tableData.sort((a,b)=>{
    if (a.status < b.status) {
        return 1;
      }
      if (a.status > b.status) {
        return -1;
      }
      return 0;
  })
    
}
}

    // Set Attendence Table Setting
    const setAttendence = (num) => {
        switch (num) {
            case 1:
                return <div className={classes.present}>Present</div>
            case 2:
                return <div className={classes.absent}>Absent</div>
            case 3:
                return <div className={classes.pending}>Pending</div>

            default:
        }
    }
    const setStatus = (num) => {
        switch (num) {
            case "Approved":
                return <div className={classes.present}>{num}</div>
            case "Completed":
                return <div className={classes.present}>{num}</div>
            case "Rejected":
                return <div className={classes.absent}>{num}</div>
            case "Pending":
                return <div className={classes.pending}>{num}</div>
            case "Present":
                return <div className={classes.present}>{num}</div>
            case "WeekOff":
                return <div className={classes.absent}>{num}</div>
            case "Trial":
                return <div className={classes.present}>{num}</div>
            case "Permanent":
                return <div className={classes.present}>{num}</div>
            case "Absent":
                return <div className={classes.absent}>{num}</div>
            case "On Leave":
                return <div className={classes.absent}>{'Leave'}</div>
            case "Paid":
                return <div className={classes.present}>{num}</div>
            case "Unpaid":
                return <div className={classes.absent}>{num}</div>
            default:
        }
    }

    const setCorrection = (num) => {
        const ret = num === null ? 'Done' : ''
        return ret
    }

    const setLoanReq = num => {
        return <div className={classes.loan_req}>{num}</div>
    }

    const setFine = num => {
        switch (num) {
            case null:
                return <div className={classes.present}>NULL</div>

            default:
                return <div className={classes.fine_req}>{num}</div>
        }
    }

    const setApproval = num => {
        switch (num) {
            case null:
                return <div className={classes.fine_req}>Rejected</div>

            default:
                return <div className={classes.present}>Approved</div>
        }
    }
    const downloadLeaveData = (data, e) => {
        e.preventDefault()
        fetch(data)
            .then(response => {

                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'download'
                    a.click();

                });

            });
    }

    // Table best divider for classes and all 
    const printData = (val, key, img) => {
        switch (key) {
            case 'name':
                return <>
                    {/* <img src={img} alt="" /> */}
                    {val}</>
            case 'tenure':
                return <>
                    {/* <img src={img} alt="" /> */}
                    {val} months</>
            case 'date':
                return <>{val?.split(" ")[0].split("-").reverse().join("-")}</>
            case 'status':
                return setStatus(val)
            case 'correction':
                return val === null ? setCorrection(val) : val
            case 'loan_req':
                return setLoanReq(val)
            case 'advance':
                return setLoanReq(val)
            case 'fine':
                return setFine(val)
            case 'approval':
                return setApproval(val)
            case 'document':
                
                return <a href={url+val} target="_blank" >Preview file</a>
            case 'download':
                
                return <a href="#" onClick={(event) => downloadLeaveData(url + val, event)} >Download file</a>
            default:
                return val
        }
    }
    const statusIcon=(element,index)=>{
        if((element.heading==='Status' ||element.heading==='Request Status') ){
            if(!isAscending){
    
                return <th key={index}>{element.heading}<AiFillCaretUp  onClick={togglesorting}/></th>
            }
            else{
                return <th key={index}>{element.heading}<AiFillCaretDown  onClick={togglesorting}/></th>
                
            }
        }
        else{
    return <th key={index}>{element.heading}</th>
        }
    }

    return (


        <div className={classes.table_container}>
           {props.type!=='button'? <ExportButton disabled={tableData?.length > 0?false:true}  data={tableData} />:null}
            <div style={{ width: props.wd }} className={` ${props.height ? classes.height : ''}`}>
                <table className={`${classes.table} ${props.wd ? classes.spl_t : ''}`}>
                    <thead>
                        <tr>
                            {tableHeadings&&tableHeadings.map((element, index) =>  {return statusIcon(element,index)})}
                            {props.view_btn || props.Btn || props.Lnk || props.Lnk2 || props.Lnk4 === true || props.Lnk06 || props.lnk05 || props.Lnk04 || props.Lnk3 || props.Lnk03 || props.res || props.Lnk6||props.link10||props.lnk11||props.view_btn_roles||props.lnk12 ?
                                <th style={props.Btn ? { textAlign: "center" } : {}}>Action</th>
                                : null}
                        </tr>
                    </thead>
                    <tbody>


                        {tableData?.length > 0 && tableData.map((val, index) => (
                            <tr key={index}>
                                {props.keys&&props.keys.map((element, index) => (
                                    <td key={index}
                                        className={runSwitch(element)}>
                                        {printData(val[element], element, val['image'])}
                                    </td>
                                ))}
                                {
                                    val['restructure'] === true && val['amount'] !== 0 && index !== newData.length - 1 ? <td key={index}> <a href="#" style={{ color: 'var(--bg)' }} onClick={(e) => restructureLoan(val['month'], e)}>Restructure</a> </td> : null
                                }
                                {
                                    props.Btn === true ? <td><button onClick={() => { clickHandler(val) }}>Out</button></td> : null
                                }
                                 {
                                    props.Lnk08 === true ?
                                        <td>
                                           <button onClick={() => { viewHandler(val) }}>View</button>
                                        </td> : null
                                }
                                 {
                                    props.Lnk07 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={props.link1 !== false ? props.link1 + "/" + val.id : false}  Btn={props.App_Btn} link2={props.link2 + "/" + val.id} t1={'view'} t2={'edit'} link4={false} />
                                        </td> : null
                                }
                                {
                                    props.Lnk06 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={props.link1 !== false ? props.link1 + "/" + val.attendance_id + "/" + val.employee_id : false} Btn={props.App_Btn} link2={props.link2 + "/" + val.id} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk05 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} Btn={props.App_Btn} link1={props.link1 + "/" + val.id + "/" + val.employee_id} link2={props.link2} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={props.link1 !== false ? val.status === 'Pending' || location.pathname === '/salary_details' ? props.link1 + "/" + val.attendance_id + "/" + val.employee_id : false : false} Btn={props.App_Btn} link2={props.link2 !== false ? props.link2 + "/" +val.datetime+"/"+ val.employee_id : false} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4 !== false ? props.link4 + "/" + val.id : false} t4={props.t4} />
                                        </td> : null
                                }

                                {
                                    props.Lnk1 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={props.link1 !== false ? props.link1 + "/" + val.attendance_id + "/" + val.employee_id : false} Btn={props.App_Btn} link2={props.link2 !== false ? props.link2 + "/" + val.id + "/" + val.employee_id : false} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk2 === true ?
                                        <td>
                                            <Link to={props.link1 + "/" + val.id} className={classes.Lnk2}>View</Link>
                                        </td> : null
                                }
                                {
                                    props.Lnk3 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={val.status === 'Pending' ? props.link1 + "/" + val.id + "/" + val.employee_id : false} Btn={props.App_Btn} link2={props.link2 ? props.link2 + "/" + val.id + "/" + val.employee_id : props.link2} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk03 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={false} Btn={props.App_Btn} link2={props.link2 ? props.link2 + "/" + val.id + "/" + val.employee_id : props.link2} t1={false} t2={props.t2} t3={props.t3} link4={false} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk04 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={false} Btn={props.App_Btn} link2={false} t1={props.t1} t2={props.t2} t3={props.t3} link4={true} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk4 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} Btn={props.App_Btn} t3={props.t3} link2={props.link2 + "/" + val.id} link1={props.link1 + "/" + val.id} t1={props.t1} t2={props.t2} link4={props.link4} />
                                        </td>
                                        : null
                                }
                                {
                                    props.Lnk6 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} Btn={props.App_Btn} t3={props.t3} link2={false} link1={false} t1={props.t1} t2={props.t2} link4={props.link4} />
                                        </td>
                                        : null
                                      
                                }
                                {  props.Lnk10 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} Btn={props.App_Btn} t3={props.t3} link2={props.link2} link1={false} t1={props.t1} t2={props.t2} link4={props.link4} />
                                        </td>
                                        : null}
                                {
                                    props.view_btn  && 
                                    <td>
                                        <button onClick={()=>runParentFunc(val.empID)} type='button'>View</button>
                                    </td>
                                }
                                 {
                                    props.view_btn_roles  && 
                                    <td>
                                        <button onClick={(e)=>runParentFunc(val.name)} type='button'>View</button>
                                    </td>
                                }
                                {
                                    props.Lnk11 === true ?
                                    <td>
                                        <HoverableTableActions Element={val} onClickFunc={clickHandler} Btn={false} t3={false} link2={props.link2+"/"+val.id} link1={false} t1={false} t2={'Edit Location'} link4={false} />
                                    </td>
                                    : null
                                }
                                {
                                    props.Lnk12 === true ?
                                    <td>
                                        <HoverableTableActions Element={val} onClickFunc={clickHandler} Btn={false} t3={false} link2={props.link2+"/"+val.id} link1={false} t1={false} t2={'Edit Department'} link4={false} />
                                    </td>
                                    : null
                                }
                                

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <input
                id='entries'
                className={props.Inp === false ? classes.none : classes.table_input}
                type="number"
                value={rows}
                min={3}
                max={tableData.length}
                onChange={(e) => { setRows(e.target.value) }} />

            <label className={classes.input_entries} htmlFor="entries">Entries</label> */}
        </div>
    )
}

export default MainTable