
import { passwordHash ,checkPassword,getToken,verifyToken} from "../authentication/userAuth.js";
import UserModel from "../models/userModel.js";
import { registerUserService,getDbPassword ,updatemobileservices,getUserService, getUserByIDService} from "../services/userService.js";

let updatemobile=async(req,res)=>{
    let{email,mobile}=req.body
    console.log(req.headers.authorization.split(" ")[1]);
    let token=req.headers.authorization.split(" ")[1];
    let payLoad=verifyToken(token)
    if(payLoad==email){
        try {
            let status=await updatemobileservices(email,mobile)
            if(status=="success"){
                res.status(200).send("update success");
            }else{
                res.status(401).send("update error");
            }
            
        } catch (error) {
            console.log(error)
        }
    }else{
        res.send("invalid token");
    }
   
}

export const getUser = async (req, res) => {
    try {
        const data = await UserModel.find()
        // console.log(result);

        if (!data) return res.status(404).json({
            success: false,
            message: "There Is No Users..."
        })

        return res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error While Displaying Users...",
            error: error.message
        })
    }
}

let login=async(req,res)=>{
   let {mobile,password}=req.body;
//    console.log(req.body);
   try {
    let user=await getUserService(mobile)
    let status=await checkPassword(password,user.password)
    if(status){
        let token=getToken(mobile);
        res.status(200).send({status:"success",token:token,data:user});
    }else{
        res.status(401).send("invalid login");
    }
   } catch (error) {
    console.log(error)
   }
}

let registerUser=async(req,res)=>{
    let {firstName,lastName,email,password,mobile,userType}=req.body;
    try {
        let hashpassword=await passwordHash(password)
        let status=await registerUserService(firstName,lastName,email,hashpassword,mobile,userType)
        if(status=="success"){
            let token=await getToken(email);
            res.status(200).send("success");
        }else{
            res.status(501).send("error");
        }
    } catch (error) {
        console.log(error);
        console.log('error in controller')
    }
   
    
}

export const deleteUser = async (req, res) => {
    const _id = req.params.id
    const data = await UserModel.findByIdAndDelete(_id)

    if(!data) {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        })
    }

    res.json({
        success: true,
        message: "User deleted successfully..."
    })

}

export const updateUser = async (req, res) => {
    try {
        let{firstName,lastName,email,mobile,userType}=req.body
        const data = await UserModel.findOneAndUpdate({mobile},{firstName,lastName,email,mobile,userType})

        return res.status(201).json({
            success: true,
            message: "User record updated successfully",
            data
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error While Updating User...",
            error: error.message
        })
    }
}


export const getUSerByID = async(req,res) =>{
    try {
        const id = req.params.id
        const user = await getUserByIDService(id)
        const {firstName, lastName, email, mobile, userType} = user
        return res.status(200).json({
            success: true,
            firstName, lastName, email, mobile, userType
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error Getting User...",
            error: error.message
        })
    }
}


export {registerUser,login,updatemobile}
