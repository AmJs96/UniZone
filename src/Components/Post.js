import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import InputOptions from "./InputOptions";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import PostedPost from "./PostedPost";
import CreateIcon from "@mui/icons-material/Create";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideocamIcon from "@mui/icons-material/Videocam";
import { UserAuth } from "../AuthContextProvider";
import "./Post.css";
function Post() {
  const [posts, setPosts] = useState([]);
  const { user } = UserAuth();
  const [input, setInput] = useState("");
  const [imageToPost, setImageToPost] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    db.collection("posts")
      .add({
        name: user && user.displayName,
        message: input,
        photoURL: user && user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage.ref(`posts/${doc.id}`).put(imageToPost);

          removeImage();

          uploadTask.on(
            "state_change",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`progress: ${progress}%`);
              if (snapshot.state === "Running") {
                console.log(`progress: ${progress}%`);
              }
            },
            (error) => console.error(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        } else if (videoLink) {
          db.collection("posts").doc(doc.id).set(
            {
              postVideo: videoLink,
            },
            { merge: true }
          );
        }
      });
    setInput("");
  };
  const handleOnChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setImageToPost(image);
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  const switchAssetArea = (area) => {
    setImageToPost("");
    setVideoLink("");
    setAssetArea(area);
  };
  // const deletePost = (id) =>{
  //   db.collection("posts")
  //   .doc(id)
  //   .delete();
  // }

  return (
    <div className="post">
      <div className="post_inputcontainer">
        <div className="post__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Post
            </button>
          </form>
        </div>
        <div className="upload__files">
          {assetArea === "image" ? (
            <div className="uploadImage">
              <input
                type="file"
                accept="image/x-png, image/jpeg"
                name="image"
                id="file"
                style={{ display: "none" }}
                onChange={handleOnChange}
              />
              <p className="uploadImage__p">
                <label htmlFor="file">Select an image</label>
              </p>
              {imageToPost && (
                <div onClick={removeImage}>
                  <img
                    className="image__toPost"
                    src={URL.createObjectURL(imageToPost)}
                    alt=""
                  />
                  <p className="remove__Image">Remove</p>
                </div>
              )}
            </div>
          ) : (
            assetArea === "media" && (
              <>
                <input
                  className="inputVideo"
                  type="text"
                  placeholder="Please input video link"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
                {videoLink && (
                  <ReactPlayer controls width={"100%"} url={videoLink} />
                )}
              </>
            )
          )}
        </div>

        <div className="post__inputOptions">
          <div
            className="imageWrapper"
            onClick={() => switchAssetArea("image")}
          >
            <InputOptions
              Icon={AddPhotoAlternateIcon}
              title="Image"
              color="#76438a"
              onClick={() => switchAssetArea("image")}
            />
          </div>
          <div
            className="videoWrapper"
            color="#76438a"
            onClick={() => switchAssetArea("media")}
          >
            <InputOptions Icon={VideocamIcon} title="Video" color="#76438a" />
          </div>
        </div>
      </div>
      {posts.map(
        ({
          id,
          data: {
            name,
            message,
            photoURL,
            postImage,
            postVideo,
            timestamp,
            postId,
          },
        }) => (
          <PostedPost
            key={id}
            postId={id}
            name={name}
            timestamp={timestamp}
            message={message}
            photoURLP={photoURL}
            postImage={postImage}
            postVideo={postVideo}
          />
        )
      )}
    </div>
  );
}

export default Post;
