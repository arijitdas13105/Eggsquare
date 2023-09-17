import React from 'react'
import ReactLoading from "react-loading";
// import "../App.css";

const Loading = () => {
  return (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    
        <ReactLoading 
        type="spinningBubbles"
        color="red"
        height={100}
        width={100}
      />

      
    </div>
  )
}

export default Loading