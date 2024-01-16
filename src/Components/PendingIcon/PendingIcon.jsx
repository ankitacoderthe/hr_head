import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {react} from 'react'
import Cookies from 'universal-cookie'
import classes from './PendingIcon.module.css'
import { baseURL } from '../../util'
const PendingIcon=(props)=>{
    const cookies =new Cookies()
const token=cookies.get("hr_head_token")
const [pending,setPending]=useState(0)
const headers = { "Authorization": "Bearer " + token }
    useEffect(()=>{
    axios.get(baseURL+"api/getPendingInModules?table_name="+props.table_name,{headers}).then((response)=>{
setPending(response.data[0].count_id)
    })
    },[])
    return(
        <div className={classes.pending}>
            {pending}
        </div>
    )
}
export default PendingIcon
