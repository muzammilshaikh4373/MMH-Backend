import { YojnaModel } from "../models/yojnaModel.js"

export const createYojnaService =async(y_id,name,document,description)=>{
    // export const createYojnaService =async(youjna)=>{
   let yojnaData = new YojnaModel({y_id,name,document,description})
    try {
        await yojnaData.save()
        return "success"
    } catch (error) {
        console.log(error);
        return "error"
    }
}

export const updateYojnaService =async(y_id,name,description,document)=>{
    try {
        await YojnaModel.findOneAndUpdate({y_id},{name,document,description})
        return "success"
    } catch (error) {
        console.log(error);
        return "error"
    }
}

export const deleteYojnaService =async(y_id)=>{
    try {
        await YojnaModel.findByIdAndDelete(y_id)
        return "success"
    } catch (error) {
        console.log(error);
        return "error"
    }
}