import React,{useEffect, useState} from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import { CollectionReference, DocumentData, DocumentReference, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";



const Chat = () => {
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const [inputText,setInputText] = useState<string>("");
  const {subDocuments: messages} = useSubCollection("channels","messages");
  

  // console.log(channelName);
  // useEffect(() => {
  //   let collectionRef = collection(db,"channels",String(channelId),"messages");

  //   const collectionRefOrderBy = query(
  //     collectionRef,
  //     orderBy("timestamp","desc")
  //   );

  //   onSnapshot(collectionRefOrderBy,(snapshot) => {
  //     let results: Messages[] = [];
  //     snapshot.docs.forEach((doc) => {
  //       results.push({
  //         timestamp: doc.data().timestamp,
  //         message: doc.data().message,
  //         user: doc.data().user,
  //       });
  //     });
  //     setMessages(results);
  //     console.log(results);
  //   });
  // },[channelId]);

  const  sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // console.log("send message");

    // channelsコレクションの中にあるMessagesコレクションの中にMessageを入れる
    const collectionRef: CollectionReference<DocumentData> = collection(db,"channels",String(channelId),"messages");

   const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef,{
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    // console.log(docRef);
    setInputText("");
  };

  return (
    <div className="chat">
      {/* chatHeader */}
        <ChatHeader channelName={channelName} />
      {/* chatMessage */}
      <div className="chatMessage">
        {messages.map((message,index) => (

        <ChatMessage 
        key={index} 
        message={message.message} 
        timestamp ={message.timestamp}
        user={message.user}
         />
        ))}
        {/* <ChatMessage />
        <ChatMessage />
        <ChatMessage /> */}
      </div>
      {/* chatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input type="text" placeholder="#udemyへメッセージを送信" onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
          value={inputText}
          />
          <button type="submit" className="chatInputButton" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>
            送信
          </button>
        </form>
        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
