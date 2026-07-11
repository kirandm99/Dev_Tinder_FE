import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(response?.data?.data));
      return navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(response?.data?.data));
      return navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const formatNameInput = (value) => {
    const lettersOnly = value.replace(/[^a-zA-Z]/g, "");
    return lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1);
  };

  return (
    <div className="flex justify-center items-center py-10  bg-base-100 ">
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <form
            className="fieldset bg-base-200 border-base-300 rounded-box border p-4 "
            onSubmit={isLoginForm ? handleSubmit : handleSignUp}
          >
            {!isLoginForm && (
              <>
                <label className="fieldset">
                  <span className="label">First Name</span>
                  <input
                    type="text"
                    className="input validator"
                    placeholder="First Name"
                    required
                    value={firstName}
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    // onChange={(e) => setFirstName(e.target.value)}
                    minLength="4"
                    maxLength="20"
                    onChange={(e) =>
                      setFirstName(formatNameInput(e.target.value))
                    }
                  />
                  <p className="validator-hint hidden">
                    Required and Must be 4 to 30 characters
                  </p>
                </label>

                <label className="fieldset">
                  <span className="label">Last Name</span>
                  <input
                    type="text"
                    className="input validator"
                    placeholder="Last Name"
                    minLength="2"
                    maxLength="20"
                    required
                    value={lastName}
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    // onChange={(e) => setLastName(e.target.value)}
                    onChange={(e) =>
                      setLastName(formatNameInput(e.target.value))
                    }
                  />
                  <p className="validator-hint hidden">
                    {" "}
                    Required and Must be 2 to 30 characters
                  </p>
                </label>
              </>
            )}

            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input validator"
                placeholder="Email"
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <p className="validator-hint hidden">Enter Valid Email Address</p>
            </fieldset>

            <label className="fieldset">
              <span className="label">Password</span>
              <input
                type="password"
                className="input validator"
                placeholder="Password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <span className="validator-hint hidden">Required</span> */}
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </label>
            <p className="text-red-600">{error}</p>

            <button className="btn btn-neutral mt-4" type="submit">
              {isLoginForm ? "Login" : "SignUp"}
            </button>
            {/* <button className="btn btn-ghost mt-1" type="reset">
              Reset
            </button> */}
            <p
              className="m-auto my-5 cursor-pointer"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User ? SignUp Here"
                : "Existing User ? Login Here"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
