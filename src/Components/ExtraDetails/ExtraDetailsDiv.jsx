import classes from './ExtraDetails.module.css'

const ExtraDetailsDiv = (props) => {
    return (<div key={props.index} className={classes.extra_details_div}>
        <h5>{props.title}</h5>
        <p>{props.value}</p>
    </div>
    )
}

export default ExtraDetailsDiv