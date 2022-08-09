import { User } from '../models/User.js';

//GET ALL PRODUCTS
export const getAllUserProducts = async (req, res) => {
  try{
    const { id } = req.body;
  const user = await User.findById(id);
  const products = user.products;
  return responseHandler(res,`User'products retrieved`,201,productObject)
  
  }
  catch(error){
    return responseHandler(res,"Something went wrong",400,error)
  }
};

//ADD PRODUCT
export const addProduct = async (req, res) => {
  const { id, ...productObject } = req.body;
  // const user = await User.findById(id);
  try {
    const addedProduct = await User.updateOne(
      { _id: id },
      { $push: { products: { productId: req.id, ...productObject } } }
    );
    // const product = user.product;
    // const user = await User.findById(id);
    // const { products } = user;
    // products.push({
    //   productId: req.id,
    // });
    return responseHandler(res,"Product added",201,productObject)
    
  } catch (error) {
    console.log(error);
    responseHandler(res,"Something went wrong",400,error)
  }
};

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const { id, productId } = req.body;
  // const user = await User.findById(id);
  try {
    const deletedProduct = await User.updateMany(
      { _id: id },
      { $pull: { products: { productId: productId } } }
    );
    return responseHandler(res,'Product deleted',201,[])
    
  } catch (error) {
    console.log(error);
    return responseHandler(res,"Something went wrong",400,error)
  }
};

//GET PRODUCT
export const getProduct = async (req, res) => {
  try{
    const { id, productId } = req.body;
  const user = await User.findById(id);
  const product = user.products.filter(
    (product) => product.productId == productId
  );
  return responseHandler(res,"Product retrieved",201,product)
  
  }catch(error){
    return responseHandler(res,"Something went wrong",400,error)
  }
};
