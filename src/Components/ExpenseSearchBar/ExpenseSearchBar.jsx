import React, { useState } from 'react'
import classes from './ExpenseSearchBar.module.css'
import Img from '../../assets/search.png'
const ExpenseSearchBar = (props) => {
    const [text, setText] = useState('')
    const setSearchText = () => {
        props.func(text)
        setText('')
    }
    return (
        <div className={classes.searchbar_container}>
            <input type="text" placeholder='Search Employees...' onChange={(e) => { setText(e.target.value) }} value={text} />
            <button onClick={setSearchText} type='button'><img src={Img} alt="" /></button>
        </div>
    )
}
export default ExpenseSearchBar