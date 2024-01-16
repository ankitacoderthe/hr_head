import React, { useState, useEffect } from 'react'
import classes from './Pagination.module.css';
import rightarrow from '../../assets/right_arrow.png'
import leftarrow from '../../assets/left_arrow.png'



const Pagination = (props) => {

    const count = props.total;
    const limit = props.limit;
    const last_page = count / limit 

    const [page, setPage] = useState(1)
    const [isActive, setActive] = useState(1)

    const [selectedOption, setSelectedOption] = useState(10)

    const backPageHandler = () => {
        setActive((isActive) => { return isActive - 1 })
        props.selectPage(isActive-1)
    }

    const nextPageHandler = () => {
        setActive((isActive) => { return isActive + 1 })
        props.selectPage(isActive+1)
    }

    let BtnArray = [];

    for (let index = 1; index <= count; index++) {
        let val = <button onClick={() => { setActive(index) }} className={`${classes.pagination_page_btn} ${isActive === index ? classes.active : ''}`}>{index}</button>;
        BtnArray.push(val)
    }
    useEffect(() => {
        props.selectEntries(selectedOption)
    }, [selectedOption])

    useEffect(() => {
        props.selectPage(isActive)
    }, [isActive])

    return (
        <div className={classes.container}>
            <div className={classes.select_container}>
                <label htmlFor="select_colms">Entries</label>
                <select name="select_colms" id="select_colms" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="" disabled selected={selectedOption === 10}>10</option>
                    <option value="1" selected={selectedOption === 1}> 1</option>
                    <option value="2" selected={selectedOption === 2}> 2</option>
                    <option value="3" selected={selectedOption === 3}> 3</option>
                    <option value="4" selected={selectedOption === 4}> 4</option>
                    <option value="5" selected={selectedOption === 5}> 5</option>
                    <option value="6" selected={selectedOption === 6}> 6</option>
                    <option value="7" selected={selectedOption === 7}> 7</option>
                    <option value="8" selected={selectedOption === 8}> 8</option>
                    <option value="9" selected={selectedOption === 9}> 9</option>
                    <option value="10" selected={selectedOption === 10}> 10</option>
                </select>
            </div>
            <div className={classes.pagination_container}>
                <button onClick={backPageHandler} className={classes.pagination_nav_btn} disabled={isActive === 1 ? true : false} ><img src={leftarrow} alt="Left Arrow" /></button>

                <button className={`${classes.pagination_page_btn}`}>{isActive}</button>

                <button onClick={nextPageHandler} className={classes.pagination_nav_btn} disabled={isActive >= last_page ? true : false}><img src={rightarrow} alt="Right Arrow" /></button>
            </div>
        </div>
    )
}

export default Pagination
