import auths from "../models/userModel/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"





const signupController = async (req , res)=>{
    try {
        const body = req.body;
        const isExist = await auths.findOne({email : body.email})
        if(isExist){
           return res.json({
              status : false,
              message :"User ALready Exist"
           })
        }
        const pass =await bcrypt.hash(body.password , 10)
        const user = {...body , password : pass}

        const allUsers = await auths.create(user)

        

        const transporter = nodemailer.createTransport({
           service : "Gmail",
           host: "smtp.gmail.com",
           port: 465,
           secure: true, // true for 465, false for other ports
           auth: {
            user: process.env.EMAILADDRESS,
            pass: process.env.PASS_KEY,
           },
        });

        const mailOptions = {
            from: process.env.EMAILADDRESS,
            to: body.email,
            subject: "User Signup",
            text: 'This is the plain text body',
            html: '<b>This is the HTML body</b>'
        };

        await transporter.sendMail(mailOptions)



        res.json({
          status : true,
          message :"Signed Up Successfully",
          data : allUsers
        })
        
    } catch (error) {
        res.json({
              status : false,
              message :error.message
           })
    }
    
}

const loginController = async(req , res)=>{

try {
    const body = req.body
    const isExist = await auths.findOne({email : body.email})
    if(!isExist){
        return res.json({
            status : false,
            message: "Invalid emial or password"
        })}

    const isPass = await bcrypt.compare(body.password , isExist.password)
    if(!isPass){
        return res.json({
            status : false,
            message: "Invalid emial or password"
        })
    }
    
    const token = jwt.sign({id : isExist._id} , process.env.PRIVATEKEY)
    res.json({
        status : true,
        message : "Loged In Successfully",
        data : isExist.type,
        token : token
    })
        
} catch (error) {
        res.json({
            status: false,
            message : "Something went Wrong"
        })
}
}

export {
    signupController,
    loginController
}