import { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import { Blocks } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Cart = () => {
  let { GetFromCart, DeleteFromCart, UpdateProductCart,setNumOfCartItems } =
    useContext(CartContext);
  const [cartDetails, setcartDetails] = useState({});

  async function getCartDetails() {
    let {data} = await GetFromCart();
    console.log(data);
    setcartDetails(data);
    setNumOfCartItems(data.numOfCartItems)

  }
  async function removeItem(id) {
    let { data } = await DeleteFromCart(id);

    setcartDetails(data);
    setNumOfCartItems(data.numOfCartItems)
  }
  async function UpdateItem(id, count) {
    let { data } = await UpdateProductCart(id, count);

    setcartDetails(data);
  
  }
  useEffect(() => {
    getCartDetails();
  }, []);
  return (
    <>
      {cartDetails.data ? (
        <div className="container my-5">
          <div className="w-75 mx-auto bg-main-light p-5">
            <h1>Cart Shop </h1>
            <div className="d-flex justify-content-between">
              <h3 className="h5">
                Total Price :{" "}
                <span className="text-main">
                  {cartDetails.data.totalCartPrice}
                </span>
              </h3>
              <h3 className="h5">
                Total Cart item:{" "}
                <span className="text-main">
                  {cartDetails.numOfCartItems || 0}
                </span>
              </h3>
            </div>
            {cartDetails.data.products.map((ele, index) => (
              <div
                key={index}
                className=" row flex  p-4 rounded-lg shadow bg-white"
              >
                <div className="col-md-1">
                  <img src={ele.product.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-11 d-flex justify-content-between">
                  <div className="left-side">
                    <h4>
                      {ele.product.title.split(" ").slice(0, 4).join(" ")}
                    </h4>
                    <p>{ele.price}</p>
                  </div>
                  <div className="right-side">
                    <button
                      className="btn btn-primary"
                      onClick={() => UpdateItem(ele.product._id, ele.count - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{ele.count}</span>
                    <button
                      className="btn btn-primary"
                      onClick={() => UpdateItem(ele.product._id, ele.count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn text-danger p-0"
                  onClick={() => removeItem(ele.product._id)}
                >
                  <i className="fa fa-trash-can"> Remove</i>
                </button>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-center">
          <Link className="btn btn-success w-50  " to={'/Checkout'}>Checkout</Link>
          </div>
        </div>
        
      ) : (
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass={"justify-content-center"}
          visible={true}
        />
      )}
    </>
  );
};

export default Cart;
