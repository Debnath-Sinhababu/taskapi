import express from 'express';
import mongoose from 'mongoose';
import addtofavouriteModel from './Model/addtofavouriteModel.js';
import cors from 'cors'
const app = express();
mongoose
.connect('mongodb+srv://nodejs_todo:nodejs_todo@cluster0.ni3psao.mongodb.net/',{
  dbName: "taskaddtofavourite",
}).then((c) => console.log(`Database Connected with ${c.connection.host}`))
.catch((e) => console.log(e));
 app.use(express.json())
 app.use(cors({origin: true, credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  
  }))
app.get('/', (req, res) => {
  res.send('Hello World!');
});
 app.post('/addtofavourite', async(req, res) => {
      const {Title,Year,imdbID,Type,Poster}=req.body
    
    const obj=await addtofavouriteModel.find({imdbid: imdbID});
        
     if(obj && Object.keys(obj).length>0){
        //  await addtofavouriteModel.findOneAndDelete({imdbid:id})
        return res.json({
            message:'already exist',
            success:false
        })
     }
     else{
        const savetoadd=await addtofavouriteModel.create({
          title:Title,
          year:Year,
          imdbid:imdbID,
          type:Type,
          image:Poster
           })
           return res.json({
            message:'added successfully',
            success:true
        })
     }
 })
  app.get('/alladded', async(req, res) => {
    const obj=await addtofavouriteModel.find();
    return res.json({
      success:true,
      all:obj
    });
  })

app.listen(4000,()=>{
    console.log('Server is running on port 5000');
});
