import axios from "axios";
import styles from "./FeatureProducts.module.css";
import { useContext, useEffect, useState } from "react";
import {Blocks} from 'react-loader-spinner';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from 'react-hot-toast';


  
const FeatureProducts = () => {
  // const [products, setProducts] = useState([]);
  // const[isLoading,setisLoading]=useState(true);
 
  // async function getProduct() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   console.log(data);
  //   setProducts(data.data);
  // }
  // useEffect(() => {
  //   getProduct();
  //   setisLoading(false);
  // }, []);
  let {addToCart,setNumOfCartItems}=useContext(CartContext);
 async function addCart(id){
   let res= await addToCart(id);
   if (res.data.status =="success"){
    toast.success('Product Added Successfully',
     
      {
        duration: 4000,
        position: 'top-center',
      
      } , setNumOfCartItems(res.data.numOfCartItems)
    );

   }else
   {
    toast.error('Product Does not Add');
   }




  }
  function getProduct()
  {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  let {isLoading,data} =useQuery("featureProducts" , getProduct);
  
  
  return (
    <>
        <div className="container py-5">
        {isLoading ?  <Blocks 
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass={"justify-content-center"}
  visible={true}
 
  /> : <div className="row">
          {data?.data?.data.map((ele) => (
            
            <div className="col-md-2" key={ele.id}  >
             
                <div className="product px-2 py-3" >
                <Link to={'details/' + ele.id} > 
              <img src={ele.imageCover} className="w-100" alt="" />
              <p className="text-main">category</p>
              <h3>{ele.title.split(" ").slice(0,2).join(" ")}</h3>
              {/* <h3>{ele.title.slice(0, 10)}</h3> */}

               <div className="d-flex justify-content-between">
                <p>{ele.price}</p>
                <p>
                  {" "}
                  <i className="fa fa-star rating-color"></i>{" "}
                  {ele.ratingsAverage}
                </p>
              </div>
              </Link>
              <button onClick={()=>{addCart(ele.id)}} className="btn btn-success w-100" >Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        }
        
      </div> 
    </>
  ); 
};

export default FeatureProducts;
