import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/userSlice";
import OAuth from "../Components/OAuth";
import FooterCom from "../Components/Footer";

const Signin = () => {
  const [formData, setFormData] = useState({});
  //   const [loading, setLoading] = useState(false);
  //   const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e.target.value); //To check whether the value changing while typing
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData); //To check whether the value changing while typing and stored in a object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      //   return setErrorMessage(` Please fill out all the fields`); //To check Functionality before redux
      return dispatch(signInFailure(` Please fill out all the fields`));
    }
    try {
      //   setLoading(true); //To check Functionality before redux
      //   setErrorMessage(null);
      dispatch(signInStart());
      const response = await fetch(
        "https://email-tool-backend.onrender.com/api/auth/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.success === false) {
        // return setErrorMessage(data.message); //To check Functionality before redux
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        dispatch(signInSuccess(data))
         navigate("/home");
      }
    } catch (error) {
    //   setErrorMessage(error.message); //To check Functionality before redux
    //   setLoading(false);
    dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 ">
          <div className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-violet-600 via-fuchsia-700 to-pink-500 rounded-lg text-white">
              Bulk
            </span>
            Email-Tool
          </div>
          <p className="text-sm mt-6">
          **This is demo project**
            You can signIn with your Email and Password (or) you can use the
            Google.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="Enter your Email ID"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Enter your Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    color="info"
                    aria-label="Info spinner example"
                    size="md"
                  />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-6">
            <span>Don't Have An Account?</span>
            <Link to="/" className="text-cyan-700 font-bold">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">OOPS!</span>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
      <FooterCom />
    </div>
  );
};

export default Signin;
