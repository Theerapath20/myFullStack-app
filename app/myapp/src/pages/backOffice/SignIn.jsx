import axios from 'axios' 
import Swal from 'sweetalert2'
import config from "../../config.jsx";
import {useNavigate} from "react-router-dom";
import { useState } from "react";




function SignIn() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try{
      const res = await axios.post(config.apiPath + "/user/signIn", user);

      if(res.data.token !== undefined){
        localStorage.setItem("token", res.data.token);
        navigate('/home');
      }
    }catch(e){
      if(e.response.status === 401){
        Swal.fire({
          title: 'sign in',
          text: 'username or password invalid',
          icon: 'warning'
        })
      }else {
        Swal.fire({
          title: 'error',
          text:e.message,
          icon: 'error',
        });
      }
   }
  };
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>Admin</b>LTE
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <div >
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={e => setUser({ ...user, user: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e => setUser({ ...user, pass: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
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
                  <button
                  
                    className="btn btn-primary btn-block"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
                {/* /.col */}
              </div>
            </div>
            <div className="social-auth-links text-center mt-2 mb-3">
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </a>
            </div>
            {/* /.social-auth-links */}
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="register.html" className="text-center">
                Register a new membership
              </a>
            </p>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
}

export default SignIn