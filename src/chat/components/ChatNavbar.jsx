import React from 'react'
import '../CSS/ChatNavbar.css'
export default function ChatNavbar(props) {
  const patient=props.patient;
  return (
    <div className='chatNavbar'>
      <span className='ChatAppLogo'>Tranquil Minds</span>
      <div className="Chatuser">
        <img className='chatProfileImg' src="data:image/jpeg;base64,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" alt=""/>
        {/* <span>Vivek</span> */}
      </div>
    </div>
  )
}
