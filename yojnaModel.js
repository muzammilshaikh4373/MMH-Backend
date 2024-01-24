import mongoose from "mongoose";

const yojnaSchema = new mongoose.Schema({
    y_id :{type:Number,required:true,unique:true,default:"y101"},
    name:{type:String,trim:true,required:true},
    document:{type:String,trim:true,required:true},
    description:{type:String,trim:true}
});

export const YojnaModel = new mongoose.model('yojna',yojnaSchema);