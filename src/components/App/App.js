import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import AudioStudio from '../AudioStudio';
import MusicVisualizer from '../MusicVisualizer';
import About from '../About';
import Exit from '../Exit';
import * as ROUTES from '../../constants/routes.js';
import './App.css';
import Menu from '../Menu/Menu.js';

const App = () => (
  <Router>
    <div className="App">
      <Navigation />
      <Route path={ROUTES.AUDIO_STUDIO} component={AudioStudio} />
      <Route path={ROUTES.MUSIC_VISUALIZER} component={MusicVisualizer} />
      <Route path={ROUTES.ABOUT} component={About} />
      <Route path={ROUTES.EXIT} component={Exit} />
    </div>
  </Router>
);

export default App;
