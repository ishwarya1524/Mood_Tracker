const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const Mood=require("../models/Mood")

function verifytoken(req,res,next){
    const token=req.headers['authorization']
    if(!token) return res.sendStatus(400);
    jwt.verify(token,process.env.jwt_secret,(err,decoded)=>{
        if (err) return res.sendStatus(403);
        req.userId=decoded.id;
        next();
    })
}

router.post('/',verifytoken,async(req,res)=>{
    const {date,mood,note}=req.body;
    
    try{
        let mooddoc=await Mood.findOne({userId:req.userId});
        if(!mooddoc){
            mooddoc=new Mood({
                userId:req.userId,
                moods:{
                    [date]:[{mood,note}]
                }
            });
    
        }
        
            else {
                if (!mooddoc.moods) {
                    mooddoc.moods = new Map();  // Ensure it's initialized
                }
                const curmood = mooddoc.moods.get(date) || [];
                curmood.push({ mood, note });
                mooddoc.moods.set(date, curmood);
            }
            
        
        await mooddoc.save();
        res.json(mooddoc);
    }
    catch(err){
        console.error("Error saving mood",err);
        res.status(500).json({message:"Error saving the mood"})
    }
});

router.get('/',verifytoken,async(req,res)=>{
    const Mooddoc=await Mood.findOne({userId:req.userId});
    res.json(Mooddoc?.moods||{});
})

module.exports=router;