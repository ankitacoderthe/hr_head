
import classes from './RenderCard.module.css'
import img from '../../assets/fav.png'
import { toast } from 'react-toastify'
import { useState } from 'react'

const RenderCard = (props) => {

    const [name,setName] = useState('')

    const changeHandler = (e) => {
        if (e.target.files[0].size >  2 * 1024 * 1024) {
            return toast.error('Maximum 2mb file supported!')
        }
        toast.success('File Updated!')
        const newName  = e.target.value.split('').slice(0,15).join('')
        setName(newName)
        props.func(e.target.files[0]);
    }

    return (
        <div className={classes.rendercard}>
            <img src={props.isPhoto?props?.href:img} alt="file_image_logo" />
            <h5>{name ==''? props.title : name}</h5>
            <div>
                <input value={props.funcVal} onChange={changeHandler} type="file" id={props.id} />
                <label htmlFor={props.id}>Edit</label>
                <a target="_blank" href={props.href}>Preview</a>
            </div>
        </div>
    )
}

export default RenderCard