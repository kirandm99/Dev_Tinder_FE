import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [error, setError] = useState("");
  const [showToast, setToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    setError("");
    try {
      e.preventDefault();
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          about,
          gender,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => setToast(false), 5000);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center items-center mx-10  bg-base-100 ">
          <div className="card bg-base-200 w-96 shadow-sm ">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <form className="fieldset bg-base-200 border-base-300 rounded-box border p-4 ">
                <fieldset className="fieldset">
                  <label className="label">First Name</label>
                  <input
                    type="firstName"
                    className="input validator"
                    placeholder="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <p className="validator-hint hidden">Required</p>
                </fieldset>

                <label className="fieldset">
                  <span className="label">Last Name</span>
                  <input
                    type="lastName"
                    className="input validator"
                    placeholder="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="fieldset">
                  <span className="label">Photo URL</span>
                  <input
                    type="photoUrl"
                    className="input validator"
                    placeholder="photoUrl"
                    required
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                <label className="fieldset">
                  <span className="label">Age</span>
                  <input
                    type="age"
                    className="input validator"
                    placeholder="age"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="fieldset">
                  <span className="label">Gender</span>
                  <input
                    type="age"
                    className="input validator"
                    placeholder="age"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>

                <label className="fieldset">
                  <span className="label">About</span>
                  <input
                    type="about"
                    className="input validator"
                    placeholder="about"
                    required
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
                <p className="text-red-600">{error}</p>

                <button
                  className="btn btn-neutral mt-4"
                  type="button"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, about, gender }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
