import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Doctor/Pages/Register/Register";
import React, { useState, useEffect } from "react";
import DoctorHome from "./Doctor/Pages/DoctorHome/DoctorHome";
import Footer from "./Doctor/Components/Footer/Footer";
import ViewPosts from "./Doctor/Pages/ViewPosts/ViewPosts"
import ProfileDetails from './Doctor/Pages/ProfileDetails/ProfileDetails'
import PatientDetails from "./Doctor/Pages/PatientDetails/PatientDetails";
import InvalidRole from "./InvalidRole/InvalidRole";
import DoctorDetails from './Admin/Pages/DoctorDetails/DoctorDetails';
import Home from './Admin/Pages/AdminHome/AdminHome';
import Moderator from './Admin/Pages/Moderator/Moderator';
import Responder from './Admin/Pages/Responder/Responder';
import Requests from './Admin/Pages/Requests/Requests';
import Profile from './Admin/Pages/Profile/Profile';
import AdminHome from "./Admin/Pages/AdminHome/AdminHome";
import PostCard from './Moderator/components/PostCard/MPostCard.js';
import QuestionAnswerCard from './Moderator/components/QuestionAnswerCard/MQuestionAnswerCard.js';
import QnA from './Moderator/components/QnA/MQnA.js';
import { Profile_info } from "./Moderator/Info/components/Profile_info/Profile_info.js";
import { MFlaggedPosts } from './Moderator/components/MflaggedPost/MFlaggedPosts.js';
import { RHome } from './Responder/components/Home/RHome.js';
import { RUnanswered } from './Responder/components/Unanswered/RUnanswered.js';
import AnsweringCard from './Responder/components/AnsweringCard/RAnsweringCard.js';
function App() {
  const [role, setRole] = useState(window.localStorage.getItem('userRole')||false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(window.localStorage.getItem('isLoggedIn')) || false
  );
  useEffect(() => {
    const storedRole = window.localStorage.getItem("userRole");
    const storedLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'));
    if (storedRole !== null && storedLoggedIn !== null) {
      setRole(storedRole);
      setIsLoggedIn(storedLoggedIn);
    }
    console.log(isLoggedIn);
    console.log(storedRole);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login setRole={setRole} setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              role === "doctor" ? (
                <DoctorHome />
              ) : role === "admin" ? (
                <AdminHome />
              ) : role === "moderator" ? (
                <MFlaggedPosts />
              ) : role === "responder" ? (
                <RHome />
              ) : (
                <InvalidRole />
              )
            ) : (
              <InvalidRole />
            )
          }
        />
        <Route path="/ViewPosts" exact element={role === 'doctor' && isLoggedIn ? <ViewPosts /> : <InvalidRole />} />
        <Route path="/viewprofile" exact element={role === 'doctor' && isLoggedIn ? <ProfileDetails /> : <InvalidRole />} />
        <Route path="/register" exact element={role === 'doctor' && isLoggedIn ? <Register /> : <InvalidRole />} />
        <Route path="/PatientDetails" exact element={role === 'doctor' && isLoggedIn ? <PatientDetails /> : <InvalidRole />} />
        <Route path="/doctors" exact element={role === 'admin' && isLoggedIn ? <DoctorDetails /> : <InvalidRole />} />
        <Route path="/responders" exact element={role === 'admin' && isLoggedIn ? <Responder /> : <InvalidRole />} />
        <Route path="/moderators" exact element={role === 'admin' && isLoggedIn ? <Moderator /> : <InvalidRole />} />
        <Route path="/requests" exact element={role === 'admin' && isLoggedIn ? <Requests /> : <InvalidRole />} />
        <Route path="/logout" exact element={role === 'admin' && isLoggedIn ? <DoctorDetails /> : <InvalidRole />} />
        <Route path="/profile" exact element={role === 'admin' && isLoggedIn ? <Profile /> : <InvalidRole />} />
        <Route path="/QnA" exact element={role === 'moderator' && isLoggedIn ? <QnA /> : <InvalidRole />} />
        <Route path="/profile_moderator" exact element={role === 'moderator' && isLoggedIn ? <Profile_info /> : <InvalidRole />} />
        <Route path="/RUnanswered" exact element={role === 'responder' && isLoggedIn ? <RUnanswered /> : <InvalidRole />} />
        {/* <Route path="/profile_moderator" exact element={role==='moderator' && isLoggedIn?<Profile_info />:<InvalidRole/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
