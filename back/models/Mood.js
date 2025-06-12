const mongoose=require("mongoose")

const moodentryschema=new mongoose.Schema({
    mood:String,
    note:String,
},{_id:false});

const moodSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",unique:true},
    moods:{
        type:Map,
        of:[moodentryschema],
        default:{},
    },
});

module.exports=mongoose.model("Mood",moodSchema)