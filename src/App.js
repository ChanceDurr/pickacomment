import './App.css';

import { Button, Image, ButtonGroup, Container, Form } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react';

require("dotenv").config()


class App extends React.Component {

	state = {
		numberOfComments	: 50,
		currentPlatform		: "twitter",
		showForm			: false,
		urlLabel			: "Twitter URL",
		urlPlaceholder		: "https://twitter.com/Twitter/status/1390725076996268038",
		url 				: "",
		commentType			: "tweets",
		checkboxes			: ["Following", "Liked", "Retweeted", "Tagged?"],
		following			: false,
		liked				: false,
		retweeted			: false,
		subscribed			: false,
		tagged				: false,
		notifications		: false,
		results				: ["test"],
		winners				: []
	};

	handleCommentChange = event => {
		this.setState({
			numberOfComments: event.target.value
		})
	};

	handleCheckboxChange = event => {
		if (event.target.id === "Following-checkbox") {
			this.setState({
				following: event.target.checked
			})
		} else if (event.target.id === "Liked-checkbox") {
			this.setState({
				liked: event.target.checked
			})
		} else if (event.target.id === "Retweeted-checkbox") {
			this.setState({
				retweeted: event.target.checked
			})
		}

			
	};

	handlePlatformChange = event => {
		if (event.target.name === "twitter") {
			this.setState({
				currentPlatform: event.target.name,
				urlLabel: "Twitter URL",
				urlPlaceholder: "https://twitter.com/Twitter/status/1390725076996268038",
				commentType: "tweets",
				checkboxes: ["Following", "Liked", "Retweeted", "Tagged?"]
			})
		} else if (event.target.name === "instagram") {
			this.setState({
				currentPlatform: event.target.name,
				urlLabel: "Instagram URL",
				urlPlaceholder: "https://www.instagram.com/p/CO8IWvusRdS/",
				commentType: "comments",
				checkboxes: ["Following", "Liked", "Tagged?"]
			})
		} else if (event.target.name === "youtube") {
			this.setState({
				currentPlatform: event.target.name,
				urlLabel: "Youtube URL",
				urlPlaceholder: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				commentType: "comments",
				checkboxes: ["Subscribed", "Liked", "Notifications On?"]
			})
		} else {
			this.setState({
				showForm: false
			})
		}
	}

	handleUrlChange = event => {
		this.setState({
			url: event.target.value
		})
	}

	handleSubmit = event => {
		fetch("/comments", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(function (response) {
			if (response.status === 200) {
				return response.json()
			}

			alert("Not enough comments for number chosen")
			throw new Error("ahhh")
		})
		.then(data => this.setState({winners: data}))
		.catch(error => console.log(error))

	}

	render() {
		return (
			<Container className="center" fluid>

				<div>
					<h1 className="title center">Pick A Comment</h1>
				</div>

				<div>
					<h2 className="main-text center title">Pick A Platform</h2>
				</div>
				
				<ButtonGroup>
					<Button 
						id="twitterButton" 
						className="logoButton" 
						name="twitter" 
						onClick={this.handlePlatformChange}
						variant="secondary"
					>
						<Image
							className="socialMediaButton"
							name="twitter"
							onClick={this.handlePlatformChange}
							src="logos/twitterlogo.png"
							alt="twitterlogo"
						/>
					</Button>
					
					<Button
						id="instagramButton"
						className="logoButton"
						name="instagram"
						onClick={this.handlePlatformChange}
						variant="secondary"
						disabled
					>
						<Image
							className="socialMediaButton"
							name="instagram"
							onClick={this.handlePlatformChange}
							src="logos/instagramlogo.png"
							alt="instagramlogo"
						/>
					</Button>
					<Button
						id="youtubeButton"
						className="logoButton"
						name="youtube"
						onClick={this.handlePlatformChange}
						variant="secondary"
						disabled
					>
							<Image
								className="socialMediaButton"
								name="youtube"
								onClick={this.handlePlatformChange}
								src="logos/youtubelogo.png"
								alt="youtubelogo"
							/>
					</Button>
				</ButtonGroup>

				<Form className="main-form">
					<Form.Group>
						<Form.Label className="main-text">{this.state.urlLabel}</Form.Label>
						<Form.Control className="urlInput" type="text" onChange={this.handleUrlChange} placeholder={this.state.urlPlaceholder}></Form.Control>
					</Form.Group>

					<Form.Label id="numberOf" className="main-text">Number of {this.state.commentType}</Form.Label>

					<Form.Group id="sliderGroup">
						<Form.Control
							id="numberSlider"
							type="range"
							min="0"
							max="100"
							steps="100"
							name="sliderNumber"
							onChange={this.handleCommentChange}
							defaultValue={this.state.value}
						/>
						<Form.Control
							type="text"
							size="small"
							id="numberSelected"
							name="textNumber"
							onChange={this.handleCommentChange}
							value={this.state.numberOfComments}
							placeholder={this.state.numberOfComments}
						/>
					</Form.Group>

					<Form.Group className="main-text" id="checks">
						{this.state.checkboxes.map((type) => (
							<Form.Check
								type="checkbox"
								key={`${type}`}
								id={`${type}-checkbox`}
								label={`${type}`}
								size="lg"
								defaultChecked={false}
								onClick={this.handleCheckboxChange}
								inline
							/>
						))}
					</Form.Group>

					<Button
						id="twitterSubmit"
						variant="primary"
						onClick={this.handleSubmit}
					>Pick {this.state.numberOfComments} {this.state.commentType}
					</Button>
				</Form>
				<div>
					<ul>
						{console.log(this.state.winners)}
						{this.state.winners.map((winner) => (
							<li key={`${winner}`} className='main-text'>{winner}</li>
						))}
					</ul>
				</div>
			</Container>
			

		)
	}
}

export default App;
