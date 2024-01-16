import { Link } from 'react-router-dom'
import DetailsDiv from '../../Components/DetailsDiv/DetailsDiv'
import classes from './DetailsDivContainer.module.css'

const DetailsDivContainer = ({data}) => {
  return (
    <div className={classes.container}>
        <div className={classes.heading_div}>
            <h3>Employee Details</h3>
            {/* <Link to={'/'} className={classes.heading_link}>More Details</Link> */}
        </div>
        {data.map((val,index)=>(
            <DetailsDiv num={index}  key={index}  title={val.title} value={val.value}  />
        ))}
    </div>
  )
}

export default DetailsDivContainer