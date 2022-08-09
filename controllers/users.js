import { User } from '../models/User.js';
import { hashPassword,comparePassword } from '../authentication/auth.js'; 
import jwt  from 'jsonwebtoken';
import "dotenv/config";
import {responseHandler} from '../authentication/errorHandler.js'


//POST REQUESTS
//CREATE USER
export const createUser = async (req, res) => {
  try{
    const { fullName, email, shopName, password } = req.body;
  const { salt, hash } = await hashPassword(password);
  const user = await User.create({
    fullName: fullName,
    email,
    shopName,
    password:hash,
    salt,
    products: [],
  });

  return responseHandler(res,"User created successful",200,user)
  
  }catch(error){
    return responseHandler(res,"Unsuccesfully user creation",400,error)
  }
};

//UPDATE USER
export const updateUser = async (req, res) => {
  const { id, ...updateObject } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateObject);
    return responseHandler(res, 'User updated',200,updateUser);
  } catch (error) {
    console.log(error);
    return responseHandler(res, 'Something went wrong',400,error);
     
  }
};

//DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return responseHandler(res,'User deleted',200, deletedUser);
    
  } catch (error) {
    console.log(error);
    return responseHandler(res,'Something went wrong',400,error);
    
  }
};

//GET SINGLE USER
export const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    return responseHandler(res,"User retrieved",200,user);
    
  } catch (error) {
    console.log(error);
    return responseHandler(res,'Something went wrong',400,error);
  }
};

//GET REQUESTS
//GET ALL USERS

export const getAllUsers = async (req, res) => {
  try{
    const users = await User.find();
  return responseHandler(res,'users fecthed successfully',200,users);
  }catch(error){
    return responseHandler(res,"something went wrong",400,error)
  }
};


// login user 
export const loginUser = async (req, res) => {
  try{
    const { fullName,email , password, shopName} = req.body;
     const token = jwt.sign({fullName,email, shopName}, process.env.JWT_SECRET,{expiresIn:'45mins'} )
    const user = await User.findOne({ email: email });
  if (user.password != password) {
    return res.status(200).send({
      message: 'Incorrect details',
      data: null,
    });
  }else{
    const correctPassword = await comparePassword(Password,user.password);
    if(!correctPassword){
      return responseHandler(res,'Wrong email and password combination', 400,null);
    }
  }
  return res.header("X_auth_token",token).status(200).send({
    message: 'User login successful',
    data: {user: req.user},
  });
  }catch(error){
    return responseHandler(res,"worng user details",400,error)
  }
  
};



