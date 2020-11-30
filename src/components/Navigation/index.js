import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => (
    <header bg="primary">
      <h1 className="h1 mb-3 font-weight-normal, text-center">Leap Music Control</h1>
      <div><Link to={ROUTES.AUDIO_STUDIO}>Audio Studio</Link></div>
      <div><Link to={ROUTES.MUSIC_VISUALIZER}>Music Visualizer</Link></div>
      <div><Link to={ROUTES.ABOUT}>About</Link></div>
      <div><Link to={ROUTES.EXIT}>Exit</Link></div>
    </header>
  );

export default Navigation;