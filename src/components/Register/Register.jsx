import styles from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [isLoading,setisLoading]=useState(false);
  const [apiError,setapiError]=useState("");
  let navigate=useNavigate();

async function register(values) {
  setapiError("")
  setisLoading(true)
 console.log("hello from register" ,values);

 
 let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{

  setapiError(err.response?.data?.message || "Something went wrong");
  setisLoading(false)
   });
// async function register(values) {
//   setisLoading(true)
//   try {
//     let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
//     console.log(data);
//   } catch (error) {
//     setapiError(error.response?.data?.message || "Something went wrong");
//   }
// }

 console.log(data);
 if (data.message =="success"){
  setisLoading(false);
  navigate("/login")
}
 
  
}





  let validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Name should be less than 15 characters")
      .required("Name is required"),
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,8}$/,
        "Password should start with a capital letter and be 6-9 characters long"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "RePassword should match Password")
      .required("RePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone is invalid")
      .required("Phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => register(values)

  });

  return (
    <>
      <div className="container my-5">
        <h2 className="mb-3"> Register now:</h2>
        {apiError ? <div className="alert alert-danger" > {apiError} </div> :""}
        <form className="mx-auto w-75" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="fname"> Name:</label>
            <input
              className="form-control  w-50"
              type
              name="name"
              id="fname"
              placeholder="John"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="uemail">Email Address:</label>
            <input
              className="form-control w-50"
              type="email"
              name="email"
              id="uemail"
              placeholder="john@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <br />
            <small id="passwordHelp" className="form-text text-muted">
              Must have at least 6 characters
            </small>
            <input
              className="form-control w-50"
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />
             {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : null}
            <br />
            <div>
              <div className="form-group">
                <label htmlFor="repassowrd">Confirm Password:</label>
                <br />
                <input
                  className="form-control w-50"
                  type="password"
                  name="rePassword"
                  id="repassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                 {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger">{formik.errors.rePassword}</div>
            ) : null}
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  className="form-control w-50"
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                 {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger">{formik.errors.phone}</div>
            ) : null}
              </div>
              {isLoading ?  <button
                type="submit"
                className="btn btn-success d-block mt-3 ms-auto "
              >
                <i className="fa fa-spin fa-spinner"></i>
              </button> :  <button disabled={!(formik.isValid && formik.dirty)}
                type="submit" 
                className="btn btn-success d-block mt-3 ms-auto "
              >
                Submit
              </button>
             }
             
             
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
