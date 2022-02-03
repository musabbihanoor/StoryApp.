import React from "react";

const Login = ({ setAuth }) => {
  return (
    <div className='absolute login'>
      <div className='absolute-content'>
        <button className='absolute-close' onClick={() => setAuth("")}>
          <i className='fa fa-times'></i>
        </button>
        <form className='d-flex flex-column'>
          <h2 className='fw-bold my-3'>Welcome back!</h2>
          <label className='fw-bold my-2'>Email</label>
          <input placeholder='Enter your email address' />
          <span className='d-flex justify-content-between'>
            <label className='fw-bold my-2'>Password</label>
            <button className='fw-bold'>Forgot password?</button>
          </span>

          <input placeholder='Enter your password' />

          <a className='btn btn-secondary my-3' href='/mainscreen'>
            Login
          </a>
          <span className='d-flex'>
            <hr />
            <label className='mx-3'>or</label>
            <hr />
          </span>
          <button className='btn btn-outline-secondary my-3'>
            Continue with Google
          </button>
          <hr />
          <button className='fw-bold'>
            Not you? Login from a different account
          </button>
          <button className='fw-bold' onClick={() => setAuth("signup")}>
            Don't have an account? Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
