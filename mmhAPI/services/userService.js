import UserModel from "../models/userModel.js";

let updatemobileservices=async(email,mobile)=>{
    console.log(email);
    console.log(mobile);
    try {
        let user=await UserModel.findOneAndUpdate({email:email},{mobile:mobile});
        return "success"
    } catch (error) {
        console.log(error)
    }
}
let getDbPassword=async(mobile)=>{
   try {
    let user=await UserModel.findOne({mobile});
    let dbpass=user.password;
    return dbpass
   } catch (error) {
    console.log(error)
   }
}
export let getUserService=async(mobile)=>{
    try {
     let user=await UserModel.findOne({mobile});
     //let dbpass=user.password;
     return user
    } catch (error) {
     console.log(error)
    }
 }
 
let registerUserService=async(firstName,lastName,email,password,mobile,userType)=>{
try {
    let user=new UserModel({firstName,lastName,email,password,mobile,userType});
    await user.save();
    return "success"
} catch (error) {
    console.log(error)
    return "error"
}

}


let getUserByIDService = async (id) =>{
    try {
        let user= await UserModel.findById(id)
        return user
    } catch (error) {
        console.log(error)
    return "error"
    }
}

export {registerUserService,getDbPassword,updatemobileservices , getUserByIDService}