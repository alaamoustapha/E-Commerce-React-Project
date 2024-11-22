import styles from './Main-slider.module.css'
import image1 from '../../assets/images/slider/slider-image-1.jpeg'
import image2 from '../../assets/images/slider/slider-image-2.jpeg'
import image5 from '../../assets/images/slider/slider-image-3.jpeg'
import image3 from '../../assets/images/slider/grocery-banner.png'
import image4 from '../../assets/images/slider/grocery-banner-2.jpeg'
import Slider from "react-slick";

const MainSlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
      };
       
    return (
        <>
        <div className="container my-5">
            <div className="row gx-0">
                <div className="col-md-9">
                <Slider {...settings}>
                <img height={400} src={image3} alt='slider1' />
                <img  height={400} src={image4} alt='slider1' />
                <img  height={400} src={image5} alt='slider1' />
               </Slider>
                </div>
                <div className="col-md-3">
                <img src={image1} height={200} className='w-100' alt='slider1' />
                <img src={image2} height={200}className='w-100' alt='slider1' />
                </div>
            </div>
        </div>
            

        </>
    );
}

export default MainSlider;
