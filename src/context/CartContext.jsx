import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();
let headers={
        token:localStorage.getItem("userToken")
}

function addToCart(id) {
  console.log("hello from Cart");
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
    productId:id
  } ,
  {
    headers
  }
).then((res)=>res).catch((err)=>err);
}


function GetFromCart() {
  console.log("hello from Cart");
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, 
  {
    headers
  }
).then((res)=>res).catch((err)=>err);
}
function DeleteFromCart(id) {
 
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
  {
    headers
  }
).then((res)=>res).catch((err)=>err);
}
function UpdateProductCart(id,count) {
 
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
    {
      count
    },
  {
    headers
  }
).then((res)=>res).catch((err)=>err);
}





export default function CartContextProvider(props) {

  const [cartId,setcartId]=useState(null);
  const [numOfCartItems,setNumOfCartItems]=useState(null);
  function onlinePayment(shippingAddress){

    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, 
      {
        shippingAddress
      },
    {
      headers
    }
  ).then((res)=>res).catch((err)=>err);
  }

  async function GetinitialCartnum() {
  let {data}=  await  GetFromCart();
  setNumOfCartItems(data?.numOfCartItems)
  setcartId(data?.data._id)
    
  }

  useEffect(()=>{
    GetinitialCartnum()
  }
  ,[])
  return (
    <CartContext.Provider value={{addToCart,GetFromCart,DeleteFromCart,UpdateProductCart,onlinePayment,setNumOfCartItems,numOfCartItems}}>
      {props.children}
    </CartContext.Provider>
  );
}
