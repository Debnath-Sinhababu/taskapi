import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from'react-router-dom';
function Home() {
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

   
const addtocart=async(obj)=>{
  const {data}=await axios.post(`http://localhost:4000/addtofavourite`,obj,{
    headers:{
      'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*',
       
    }
  })
   if(data.success==false){
    alert('already added to favourite')
   }
   if(data.success==true){
    alert('added to favourite')
   }
    console.log(data)
  }
  return (
    <div style={{width:'100%',height:'100%',padding:20}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       <form style={{display:'flex',justifyContent:'center',margin:'30px'}}
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
  <Link to='/favourite'>
<button type="button" class="btn btn-primary" style={{marginTop:-15}}>your favourites</button>
</Link>
</div>
     <div className="container">
        <div className='row'>
      {
       !notfound && result && result.map((obj)=>(
          <div className='col-3' style={{marginBottom:30}}>
             <div>
             <h5>{obj.Title}</h5> <span>Year :{obj.Year}</span>
             </div>
             <div style={{color:'GrayText',fontSize:20}}>
              {obj.Type}
             </div>
            <img src={obj.Poster} alt={obj.Title} style={{width:'200px',height:'300px'}}/>
            
            <button type="button" class="btn btn-primary" style={{marginTop:10}}
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
        notfound && <div class="alert alert-warning" role="alert">
           oops! nothing found
      </div>
       }
      </div>
      </div>
    </div>
  );
}

export default Home;
