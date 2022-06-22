import React from "react";
import InputOptions from "./InputOptions";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { UserAuth } from "../AuthContextProvider";
import firebase from "firebase/compat/app";
import { db } from "../firebase";

import ReactPlayer from "react-player";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar,IconButton } from "@mui/material";

// import { IconButton } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
import "./PostedPost.css";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState, useEffect } from "react";
import CommentedComment from "./CommentedComment";

function PostedPost({
  postId,
  photoURLP,
  name,
  message,
  videoLink,
  postImage,
  postVideo,
  timestamp,
  deletePost,
  props,
}) {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const { user } = UserAuth();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(0);
  const [likeActive, seLikeActive] = useState(false)
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const deleteComment = (data, commentId) => {
    db.collection("comments").doc(commentId).delete(data)}
  
  const showCommentBox = () => {
    setShowComment(true);
  };
  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            commentId: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [postId]);
  const sendComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        name: user && user.displayName,
        uid: user && user.uid,
        comment: input,
        photoURL: user && user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };

  const likebtn =() =>{
    if (likeActive) {
      seLikeActive(false)
      setLike (like-1)
    }else 
    seLikeActive(true)
    setLike (like+1)
  }

  return (
    //Posts
    <div className="postedPost">
      <div className="postedPost_Mheader">
        <div className="postedPost_header">
          <Avatar src={photoURLP} />
          <div className="post__info">
            <h2>{name}</h2>
            <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
          </div>
        </div>

        {/* <div className="dots">
          <div className="PostedPostMenu">
            <IconButton
              aria-label="more"
              onClick={handleClick}
              aria-haspopup="true"
              aria-controls="long-menu"
              
            >
           <div className="threedots">  <MoreHorizIcon /></div> 
            </IconButton>
            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem> */}
        {/* <MenuItem onClick={()=>{props.deletePost()}}>Delete</MenuItem> */}
        {/* </Menu>
          </div> */}
        {/* </div> */}
      </div>

      <div className="postedPost__body">
        <p>{message}</p>
        {(
          <div className="imgpost">
            <img src={postImage} alt="" />
          </div>
        ) || <ReactPlayer controls width={"100%"} url={postVideo} />}
      </div>

      <div className="postedPost__buttons">
        {/* <div className="likebtn"> */}
        {/* <IconButton onClick={likebtn}>  
          <InputOptions Icon={FavoriteIcon} title="Like" color="grey" />
          </IconButton>
        </div> */}
        <button onClick={likebtn}><FavoriteIcon/>{like}</button>
        <div className="commentbtn" onClick={showCommentBox}>
          <InputOptions Icon={MessageIcon} title="Comment" color="grey" />
        </div>
      </div>

      {showComment ? (
        <div className="comment_post">
          {comments.map(
            ({
              id,
              data: { commentId, name, comment, photoURL, timestamp},
            }) => (
              <CommentedComment
              key={id}
              commentId={commentId}
              name={name}
              timestamp={timestamp}
              message={message}
              photoURL={photoURL}
              comment={comment}
 
              />
              
            )
            
          )}
          <form>
            <input
              value={input}
              className="comment_input"
              placeholder="Add new comment"
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendComment} type="submit">
              Comment
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default PostedPost;
