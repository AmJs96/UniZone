// import React, { useState, useEffect } from "react";
// import CommentedComment from "./CommentedComment";
// import { db } from "../firebase";
// import firebase from "firebase/compat/app";
// import { UserAuth } from "../AuthContextProvider";
// import "./Comment.css";

// function Comment({ postId }) {
//   const { user } = UserAuth();
//   const [comments, setComments] = useState([]);
//   const [input, setInput] = useState("");
//   const commentRef = doc(db,"posts",postId)

//   // useEffect(() => {
    
//   //   db.collection("comments")
//   //     .orderBy("timestamp", "asc")
//   //     .onSnapshot((snapshot) =>
//   //       setComments(
//   //         snapshot.docs.map((doc) => ({
//   //           id: doc.id,
//   //           data: doc.data(),
//   //         }))
//   //       )
//   //     );
//   // }, [postId]);
//   useEffect(()=>{
//     const docRef = doc(db,"posts",postId)
//     onSnapshot(docRef,(onSnapshot)=>{
//       setComments(onSnapshot.data().comments)
//     })
//   },[])

//   // const sendComment = (e) => {
//   //   e.preventDefault();
//   //   db.collection("comments").add({
//   //     name: user && user.displayName,
//   //     comment: input,
//   //     photoUrl: "",
//   //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//   //   });

//   //   setInput("");
//   // };
//   const sendComment = (e) => {
//     updatDoc(commentRef,{
//       name: user && user.displayName,
//       comment: input,
//       photoUrl: "",
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     })
//   }
//   return (
//     <div className="comment_post">
//       {comments.map(({ id, data: { name, comment, photoUrl, timestamp } }) => (
//         <CommentedComment
//           key={id}
//           name={name}
//           comment={comment}
//           photoUrl={photoUrl}
//           timestamp={timestamp}
//         />
//       ))}
//       <form>
//         <input
//           value={input}
//           className="comment_input"
//           placeholder="Add new comment"
//           onChange={(e) => setInput(e.target.value)}
//           type="text"
//         />
//         <button onClick={sendComment} type="submit">
//           Comment
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Comment;
