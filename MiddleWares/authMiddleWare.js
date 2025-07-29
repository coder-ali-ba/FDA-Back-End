import { json } from 'express';
import jwt from 'jsonwebtoken'
import auths from '../models/userModel/userModel.js';

const AuthCheck = (req , res , next) =>{
  try {
      const token = req.headers.authorization.split(" ")[1]

  const isVarified = jwt.verify(token , process.env.PRIVATEKEY)
   
  if(isVarified){
        req.user = isVarified
       return next()
  }else{
      return res.json({
        status:false,
        message : "Authorization Error"
      })
  }    
  } catch (error) {
    res.json({
        status:false,
        message : error.message
      })
  }
}




const AdminAuthCheck = async(req , res , next) =>{
  
  try {
      const token = req.headers.authorization.split(" ")[1]

      const isVarified = jwt.verify(token , process.env.PRIVATEKEY)

  
 
  if(isVarified){
    const user = await auths.findById(isVarified.id)
        if(user.type !== "admin"){
          return res.json({
           status:false,
           message : "unauthorized"
        })
        }
        req.user = isVarified;      
       return next()
  }else{
      return res.json({
        status:false,
        message : "Authorization Error"
      })
  }    
  } catch (error) {
    res.json({
        status:false,
        message : error.message
      })
  }
}

export {
   AuthCheck,
   AdminAuthCheck
  }