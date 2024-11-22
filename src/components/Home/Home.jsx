import { useContext } from "react";
import { tokenContext } from "../../context/TokenContext";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import CategoriesSlider from "../Categories-slider/Categories-slider";
import MainSlider from "../Main-slider/Main-slider";

// import styles from './Home.module.css'
const Home = () => {
   let {token}=useContext(tokenContext);
   console.log(token);

    return (
        <>
            <MainSlider/>
           <CategoriesSlider/>
           <FeatureProducts/> 

        </>
    );
}

export default Home;
