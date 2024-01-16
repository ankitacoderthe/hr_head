import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import classes from './Layout.module.css'

const Layout = (props) => {

    const [sidebar, setSidebar] = useState(false)

    const sidebarToggleHandler = () =>{
        sidebar===true?setSidebar(false):setSidebar(true)
    }


    return (
        <div className={classes.layout}>

            {/* Left side which Contains Sidebar */}
            <div className={`${classes.layout_right} ${sidebar===true? classes.sidebar_true:''}`}>
                <Sidebar onSideberBtn={sidebarToggleHandler} />
            </div>

            {/* Right side which Contains Navbar */}
            <div className={`${classes.layout_left}`}>
                <Navbar onSideberBtn={setSidebar} />
                {props.children}
            </div>
            
        </div>
    )
}

export default Layout