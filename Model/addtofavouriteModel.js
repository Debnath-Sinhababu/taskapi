import mongoose from "mongoose";

const Addfav = new mongoose.Schema({
   
     title:{
        type: String,
        required: true,
     },
     type:{
        type: String,
        required: true,
     },
     year:{
        type: Number,
        required: true,
     },
     imdbid:{
        type: String,
        required: true,
     },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  

  });

  export default mongoose.model("Addtofavourite", Addfav);