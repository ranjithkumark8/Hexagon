const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const connect = () => {
  return mongoose.connect(process.env.BACKEND_DATABASE_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

const restaurantSchema = new mongoose.Schema(
  {
    resturant_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    timings: {
      type: String,
      required: true,
    },
    dineoutPay: {
      type: Boolean,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    average_cost: {
      type: String,
      required: true,
    },
    menu_images: {
      type: [{}],
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    free_offer: {
      type: [{}],
      required: true,
    },
    girfs :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"girf",
        required:false
    }],
    cuisines :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cuisine",
        required:true
    }],
    tags :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tag",
        required:true
    }],
    features :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"feature",
        required:true
    }],
    dineoutpassport :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"dineoutpassport",
        required:false
    }],
  },
  { versionKey: false }
);

const Restaurant = mongoose.model("restaurant", restaurantSchema);

app.post("/restaurants",async (req,res)=>{
    const data = await Restaurant.create(req.body)
    res.status(200).json({data:data})
})
app.get("/restaurants",async (req,res)=>{
    const datas = await Restaurant.find({}).lean().exec()
    res.status(200).json({data:datas})
})

const girfSchema = new mongoose.Schema({
    icon:{
       type:String,
       required:true
    },
    price:{
       type:Number,
       required:true
    },
    info:{
       type:String,
       required:true
    },
    quantity:{
       type:Number,
       required:true
    }
})
const Girf = mongoose.model("girf", girfSchema);
app.post("/girfs",async (req,res)=>{
    const data = await Girf.create(req.body)
    res.status(200).json({data:data})
})
app.get("/girfs",async (req,res)=>{
    const datas = await Girf.find({}).lean().exec()
    res.status(200).json({data:datas})
})
const cuisineSchema = new mongoose.Schema({
    cuisine:{
       type:String,
       required:true
    }
    
})
const Cuisine = mongoose.model("cuisine", cuisineSchema);
app.post("/cuisines",async (req,res)=>{
    const data = await Cuisine.create(req.body)
    res.status(200).json({data:data})
})
app.get("/cuisines",async (req,res)=>{
    const datas = await Cuisine.find({}).lean().exec()
    res.status(200).json({data:datas})
})

const tagSchema = new mongoose.Schema({
    tag:{
       type:String,
       required:true
    }
    
})
const Tag = mongoose.model("tag", tagSchema);
app.post("/tags",async (req,res)=>{
    const data = await Tag.create(req.body)
    res.status(200).json({data:data})
})
app.get("/tags",async (req,res)=>{
    const datas = await Tag.find({}).lean().exec()
    res.status(200).json({data:datas})
})

const featureSchema = new mongoose.Schema({
    feature:{
       type:String,
       required:true
    }
    
})
const Feature = mongoose.model("feature", featureSchema);
app.post("/features",async (req,res)=>{
    const data = await Feature.create(req.body)
    res.status(200).json({data:data})
})
app.get("/features",async (req,res)=>{
    const datas = await Feature.find({}).lean().exec()
    res.status(200).json({data:datas})
})
const dineoutpassportSchema = new mongoose.Schema({
    dineoutpassport:{
       type:String,
       required:true
    }
    
})
const Dineoutpassport = mongoose.model("dineoutpassport", dineoutpassportSchema);

app.post("/dineoutpassports",async (req,res)=>{
    const data = await Dineoutpassport.create(req.body)
    res.status(200).json({data:data})
})
app.get("/dineoutpassports",async (req,res)=>{
    const datas = await Dineoutpassport.find({}).lean().exec()
    res.status(200).json({data:datas})
})



async function start() {
  await connect();
  app.listen(6878, () => {
    console.log("Listening on port 6878");
  });
}

start();