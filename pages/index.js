import { useState } from "react";
import { useRouter } from "next/navigation"

import { query } from "../helpers/eric-sql"

import { toast } from "react-hot-toast"

import styles from "./index.module.css"

export default function Board({ board }) {
  const router = useRouter();
  const [data, setData] = useState({"content": "", "name": ""});
  
  const post = async () => {
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: data.content,
        name: data.name
      })
    });

    if (response?.ok) {
      toast.success("Posted!")
      // router.refresh();
    } else {
      toast.error("")
    }
  };

  const getDateTime = (timestamp) => {
        const date = new Date(timestamp)
        const dateString = date.toLocaleDateString(); // e.g., "3/15/2023" (depending on locale)
        const timeString = date.toLocaleTimeString(); // e.g., "12:00:00 PM" (depending on locale)
        return `${dateString} ${timeString}`;
  }

  return (
    <div className = {styles.pageWrapper}>
      <div className = {styles.header}>EricSQL Demo</div>
      <div className = {styles.subHeader}>Leave a message!</div>
      <div className = {styles.formWrapper}>
        <form>
          <div>
            <p className = {styles.inputLabel}>Your name: </p>
            <input
              type={"text"}
              onChange={(e) => {setData({...data, name: e.target.value})}}
              value={data.name}
            ></input>
          </div>
          <div>
            <br/>
            <p className = {styles.inputLabel}>Your message:</p>
            <textarea 
              onChange = {(e) => {setData({...data, content: e.target.value})}}
              value={data.content}
              className = {styles.textArea}
            ></textarea>
          </div>
          <br/>
          <div>
            <button onClick={post}><b>Post</b></button>
          </div>
        </form>
      </div>
      <div>
        {board && 
          board.map((message) => (
            <div className = {styles.message} key = {message[2]}>
              <span className={styles.signature}>From <b>{message[1]}</b>
              </span> <span className = {styles.timestamp}> {getDateTime(message[2])} </span> <br/><br/>
              {message[0].replaceAll("\\\"", "\"")}
            </div>
          ))
        }
      </div>
    </div>
    
  );
}

export const getServerSideProps = async (context) => {
  try {
    const [board] = await query("SELECT * FROM Board ORDER BY Timestamp desc");
    return {
      props: { board }
    };
  } catch(e) {
    console.error(e);
  }
}