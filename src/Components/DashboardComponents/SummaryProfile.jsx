import React from 'react'
// import { useAppContext } from '../AppContext/AppContext';
function SummaryProfile({user}) {
    // const { user, token } =useAppContext();

  return (
    <>
      <div className="profile-card">
        {/* <img src={`/${user?.dp}`} */}
        <img src={`/profile.png`}
          alt="Profile Avatar" className="avatar" />
          <h2>{user?.init_name || "Add Your Name"}</h2>
          <p>{user?.account_type || "Add Your Role"}</p>
          <p>{user?.account_type === 'Student' ? user?.batch + " Batch" : null}</p>
          <p>{!user?.account_type === 'Student' ? user?.department : "Department of Information and Communication Technology"}</p>
          <p>{"South Eastern University of Sri Lanka"}</p>
          <div className="action-buttons">
            <button className="follow-btn">Follow</button>
            <button className="message-btn">Message</button>
          </div>
        </div>
        
        </>
  )
}

export default SummaryProfile
