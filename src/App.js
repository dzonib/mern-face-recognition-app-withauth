import React, { Component } from 'react';
import Clarifai from 'clarifai';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'



const app = new Clarifai.App({
  apiKey: '3c93098a29254f138c73f5c8f09fa591'
 });


const particlesOptions = {
	particles: {
		number: {
			value: 80,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {
	state = {
    input: '',
    imageUrl: ''
	};

	onInputChange = (e) => {
		this.setState({ input: e.target.value });
	};

	onButtonSubmit = (e) => {
    this.setState((state) => ({imageUrl: state.input}));
 		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input, { language: 'zh' })
			.then(
				function(response) {
					console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
				},
				function(err) {
					console.log(err)
				}
			);
	};

	render() {
    console.log(this.state.imageUrl);
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
				<FaceRecognition imageUrl={this.state.imageUrl}/>
			</div>
		);
	}
}

export default App;
