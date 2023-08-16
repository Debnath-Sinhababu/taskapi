import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './home';
import Addtofavourite from './Addtofavourite';
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
    console.log(data)
  }
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favourite" element={<Addtofavourite/>}/>
       </Routes>
    </div>
  );
}

export default App;
