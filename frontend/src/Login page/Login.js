import React from 'react'
import './Login.css'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Login = () => {
  return (
    <>
    
   <div className="login_form">
  <form action="/">
    <h3>Log in with</h3>
    <div className="login_option">
      
      <div className="option">
        <a href="/">
          <GoogleIcon/>
          <span>Google</span>
        </a>
      </div>
      <div className="option">
        <a href="/">
          <FacebookIcon/>
          <span>facebook</span>
        </a>
      </div>
    </div>
    <p className="separator">
      <span>or</span>
    </p>
    <div className="input_box">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" placeholder="Enter email address" required />
    </div>
    <div className="input_box">
      <div className="password_title">
        <label htmlFor="password">Password</label>
        <a href="/">Forgot Password?</a>
      </div>
      <input type="password" id="password" placeholder="Enter your password" required />
    </div>
    <button type="submit">Log In</button>
    <p className="sign_up">Don't have an account? <a href="/">Sign up</a></p>
  </form>
</div>

    </>
  )
}

export default Login
