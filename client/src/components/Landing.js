import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Profile from './Profile';
import '../style/App.css';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			profile: null,
			stats: []
		};
	}

	search() {
		console.log('this.state', this.state);
		const PROFILE_URL = 'http://ow-api.herokuapp.com/profile/pc/us/';
		const STATS_URL = 'http://ow-api.herokuapp.com/stats/pc/us/';
		let FETCH_URL = `${PROFILE_URL}${this.state.query}`;
		fetch(FETCH_URL, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(json => {
				const profile = json;
				console.log('profile', profile);
				this.setState({ profile });
			});
		FETCH_URL = `${STATS_URL}${this.state.query}`;
		fetch(FETCH_URL, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(json => {
				const stats = json.stats.top_heroes.quickplay;
				console.log('stats', stats);
				this.setState({ stats });
			});
	}

	render() {
		return (
			<div className="landing">
				<h1 className="App-title">Overwatch Heroes Battle</h1>
				<FormGroup>
					<InputGroup>
						<FormControl
							type="text"
							placeholder="Search for your account"
							value={this.state.query}
							onChange={event => {
								this.setState({ query: event.target.value });
							}}
							onKeyPress={event => {
								if (event.key === 'Enter') {
									this.search();
								}
							}}
						/>
						<button onClick={() => this.search()}>Search</button>
					</InputGroup>
				</FormGroup>
				<Profile profile={this.state.profile} />
				<div className="heroes-gallery">
					{this.state.stats.map((heroes, k) => {
						return (
							<div key={k}>
								<div className="heroes-name">Heroes: {heroes.hero}</div>
								<div className="heroes-hours-played">
									Hours played: {heroes.played}
								</div>
								<img alt="heroes" className="heroes-img" src={heroes.img} />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Landing;
