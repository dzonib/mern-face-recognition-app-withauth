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
		imageUrl: '',
		box: {}
	};


	calculateFaceLocation = (data) => {
		// this.setState({box: data})
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.querySelector('#inputImage');
		const width = Number(image.width);
		const height = Number(image.width);


		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		console.log(box)
		this.setState({box})
	}

	onInputChange = (e) => {
		this.setState({ input: e.target.value });
	};

	onButtonSubmit = (e) => {
    this.setState((state) => ({imageUrl: state.input}));
 		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input, { language: 'zh' })
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response))
					// console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
			).catch(e => console.log(e))
	};

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
				<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
			</div>
		);
	}
}

export default App;
