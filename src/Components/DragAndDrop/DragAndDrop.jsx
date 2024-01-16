import classes from './DragAndDrop.module.css'
import file from '../../assets/file.png'
import React,{useState,useCallback,useEffect} from 'react';
import {useDropzone} from 'react-dropzone'
const DragAndDrop = (props) => {
const [photo,setPhoto]=useState([])
const onDrop=useCallback((acceptedFiles)=>{
  setPhoto(
    acceptedFiles.map((upFile)=>Object.assign(upFile,{
      preview:URL.createObjectURL(upFile)
    }))
  )
})
useEffect(()=>{
props.uploadFile(photo)
},[photo])

const {getRootProps, getInputProps, isDragActive} = useDropzone({
  accept: {
    'image/jpeg': ['.jpeg']
  },onDrop

  
 
})
 
  return (
    <div className={classes.container}>
    
        <h3 className={classes.heading}>Correction</h3>
        <div className={classes.dnd_container}>
            <h4>Upload Yours Files</h4>
            <p>File should be in JPG</p>
            {photo.length===0&&<div {...getRootProps()} className={classes.dnd}>
                <img src={file} alt="file" />
                
                <input {...getInputProps()}  />
                { isDragActive? <p>Drop the image here</p>  : <p>Drag and Drop Your FIle here||click to select Image</p> }
            </div>}
            <div>
              {photo.map((upFile)=>{
                return(
                  <div className={classes.dnd}>
                   <img src={upFile.preview}  alt="preview" height={'150px'} width={'150px'}/>
                  </div>
                )
              })}
            </div>
        </div>
        
    </div>
  )
}

export default DragAndDrop