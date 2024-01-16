import classes from "./AdditionalDiv.module.css";

const AdditionalDiv = (props) => {
  return (
    <div key={props?.inx} className={classes.div}>
      {props?.title}
      <span>{props?.value}</span>
    </div>
  );
};

export default AdditionalDiv;
