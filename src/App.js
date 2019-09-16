import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import NavigationBar from './components/Navigation/NavigationBar';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import {ParticleParams} from './components/ParticleParams/ParticleParams';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: '1d413b58ccaa4be585d53364dc4522f5'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageurl:'',
      box: {}
    }
  }
  OnInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  calculateFaceLocation = (data) =>{

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row *height,
      rightCol: width -(clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) =>{
    this.setState({box: box});
  }
  OnSubmit = (event) =>{
    this.setState({imageurl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(err => console.log(err));
  }
  render(){
      return (
        <div className="App">
          <Particles className='particles' params={ParticleParams}/>
          <NavigationBar/>
          <Logo/>
          <Rank/>
          <ImageLinkForm OnInputChange={this.OnInputChange} OnSubmit={this.OnSubmit}/>
          <FaceRecognition photoLink={this.state.imageurl} box = {this.state.box}
          />
        </div>
      );
  }

}

export default App;
