import React, { useState } from 'react'
import classes from './InpFile.module.css';
import { toast } from 'react-toastify';

const InpFile = (props) => {

    const [file, setFile] = useState('')

    function changeFile(e) {
        if (e.target.files[0].size >  2 * 1024 * 1024) {
            return toast.error('Maximum 2mb file supported!')
        }
        e.target.files[0].isFileChanged=true
        props.fileHandler(e.target.files[0])
        props.labelFunc(e.target.value)
        e.target.value
        setFile(e.target.value)
    }

    const delHandler = () => {
        props.rmvFunc(props.id-1)
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <input className={classes.input} required={props?.required}  value={file}  onChange={changeFile} type="file" id={props?.id} accept={props.accept} />
                <label htmlFor={props.id} className={classes.label}>
                    <span>Choose</span>
                    <span>{props.label == ''? 'File' :props.label}</span>
                </label>
                <div className={classes.p_con}>
                <p className={classes.p}>Maximum 2mb file supported</p>
                {props.rmv && <button onClick={delHandler} type='button' className={classes.btn}>Remove</button> }
                </div>
            </div>
        </React.Fragment>
    )
}

export default InpFile
