import React, { useState, useRef } from "react";
import Layout from "../Components/Layout";
import "./Message.css";
import EmailIcon from '@mui/icons-material/Email';
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserAuth } from "../AuthContextProvider";
import { Avatar } from "@mui/material";
import firebase from "firebase/compat/app";

function Message() {
  return (
    <Layout>
      <div className="messages">
        <header>
          <h1><EmailIcon/></h1>
        </header>
        <section>{<ChatRoom />}</section>
      </div>
    </Layout>
  );
}
export function ChatRoom() {
  const dummy = useRef();
  const messagRef = db.collection("messages");
  const query = messagRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const { user } = UserAuth();

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = user;
    

    await messagRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="chatroom">
      <main>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" >Send</button>
        
      </form>
    </div>
  );
}

export function ChatMessage(props) {
  const { user } = UserAuth();
  const { text, displayName,photoURL, uid } = props.message;
  const messageClass = uid === user.uid ? "sent" : "received";
  return (
    <div className="display">
      <div className={`message ${messageClass}`}>
        <div className="avatarr">
          {" "}
          <Avatar src={photoURL} />
        </div>
        <h4>{displayName}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message;
