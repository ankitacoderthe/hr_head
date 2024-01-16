import React, { useState, useEffect } from 'react';
import './entrypage.css';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
const Entrypage = (props) => {
    const [selectedOption, setSelectedOption] = useState(10)
    const [page, setPage] = useState(1)
    useEffect(() => {
        props.selectEntries(selectedOption)
    }, [selectedOption])
    useEffect(() => {
        props.selectPage(page)
    }, [page])
    return (
        <div className="attend-paginatn">
            <Form>
                <Form.Group className='entry'>
                    <Form.Label>Entries</Form.Label>
                    <Form.Select required value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
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
                    </Form.Select>
                </Form.Group>
            </Form>
            <Pagination>
                <Pagination.Prev />
                <Pagination.Item active={page === '1'} key={1} onClick={(e) => setPage(e.target.text)}>{1}</Pagination.Item>
                <Pagination.Item key={2} active={page === '2'} onClick={(e) => setPage(e.target.text)}>{2}</Pagination.Item>
                <Pagination.Item key={3} active={page === '3'} onClick={(e) => setPage(e.target.text)}>{3}</Pagination.Item>
                <Pagination.Item key={4} active={page === '4'} onClick={(e) => setPage(e.target.text)}>{4}</Pagination.Item>
                <Pagination.Item key={5} active={page === '5'} onClick={(e) => setPage(e.target.text)}>{5}</Pagination.Item>
                <Pagination.Item key={6} active={page === '6'} onClick={(e) => setPage(e.target.text)}>{6}</Pagination.Item>
                <Pagination.Item key={7} active={page === '7'} onClick={(e) => setPage(e.target.text)}>{7}</Pagination.Item>
                <Pagination.Item key={8} active={page === '8'} onClick={(e) => setPage(e.target.text)}>{8}</Pagination.Item>
                <Pagination.Next />
            </Pagination>
        </div>
    )
}
export default Entrypage