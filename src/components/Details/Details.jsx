import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
import { Blocks } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { CartContext } from "../../context/CartContext";
import { useContext} from "react";
import { Helmet } from "react-helmet";

const Details = () => {
  let { addToCart,setNumOfCartItems } = useContext(CartContext);
  async function addCart(id) {
    let res = await addToCart(id);
    if (res.data.status == "success") {
      toast.success("Product Added Successfully", {
        duration: 4000,
        position: "top-center",
      },
      setNumOfCartItems(res.data.numOfCartItems)
    );
    } else {
      toast.error("Product Does not Add");
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  let params = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading } = useQuery("details", () =>
    getProductDetails(params.id)
  );
  console.log(data);

  return (
    <>
      <div className="container">
      <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data?.data.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        {isLoading ? (
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass={"justify-content-center"}
            visible={true}
          />
        ) : (
          <div className="row align-items-center">
            <div className="col-md-4">
              <Slider {...settings}>
                {data?.data?.data.images.map((ele) => (
                  <img src={ele} key={ele.id} alt="image" />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <h2>{data?.data?.data.title}</h2>
              <p>{data?.data?.data.description}</p>
              <p>{data?.data?.data.category.name}</p>
              <div className="d-flex justify-content-between">
                <h5>{data?.data?.data.price}</h5>
                <h5 className="fa fa-star rating-color">
                  {" "}
                  {data?.data?.data.ratingsAverage}
                </h5>
              </div>
              <button onClick={()=>addCart(data?.data?.data.id)} className="btn btn-success">Add To cart</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
