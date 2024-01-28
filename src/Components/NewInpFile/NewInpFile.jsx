import React from 'react'
import classes from './NewInpFile.module.css'
import { useState } from 'react'
const NewInpFile = (props) => {

    const [value,setValue] = useState('Choose File...')
const [file,setFile]=useState(null)
    const changeFilehandler = (e) =>{
        setValue(e.target.value)
        setFile(e.target.files[0])
    }

    const  submitForm = (e) => {
        e.preventDefault()
        console.log(e)
      props.func(file)
    }

    return (
        <form onSubmit={submitForm} className={classes.form}>
            <input onChange={changeFilehandler} id='1' type="file" accept='.csv' />
            <label htmlFor="1">
                {value}
            </label>
            <button type='submit'>Upload</button>
        </form>
    )
}

export default NewInpFile