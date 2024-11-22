import { Link, useNavigate } from 'react-router-dom';
// import styles from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { useContext } from 'react';
import { tokenContext } from '../../context/TokenContext';
import { CartContext } from '../../context/CartContext';
const Navbar = () => {
  let{token ,setToken}=useContext(tokenContext)
  let {numOfCartItems} =useContext(CartContext)
  let navigate=useNavigate()
  function logOut(){
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  } 
    return (
        <>
      <nav className="navbar  fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <a className="navbar-brand" href="#">
        <img src={logo} alt='freshcart' />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      { token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="">Home</Link>
        </li>
        
       
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="categories">Catogries</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="brands">Brands</Link>
        </li>
        
      </ul> : "" }
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
       <li className='fab fa-facebook-f mx-1 '></li>
       <li className='fab fa-instagram-square mx-1 '></li>
       <li className='fab fa-youtube mx-1 '></li>
       <li className='fab fa-linkedin mx-1 '></li>
       <li className='fab fa-tiktok mx-1 '></li>
       <li className='fab fa-github mx-1 '></li>
       </ul>
       { token ?  
       
      
       <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">  
          <li className="nav-item text-main position-relative">
        <Link className="nav-link" aria-current="page" to="cart"><i className=' fa fa-shopping-cart '></i>
        <span className='position-absolute end-0 top-0 bg-main rounded-3'>{numOfCartItems}</span>
        </Link>
        
         </li>
       
       <li className="nav-item">
          <button className="nav-link" aria-current="page" onClick={logOut} to="logout">LogOut</button>
        </li> </ul> : <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="register">Register</Link>
        </li>

        
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="login">login</Link>
        </li>
     
        </ul>
      
        }
       
        
    
    </div>
  </div>
</nav>

        </>
    );
}

export default Navbar;
