import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../helperFunctions/apiFunction";
import { setLoginStatus, setUserInfo, setRes } from "../redux/dataSlice";
import toast from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";

function Login() {
  const { isLoggedIn, basicToken } = useSelector((state) => state.clientData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = (dataToSend, currentPage, limit,) => {
    setLoading(true);
    const obj = { email: Email, password: Password };
    login(obj, basicToken)
      .then((res) => {
        if (res.code === 200) {
          const {
            data: {
              tokens: { refresh , access},
              user,
            },
          } = res;

          const accessToken = access.token;
          //console.log("000000000",res)
          // dispatch(setAccessToken(access.token)); 
          dispatch(setLoginStatus({ status: true }));
          dispatch(setUserInfo({ info: { ...user, refresh } }));
          dispatch(setRes({ res })); // Dispatch new action to set 'res'
          
          // Store the relevant data in local storage
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('user_info', JSON.stringify({ ...user, refresh }));
        
          toast.success("Login successful!");
          // console.log("user::",refresh,user)
          
        } else {
          toast.error("Access token is missing in the response.");
        }
        setLoading(false);
      })
      //.catch((e) => console.log("Login Error: ", e));
      .catch((e) => {
        console.log('Login Error: ', e);
        toast.error('Something went wrong!');
      });
  };
  //handleLogin(yourAccessToken);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 p-0 m-0">
          <Carousel
            className="p-0 m-0"
            autoPlay
            interval={2000}
            renderThumbs={() => {}}
          >
            <div>
              <img src={image1} alt="Image 1" className="img-fluid h-100" />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src={image2} alt="Image 2" className="img-fluid h-100" />
              <p className="legend">Legend 2</p>
            </div>
            {/* <div>
              <img src={image3} alt="Image 3" className="img-fluid" />
              <p className="legend">Legend 3</p>
            </div> */}
          </Carousel>
        </div>

        <div className="col-lg-7 mt-4 mt-lg-0">
          <div className="w-50 mx-auto">
            <div className="text-center">
              <h2 className="font-weight-bold mt-5">Log in</h2>
              <p className="font-size-md">Don't have an account yet?</p>
              <p className="font-size-md font-weight-bold mt-3">
                Create your free account
              </p>
            </div>
            <form>
              <div className="form-group mb-4">
                <label htmlFor="email" className="font-weight-bold text-black">
                  Email address
                </label>
                <input
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter Your Email"
                  type="email"
                  className="form-control"
                  autoComplete="off"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group " style={{ marginBottom: "0" }}>
                <label
                  htmlFor="password"
                  className="font-weight-bold text-black"
                >
                  Password
                </label>
                <input
                  name="password"
                  id="examplePassword"
                  placeholder="Enter Your Password"
                  type="password"
                  className="form-control"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-right">
                <a href="#" className="btn btn-link">
                  Forget Password ?
                </a>
              </div>
              <div className="mt-3">
                <label className="d-flex align-items-center">
                  <input className="mr-2" type="checkbox" />
                  <span>Keep me logged in</span>
                </label>
              </div>
            </form>

            <div>
              <button
                className="btn btn-primary btn-lg btn-block mt-4"
                disabled={loading}
                onClick={() => {
                  if (!loading) {
                    handleLogin();
                  }
                }}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm mx-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : null}
                {loading ? "Fetching..." : "Log in"}
              </button>

              <button className="btn btn-light btn-lg btn-block mt-4">
                Login with <b className="mx-1">GitHub</b>
              </button>

              <div className="text-center">
                <a href="#" className="btn btn-link">
                  By logging in you agree to our{" "}
                  <b className="mx-1">Terms and Conditions</b>
                </a>
              </div>
            </div>
          </div>
          <button
            style={{ borderRadius: 50, fontSize: 20 }}
            className="btn  btn-primary  px-4 mt-4 rounded-5 float-right"
          >
            Help
            <i class="fa-regular fa-question mx-2 header-user-info font-size-lg "></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
