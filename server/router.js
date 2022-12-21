const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {userModel, locationModel} = require("./models/users")

router.post("/register", async(req, res) => {
 
  // res.send({ response: "Server is up and running." }).status(200);
  console.log(req.body)
  const {name,email,pass}=req.body;
  const data=await new userModel({
    name:name,
    username:email,
   password:pass
  })
 await  data.save()
});

router.post("/location",async(req,res)=>{

  const data =await new locationModel({
    longitude:req.body.longi,
    latitude :req.body.lati
  })

  await data.save()
});

router.get("/viewData", async(req,res)=>{
  try{
    const accounts = await userModel.find();
    console.log(accounts) 
    res.status(201).json(accounts);
    
}
catch(error){
    res.status(409).json({ message: error.message });
    console.log(error,message);
}
}) 


module.exports = router;