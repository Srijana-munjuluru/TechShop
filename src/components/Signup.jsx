import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

function Signup({ openLogin }) {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="auth-content">
            <h2>Signup</h2>

            <p className="auth-text">Already have an account ?{" "}
                <button type="button" className="text-link" onClick={openLogin}>
                    Login
                </button>
            </p>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" required/>
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
                <input type="password" placeholder="Confirm Password" required/>
                <button type="submit" className="auth-btn">Signup</button>
            </form>

            <div className="social-divider">
                <span></span>
                <p>or login with</p>
                <span></span>
            </div>

            <div className="social-login">
                <button type="button" className="facebook">
                    <FaFacebookF />
                    Facebook
                </button>

                <button type="button" className="google">
                    <FaGoogle />
                    Google
                </button>

                <button type="button" className="twitter">
                    <FaTwitter />
                    Twitter
                </button>
            </div>

        </div>
    );
}

export default Signup;