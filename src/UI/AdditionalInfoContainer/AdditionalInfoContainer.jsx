import AdditionalDiv from '../../Components/AdditionalDivs/AdditionalDiv'
import classes from './AdditionalInfoContainer.module.css'

const AdditionalInfoContainer = (props) => {
  return (
    props?.data?.map((element,index)=>(
        <AdditionalDiv inx={index} key={index} title={element.title} value={element.value} />
    ))
  )
}

export default AdditionalInfoContainer