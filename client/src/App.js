import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
function App() {
   const [search,setSearch] = useState('');
  const [result,setresult] = useState([]);
  const [notfound,setnotfound] = useState('');
    async function getresult(val){
     
      if(!val){
        alert('pls type a name')
        return
      }
      
         const {data}=await axios.get(`https://www.omdbapi.com/?s=${val}&apikey=12d6b389`)
         if(data.Response=='True'){
         console.log(data)
        setresult(data.Search)
         }
        else
        setnotfound('did not find')
     }
  //  useEffect(()=>{
  //     if(search){
  //       getresult(search)
  //     }
  //  },[search])
   
const addtocart=async(obj)=>{
  const {data}=await axios.post(`http://localhost:4000/addtofavourite`,obj,{
    headers:{
      'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*',
       
    }
  })
    
  }
  return (
    <div className="App">
       <form style={{display:'flex',justifyContent:'center'}}
       onSubmit={(e)=>{
           e.preventDefault()
           notfound && setnotfound('')
           getresult(search)
       }}
       >
  <div class="mb-3" style={{width:'600px'}}>
   
    <input type="text" class="form-control" id="exampleInputValue" aria-describedby="emailHelp"
     onChange={(e)=>{
       setSearch(e.target.value)
     }}
    />
   
  </div>
 
  <button type="submit" class="btn btn-primary" style={{padding:10,height:40}}>Submit</button>
</form>
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
      {
       !notfound && result && result.map((obj)=>(
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',margin:20}}>
             <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
             <h3 style={{marginRight:5}}>{obj.Title}</h3> <span>Year :{obj.Year}</span>
             </div>
             <div>
              {obj.Type}
             </div>
            <img src={obj.Poster} alt={obj.Title} style={{width:'200px',height:'300px'}}/>
            
            <button type="button" class="btn btn-primary"
            onClick={
              ()=>{
                addtocart(obj)
              }
              }
            >Add to favourite</button>
          </div>
        ))
      }
       {
        notfound && <p>{notfound}</p>
       }
      </div>
    </div>
  );
}

export default App;
