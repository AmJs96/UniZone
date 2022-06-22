import { Avatar, IconButton } from "@mui/material";
import React from "react";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
// import firebase from "firebase/compat/app";

import "./CommentedComment.css";


function CommentedComment({ name, comment, photoURL, timestamp, commentId}) {
// const ref = db.collection("comments").doc(commentId)
//   const deleteComment = () => {
   
//    }

  return (
    <div className="CommentedComment">
      <div className="CommentedComment_header">
        <Avatar src={photoURL} />
        <div className="comment_info">
          <h4>{name}</h4>
          <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
        </div>
        {/* <div onClick={e => db.collection("comments").doc(commentId)} className="delete_comment">
          <ClearSharpIcon />
        </div> */}
        <IconButton  >
          <ClearSharpIcon/>
        </IconButton>
      </div>
      <div className="commentedComment_body">
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default CommentedComment;
