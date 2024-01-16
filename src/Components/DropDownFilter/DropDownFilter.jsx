import SelectTag from '../SelectTag/SelectTag'
import classes from './DropDownFilter.module.css'
import Img from '../../assets/shop.png'
import { Link } from 'react-router-dom'
import useHttp from '../../Hooks/use-http'
import { useEffect, useState } from 'react'
import { url } from '../../util'

const DropDownFilter = (props) => {

  // These for fetching data from api
  const [locations, setlocations] = useState([])
  const [floors, setFloors] = useState([])
  const [categories, setCategories] = useState([])
  // These for selected value from select tag
  const [selectedFloor, setSelectedFloor] = useState('')
  const [selectedlocation, setSelectedlocation] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')
const [selectedLocationID,setSelectedLocationId]=useState(null)

  const sumUp = {
    location: selectedlocation,
    floor: selectedFloor
  }

  const { sendRequest: fetchlocations } = useHttp()
  const { sendRequest: fetchFloors } = useHttp()
  const { sendRequest: fetchCategories } = useHttp()

  useEffect(() => {
    const listlocations = (locations) => {
      setlocations(locations)
    }
   
    const listCategories = (Categories) => {
      setCategories(Categories)
    }
    fetchlocations({ url: url+'api/getLocations' }, listlocations)
   
    fetchCategories({ url: url+'api/getCategories' }, listCategories)
  }, [])
  useEffect(()=>{
    if(selectedLocationID!==null){
      const listFloors = (floors) => {
        console.log(floors)
        setFloors(floors)
      }

      fetchFloors({ url: url+'api/getFloors?location_id='+selectedLocationID }, listFloors)
    }
  },[selectedLocationID])
  const selectBylocation = (data) => {
console.log(data.name)
    setSelectedlocation(data)
   let location_id=locations.find((dataOne)=>{
    return dataOne.name===data
   }).id
   setSelectedLocationId(location_id)
    props.selectBylocation(data)
  }
  const selectByFloor = (data) => {
    setSelectedFloor(data)
    props.selectByFloor(data)
  }
  const selectByCategory = (data) => {
    setSelectedCategory(data)
    props.selectByCategory(data)
  }
  return (
    <div style={props.mb ? { marginBottom: '0px' } : {}} className={classes.DropDownFilter}>
      <div className={classes.DropDownFilter_left}>
        <SelectTag data={floors} title={props.title1} selectedVal={selectByFloor} img={Img} />
        <SelectTag  data={locations} selectedVal={selectBylocation} title={props.title2} img={Img} />
      </div>

      {
        props.Btn ?
          <div className={classes.DropDownFilter_right}>
            <Link to={props.Lnk ? props.Lnk : '/'} className={classes.DropDownFilter_Btn}>{props.Btn}</Link>
          </div> :
          ''
      }
      {
        props.d3 &&
        <SelectTag selectedVal={selectByCategory} title={props.title3} img={Img} data={categories} />
      }
      {
        props.d4 &&
        <SelectTag selectedVal={selectByMonth} title={props.title4} img={Img} data={months} />
      }

    </div>
  )
}

export default DropDownFilter