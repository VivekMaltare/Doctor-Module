import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BaseUrl } from "./BaseUrl.js";
import axios from 'axios';


import Login from "./Login/Login";
import Register from "./Doctor/Pages/Register/Register";
import React, { useState, useEffect } from "react";
import DoctorHome from "./Doctor/Pages/DoctorHome/DoctorHome";
import ViewPosts from "./Doctor/Pages/ViewPosts/ViewPosts"
import ProfileDetails from './Doctor/Pages/ProfileDetails/ProfileDetails'
import PatientDetails from "./Doctor/Pages/PatientDetails/PatientDetails";
import InvalidRole from "./InvalidRole/InvalidRole";
import DoctorDetails from './Admin/Pages/DoctorDetails/DoctorDetails';
import Moderator from './Admin/Pages/Moderator/Moderator';
import Patient from './Admin/Pages/Patient/Patient';
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
import AddPost from "./Doctor/Pages/AddPost/AddPost.jsx";
import { Senior_Home } from "./Senior_Doctor/components/Home/Senior_Home.js";
import Senior_Navbar from "./Senior_Doctor/components/Senior_Navbar/Senior_Navbar.js";
import { InformationCard } from "./Senior_Doctor/components/InformationCard/InformationCard.js";
import { Appointment_History } from "./Senior_Doctor/components/Appointment_History/Appointment_History.js";
import Moderator_Profile from "./Moderator/components/Moderator_Profile/Moderator_Profile.js";
import ForgotPassword from "./ForgotPassword/ForgotPassword.jsx"
import ChatHome from "./chat/components/ChatHome.jsx";
import Responder_Profile from "./Responder/components/Responder_Profile/Responder_Profile.js";
import UpdatePasswordPage from "./Moderator/components/UpdatePasswordPage/UpdatePasswordPage.js";
import YourPosts from "./Doctor/Pages/YourPosts/YourPosts.jsx";
import { AppointmentProvider } from "./Doctor/Context/AppointmentContext.js";
import UpdatePassword_resp from "./Responder/components/UpdatePassword/UpdatePassword_resp.js";
import { ChatModal } from "./Senior_Doctor/components/ChatModal/ChatModal.js";
import { Senior_Profile } from "./Senior_Doctor/components/Senior_Profile/Senior_Profile.js";
//Logic to implement role based routing
function App() {
  const [userId, setUserId] = useState(window.localStorage.getItem('userId') || false);
  const [role, setRole] = useState(window.localStorage.getItem('userRole') || false);
  const [FirstLogin, setFirstLogin] = useState(JSON.parse(window.localStorage.getItem('FirstLogin'))||false);
  console.log(FirstLogin);
  const [isSenior, setIsSenior] = useState(JSON.parse(window.localStorage.getItem('IsSenior')) || false);
  console.log(isSenior);
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(window.localStorage.getItem('isLoggedIn'))
  );
 // CORRECT VALUE UNTIL HERE
  console.log(userId);
  // console.log(Firstrole);
  // setFirstLogin(Firstrole);
  useEffect(() => {
    const storedRole = window.localStorage.getItem("userRole");
    const storedLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'));
    const storedIsSenior = JSON.parse(window.localStorage.getItem('IsSenior'));
    console.log(storedIsSenior)
    console.log(storedRole)
    console.log(storedLoggedIn)
    // setFirstLogin(window.localStorage.getItem('FirstLogin'));
    // const isFirst = window.localStorage.getItem('FirstLogin');
    // console.log(Firstrole);
    // setFirstLogin(isFirst);

    if (storedRole !== null && storedLoggedIn !== null) {
      setRole(storedRole);
      setIsLoggedIn(storedLoggedIn);
      setIsSenior(storedIsSenior);
      console.log(isSenior);
    }
  }, [userId]);



return (
  <Router>
    <Routes>
      <Route path="/" exact element={<Login setIsSenior = {setIsSenior} setRole={setRole} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/forgotpassword" exact element={<ForgotPassword />} />
      <Route path="/register" exact element={<Register setRole={setRole} setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/home"
        element={   
          isLoggedIn ? (
          <> {console.log("IsSenior value:", isSenior)}</>,
            role === "DOCTOR" ? (
              isSenior?<Senior_Home/>:<AppointmentProvider> <DoctorHome /></AppointmentProvider>
            ) : role === "ADMIN" ? (
              <AdminHome />
            ) : role === "MODERATOR" ? (
              FirstLogin? (
                // <UpdatePasswordPage />
                <MFlaggedPosts />
              ) : (
                
                <MFlaggedPosts />
              )
            ) : role === "RESPONDER" ? (
              FirstLogin === "true" ? (
                <UpdatePassword_resp />
               
              ) : (
                <RHome />
                
              )
            ) : (
              <InvalidRole />
            )
          ) : (
            <InvalidRole />
          )
        }
      />
      <Route path="/ViewPosts" exact element={role === 'DOCTOR' && isLoggedIn ? <ViewPosts /> : <InvalidRole />} />
      <Route path="/viewprofile" exact element={role === 'DOCTOR' && isLoggedIn ? <ProfileDetails /> : <InvalidRole />} />
      <Route path="/PatientDetails" exact element={role === 'DOCTOR' && isLoggedIn ?<AppointmentProvider> <PatientDetails /> </AppointmentProvider>: <InvalidRole />} />
      <Route path="/chat" exact element={role === 'DOCTOR' && isLoggedIn ? <ChatHome /> : <InvalidRole />} />
      <Route path="/addposts" exact element={role == 'DOCTOR' && isLoggedIn ? <AddPost /> : <InvalidRole />} />
      <Route path="/YourPosts" exact element={role === 'DOCTOR' && isLoggedIn ? <YourPosts /> : <InvalidRole />} />
      <Route path="/doctors" exact element={role === 'ADMIN' && isLoggedIn ? <DoctorDetails /> : <InvalidRole />} />
      <Route path="/patients" exact element={role === 'ADMIN' && isLoggedIn ? <Patient /> : <InvalidRole />} />
      <Route path="/responders" exact element={role === 'ADMIN' && isLoggedIn ? <Responder /> : <InvalidRole />} />
      <Route path="/moderators" exact element={role === 'ADMIN' && isLoggedIn ? <Moderator /> : <InvalidRole />} />
      <Route path="/requests" exact element={role === 'ADMIN' && isLoggedIn ? <Requests /> : <InvalidRole />} />
      <Route path="/logout" exact element={role === 'ADMIN' && isLoggedIn ? <DoctorDetails /> : <InvalidRole />} />
      <Route path="/profile" exact element={role === 'ADMIN' && isLoggedIn ? <Profile formType="Profile"/> : <InvalidRole />} />
      <Route path="/AddModerator" exact element={role === 'ADMIN' && isLoggedIn ? <Profile formType="AddModerator"/> : <InvalidRole />} />
      <Route path="/AddResponder" exact element={role === 'ADMIN' && isLoggedIn ? <Profile formType="AddResponder"/> : <InvalidRole />} />
      <Route path="/profile" exact element={role === 'ADMIN' && isLoggedIn ? <Profile /> : <InvalidRole />} />
      <Route path="/QnA" exact element={role === 'MODERATOR' && isLoggedIn ? <QnA /> : <InvalidRole />} />
      <Route path="/Moderator_Profile" exact element={role === 'MODERATOR' && isLoggedIn ? <Moderator_Profile /> : <InvalidRole />} />
      <Route path="/RUnanswered" exact element={role === 'RESPONDER' && isLoggedIn ? <RUnanswered /> : <InvalidRole />} />
      <Route path="/Responder_Profile" exact element={role === 'RESPONDER' && isLoggedIn ? <Responder_Profile /> : <InvalidRole />} />
      <Route path="/Senior_Profile" exact element={role === 'DOCTOR'  && isLoggedIn ? <Senior_Profile /> : <InvalidRole />} />
      <Route path="/Appointment_History/:doctorId" element={isLoggedIn ? <Appointment_History /> : <InvalidRole />} />
    </Routes>
  </Router>
);
}

export default App;
