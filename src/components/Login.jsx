import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("dhanu.dm@gmail.com");
  const [password, setPassword] = useState("Dhanu@dm1250");
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

      dispatch(addUser(response.data.data));
      return navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center py-10  bg-base-100 ">
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <form
            className="fieldset bg-base-200 border-base-300 rounded-box border p-4 "
            onSubmit={handleSubmit}
          >
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
              <p className="validator-hint hidden">Required</p>
            </fieldset>

            <label className="fieldset">
              <span className="label">Password</span>
              <input
                type="password"
                className="input validator"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="validator-hint hidden">Required</span>
            </label>
            <p className="text-red-600">{error}</p>

            <button className="btn btn-neutral mt-4" type="submit">
              Login
            </button>
            <button className="btn btn-ghost mt-1" type="reset">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
