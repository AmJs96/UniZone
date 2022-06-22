import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { UserAuth } from "../AuthContextProvider";
import { Avatar } from "@mui/material";
import { Upload } from "../AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "./Profile.css";
function Profile() {
  const { user } = UserAuth();
  const [modal, setModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [level, setLevel] = useState("");
  const [bio, setBio] = useState("");
  const [info,setInfo] = useState("");
  const navigate = useNavigate();
  const toggleModal = () => {
    setModal(!modal);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const handleClick = () => {
    Upload(photo, user, setLoading);
  };
  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  // const handleInfo = (e) =>{
  //   e.preventDefault();
  //   const {university, value} = e.target;
  //   setInfo((prev)=>{
  //     return {...prev,[university]:value}
  //   })
  // }
  useEffect(() => {
    db
      .collection("Users")
      .onSnapshot((snapshot) => {
        setInfo(
          snapshot.docs.map((doc) => ({
            profid: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  const addDoc = (e) => {
    e.preventDefault();
    db.collection("Users").add({
      uid: user.uid,
      university: university,
      major: major,
      level: level,
      bio: bio,
    });
    setUniversity("");
    setMajor("");
    setLevel("");
    setBio("");
    navigate("/profile")
  };
  return (
    <Layout>
      <div className="userProfile">
        <h1>Profile</h1>
        <div className="profile__info">
          <Avatar src={photoURL} className="profile__pic" />
          {/* <img src={photoURL} alt="Avatar" className="avatar" /> */}
          <input
            className="profilePicInput"
            type="file"
            onChange={handleChange}
          />
          <button
            className="uploadbtn"
            disabled={loading || !photo}
            onClick={handleClick}
          >
            Upload
          </button>

        <div className="profilecontent">
          <p>
            Name: <span>{user && user.displayName}</span>
          </p>
          <p>
            Email: <span>{user && user.email}</span>
          </p>
         <div> <p>
            University: <span>{info.university}IIUM</span>
          </p>
          <p>
            Major: <span>{info.major}BIT</span>
          </p>
          <p>
            Level: <span>{info.level}4</span>
          </p>
          <p>
            Bio: <span>{info.bio}passionate in designing websites</span>
          </p></div>
        </div>
        </div>
      </div>
      <button className="edit_btn" onClick={toggleModal}>
        Edit Profile
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <form>
                <p>
                  Name: <span>{user && user.displayName}</span>
                </p>
                <p>
                  Email: <span>{user && user.email}</span>
                </p>
                <input
                  type="text"
                  id="university"
                  placeholder="University"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
                <input
                  type="text"
                  id="major"
                  placeholder="Major"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
                <input
                  type="text"
                  id="level"
                  placeholder="Level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
                <textarea
                  id="bio"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <button onClick={addDoc} type="submit" className="save_btn">
                  seve
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;

// onClick={toggleModal}
// {modal && (
//   <div className="modal">
//     <div className="overlay">
//       <div className="modal-content">
//         <form onSubmit={addDoc}  >
//           <p>
//             Name: <span>{user && user.displayName}</span>
//           </p>
//           <p>
//             Email: <span>{user && user.email}</span>
//           </p>
//           <input type="text" name="university" placeholder="University" value={info.university}  onChange={handleInfo} />
//           <input type="text" id="major" placeholder="Major"value={info.major} onChange={handleInfo} />
//           <input
//             type="text"
//             id="level"

//             placeholder="Level"
//             value={info.level} onChange={handleInfo}
//           />
//           <textarea id="bio" placeholder="Bio"value={info.bio} onChange={handleInfo} />
//           <button  className="save_btn">
//             seve
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// )}
