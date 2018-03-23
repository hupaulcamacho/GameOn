import React, { Component } from "react";
import axios from "axios";

import UserInfo from './UserInfo'
import ProfileSports from './ProfileSports'


class Profile extends Component {
  state = {
    user: [],
    enable: false,
  };

  getUserInfo = () => {
    axios
      .get("/user/getinfo")
      .then(res => {
        console.log(res.data.user);
        this.setState({
          user: res.data.user
        });
      })
      .catch(err => console.log("Failed To Fetch User:", err));
  };



  handleDisplayInfo = (e) => {
    if(e.target.id === 'profile_personal_info'){
      this.setState({
        enable: false
      })
    }else if(e.target.id === 'profile_sport_info')
    this.setState({
      enable: true
    })
  }

 
  componentWillMount() {
    this.getUserInfo();
  }

  render() {
    const { handleEditProfile, handleDisplayInfo } = this;
    const { user, enable } = this.state;

    return (
      <div className="profile_parent">
        <div id="profile_menu">
          <div id='profile_header'>
            <img src={user.profile_pic} id="profile_photo" />
            <div id="profile_username">{user.username}</div>
          </div>
          <div id="profile_personal_info" 
          onClick={handleDisplayInfo}
          >
          Personal Info
          </div>
          <div id="profile_sport_info" 
          onClick={handleDisplayInfo}
          >
          Your Sports
          </div>
        </div>

        <div id='profile_info_container'>
        {!enable?
        <UserInfo
        id={user.id}
        username ={user.username}
        email = {user.email}
        fullname = {user.fullname}
        zipcode = {user.zip_code}
        /> : 
        <ProfileSports
        sports = {user.sports}
        />}
        </div>
      </div>
    );
  }
}

export default Profile;

/**
 * <button id="edit_Overview_button" onClick={handleEditProfile}>
          Edit Profile
        </button>
 */
