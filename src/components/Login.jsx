import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

function Login({ openSignup }) {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="auth-content">

            <h2>Login</h2>

            <p className="auth-text">Don't have an account ?{" "}
                <button type="button" className="text-link" onClick={openSignup}>Signup</button>
            </p>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
                <button type="submit" className="auth-btn">Login</button>
            </form>

            <div className="social-divider">
                <span></span>
                <p>or login with</p>
                <span></span>
            </div>

            <div className="social-login">
                <button type="button" className="facebook">
                    <FaFacebookF />Facebook
                </button>

                <button type="button" className="google">
                    <FaGoogle />Google
                </button>

                <button type="button" className="twitter">
                    <FaTwitter />Twitter
                </button>
            </div>

        </div>
    );
}

export default Login;