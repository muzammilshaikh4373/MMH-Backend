import { YojnaModel } from '../models/yojnaModel.js';
import {createYojnaService,updateYojnaService,deleteYojnaService} from '../services/yojnaService.js'

 export const getYojna = async(req,res)=>{
    try {
    let findYojna = await YojnaModel.find();
    // console.log(findYojna);
    if(findYojna){
       return res.status(200).json({status:true,msg:"success",findYojna})
    } else{
       return res.status(401).json({status:false,msg:"No Yojna Is There"
       })
    }
 } catch (error) {
    console.log(error);
    return error
 }
}

export const createYojna =async(req,res)=>{

    let {y_id,name,document,description} =req.body;
    console.log(req.body);
    try {
     let result = await createYojnaService(y_id,name,document,description)
     if(result == "success"){
     return res.status(200).json({status:true,msg:"Data Added successfull"});
     } else{
     return res.status(401).json({status:false,msg:"error during added"})
     }
    } catch (error) {
      console.log("error");
      return res.status(501).json({status:false,msg:"error during added"});
    }
}

export const updateYojna =async(req,res)=>{
   let {y_id,name,description,document} =req.body;
   console.log(req.body);
   try {
      let update = await updateYojnaService(y_id,name,description,document);
      if(update=="success"){
       return res.status(201).json({status:true,msg:"updated successfully" ,update})
      } else{
      return  res.status(401).json({status:false,msg:"updated error"})
      }
   } catch (error) {
      console.log(error);
      return res.status(501).json({status:false,msg:"updated error"})
   }
}

export const deleteYojna =async(req,res)=>{
   let id = req.params.y_id ;
   console.log(id);
   try {
      const deleteYojna = await deleteYojnaService(id)
      if(deleteYojna == "success"){
         return res.status(201).json({status:true,msg:"deleted successfully"})
      } else{
         return res.status(401).json({status:false,msg:"deleted error"})
      }
   } catch (error) {
      console.log(error);
      return res.status(501).json({status:false,msg:"deleted error"})
   }   
   }

