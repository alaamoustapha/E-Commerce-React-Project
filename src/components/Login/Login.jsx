import styles from './Login.module.css'
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenContext } from '../../context/TokenContext';

const Login = () => {
    const [isLoading, setisLoading] = useState(false);
    const [apiError, setapiError] = useState("");
    let {setToken}=useContext(tokenContext)
    let navigate = useNavigate();

    async function login(values) {
        setapiError("")
        setisLoading(true)
      


        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {

            setapiError(err.response?.data?.message || "Something went wrong");
            setisLoading(false)
        });




        console.log(data);
        if (data.message == "success") {
            setisLoading(false);
            localStorage.setItem("userToken",data.token)
            setToken(data.token)
            navigate("/")
        }


    }





    let validationSchema = Yup.object({
       
        email: Yup.string().email("Email not valid").required("Email is required"),
        password: Yup.string()
            .matches(
                /^[A-Z][a-z0-9]{5,8}$/,
                "Password should start with a capital letter and be 6-9 characters long"
            )
            .required("Password is required"),
       
    });

    let formik = useFormik({
        initialValues: {
           
            email: "",
            password: ""
          
        },

        validationSchema: validationSchema,
        onSubmit: (values) => login(values)

    });

    return (
        <>
            <div className="container my-5">
                <h2 className="mb-3"> Login  now:</h2>
                {apiError ? <div className="alert alert-danger" > {apiError} </div> : ""}
                <form className="mx-auto w-75" onSubmit={formik.handleSubmit}>
                  

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
                            
                            
                            {isLoading ? <button
                                type="submit"
                                className="btn btn-success d-block mt-3 ms-auto "
                            >
                                <i className="fa fa-spin fa-spinner"></i>
                            </button> : <button disabled={!(formik.isValid && formik.dirty)}
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
export default Login;