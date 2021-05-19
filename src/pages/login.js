import { useState } from "react";
import "./login.css";
import { connect } from "react-redux";
import DashBoard from "./dashboard";
import { signIn } from "../actions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);

  const handleSubmit = () => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !password || !re.test(email)) {
      setError(true);
    } else {
      setError(false);
      props.signIn({ email: email, isAdmin: email === "admin@admin.com" });
      setEmail("");
      setPassword("");
    }
  };

  return props?.user?.email ? (
    <DashBoard />
  ) : (
    <div className="container login-container">
      <div className="form-box">
        <h4>Log In</h4>
        <br />
        <div className="body-form">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isError && (
              <div className="error">
                Please enter valid email and password.
              </div>
            )}
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={handleSubmit}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { signIn })(Login);
