import React, { Component } from 'react';
import '../style/App.css';

class Profile extends Component {
	render() {
		let profile = { username: '', level: '', portrait: { url: '' } };
		profile = this.props.profile !== null ? this.props.profile : profile;

		return (
			<div className="profile-info">
				<img alt="Profile" className="profile-img" src={profile.portrait} />
				<div className="profile-username">{profile.username}</div>
				<div className="profile-level">Level: {profile.level}</div>
			</div>
		);
	}
}

export default Profile;
