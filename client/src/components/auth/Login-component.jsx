import React, { useState, useEffect, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

import setAuthToken from "../../utils/setAuthToken";

import classnames from "classnames";
import {
  LOGIN_CLASS_BODY,
  CUSTOMER_NAME_COLOUR,
  CUSTOMER,
} from "../../constants/index";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, errors, clearErrors, isAuthenticated, loadUser } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
    // errors: {},
  });

  const { email, password } = user;

  useEffect(() => {
    document.body.classList.add(LOGIN_CLASS_BODY);
    // Setting wrapper class to display none
    //var items = document.getElementsByClassName("wrapper");
    // console.info("[DEBUG] Login-Component css ", items);
    //items[0].style.display = "none";
    //console.log(items);

    if (errors) {
      // Set Alert on errors
      //setAlert(errors, "danger");

      clearErrors();
    }
    // eslint-disable-next-line
  }, [errors]);

  useEffect(() => {
    document.body.className = document.body.className.replace(
      "sidebar-mini",
      ""
    );
    if (localStorage.token) {
      loadUser();
    }

    if (authContext.token) {
      // var items = document.getElementsByClassName("wrapper");
      // // console.info("[DEBUG] Login-Component css ", items);
      // items[0].style.removeProperty("display");
      //items[0].style.display = "inline";
      setAuthToken(localStorage.token);
      props.history.push("/dashboard");
      //sidebar-mini
    }
  }, [authContext]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  //Customer Head Styles
  const CustomerHeaderStyle = {
    fontWeight: "500",
    color: CUSTOMER_NAME_COLOUR,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });

    // Promise.all([login]).then((values) => {
    //   console.info("[DASHBOARD] Loging Component ", values);
    //   if (authContext.isAuthenticated) {
    //     // var items = document.getElementsByClassName("wrapper");
    //     // // console.info("[DEBUG] Login-Component css ", items);
    //     // items[0].style.removeProperty("display");
    //     //items[0].style.display = "inline";
    //     props.history.push("/dashboard");
    //     //sidebar-mini
    //   }
    // });
  };

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="#">
          <span style={CustomerHeaderStyle}>{CUSTOMER}</span> Digitization
          Operations Console
        </a>
      </div>
      {/* /.login-logo */}
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form onSubmit={onSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                className={classnames("form-control", {
                  "is-invalid": errors.email,
                })}
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>

              {errors.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors.password,
                })}
                name="password"
                placeholder="Password"
                onChange={onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>
              {/* /.col */}
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
          <div className="social-auth-links text-center mb-3">
            <p>- OR -</p>
            {/* <a href="#" className="btn btn-block btn-primary">
                 <i className="fab fa-facebook mr-2" /> Sign in using Facebook
               </a> */}
            <a href="#" className="btn btn-block btn-danger">
              <i className="fab fa-google-plus mr-2" /> Sign in using Google
            </a>
          </div>
          {/* /.social-auth-links */}
          <p className="mb-1">
            <a href="#">I forgot my password</a>
          </p>
          <p className="mb-0">
            <a href="#" className="text-center">
              Register
            </a>
          </p>
        </div>
        {/* /.login-card-body */}
      </div>
    </div>
  );
};

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",

//       errors: {},
//     };
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   componentDidMount() {
//     document.body.classList.add(LOGIN_CLASS_BODY);
//     // Setting wrapper class to display none
//     var items = document.getElementsByClassName("wrapper");
//     items[0].style.display = "none";
//     //console.log(items);
//   }

//   componentWillUnmount() {
//     document.body.classList.remove(LOGIN_CLASS_BODY);
//   }

//   render() {
//     const { email, password, errors } = this.state;

//     //Customer Head Styles
//     const CustomerHeaderStyle = {
//       fontWeight: "500",
//       color: CUSTOMER_NAME_COLOUR,
//     };
//     return (
//       <div className="login-box">
//         <div className="login-logo">
//           <a href="../../index2.html">
//             <span style={CustomerHeaderStyle}>{CUSTOMER}</span> Digitization
//             Operations Console
//           </a>
//         </div>
//         {/* /.login-logo */}
//         <div className="card">
//           <div className="card-body login-card-body">
//             <p className="login-box-msg">Sign in to start your session</p>
//             <form onSubmit={onSubmit}>
//               <div className="input-group mb-3">
//                 <input
//                   type="email"
//                   className={classnames("form-control", {
//                     "is-invalid": errors.email,
//                   })}
//                   name="email"
//                   placeholder="Email"
//                   onChange={onChange}
//                 />
//                 <div className="input-group-append">
//                   <div className="input-group-text">
//                     <span className="fas fa-envelope" />
//                   </div>
//                 </div>

//                 {errors.email ? (
//                   <div className="invalid-feedback">{errors.email}</div>
//                 ) : null}
//               </div>
//               <div className="input-group mb-3">
//                 <input
//                   type="password"
//                   className={classnames("form-control", {
//                     "is-invalid": errors.password,
//                   })}
//                   name="password"
//                   placeholder="Password"
//                   onChange={onChange}
//                 />
//                 <div className="input-group-append">
//                   <div className="input-group-text">
//                     <span className="fas fa-lock" />
//                   </div>
//                 </div>
//                 {errors.password && (
//                   <div className="invalid-feedback">{errors.password}</div>
//                 )}
//               </div>
//               <div className="row">
//                 <div className="col-8">
//                   <div className="icheck-primary">
//                     <input type="checkbox" id="remember" />
//                     <label htmlFor="remember">Remember Me</label>
//                   </div>
//                 </div>
//                 {/* /.col */}
//                 <div className="col-4">
//                   <button type="submit" className="btn btn-primary btn-block">
//                     Sign In
//                   </button>
//                 </div>
//                 {/* /.col */}
//               </div>
//             </form>
//             <div className="social-auth-links text-center mb-3">
//               <p>- OR -</p>
//               {/* <a href="#" className="btn btn-block btn-primary">
//                 <i className="fab fa-facebook mr-2" /> Sign in using Facebook
//               </a> */}
//               <a href="#" className="btn btn-block btn-danger">
//                 <i className="fab fa-google-plus mr-2" /> Sign in using Google
//               </a>
//             </div>
//             {/* /.social-auth-links */}
//             <p className="mb-1">
//               <a href="forgot-password.html">I forgot my password</a>
//             </p>
//             <p className="mb-0">
//               <a href="register.html" className="text-center">
//                 Register
//               </a>
//             </p>
//           </div>
//           {/* /.login-card-body */}
//         </div>
//       </div>
//     );
//   }
// }

export default Login;
