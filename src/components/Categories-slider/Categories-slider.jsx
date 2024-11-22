import axios from 'axios';
import styles from './Categories-slider.module.css'
import { useQuery } from 'react-query';
import Slider from "react-slick";

const CategoriesSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true
  };
   
  
  
  function GetCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let {data}=useQuery("CategorySlider" ,GetCategories)
    console.log(data);
    
    return (
        <>
                <Slider {...settings}>
                {data?.data?.data.map((ele)=> <>
                <img src={ele.image} height={250}  className='w-100'/>
                <h4>{ele.name}</h4>
                </>)}
                </Slider>
      </> 
     );
    };  

export default CategoriesSlider;