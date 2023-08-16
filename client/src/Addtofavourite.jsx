import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
const Addtofavourite = () => {
     const [allfavourit,setallfavourite]=useState([])
     const getallfavourites=async(obj)=>{
        const {data}=await axios.get(`http://localhost:4000/alladded`)
          setallfavourite(data.all)
        }
     useEffect(()=>{
       getallfavourites()
     },[])
  return (
    <div style={{width:'100%',height:'100%'}}>
       <h1>Your favourites</h1>
       <div class="container">
        <div className="row">
      {
          allfavourit && allfavourit.map((obj)=>(
          <div  className='col-3'>
             <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
             <h5 style={{marginRight:5}}>{obj.title}</h5> <p>Year :{obj.year}</p>
             </div>
             <div style={{color:'GrayText',fontSize:20}}>
              {obj.type}
             </div>
            <img src={obj.image} alt={obj.title} style={{width:'200px',height:'300px'}}/>
            
            
          </div>
        ))
      }
       </div>
      </div>
    </div>
  )
}

export default Addtofavourite
