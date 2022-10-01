import React from "react";

function Message({ keyForMsg, message, sender, time }) {
  return (
    <div key={keyForMsg} className="p-3 m-2">
      <h1>{sender}</h1>
      <h3>{time}</h3>
      <h4>{message}</h4>
    </div>
  );
}

export default Message;
