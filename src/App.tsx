import React, { useState } from 'react';
import { render } from 'react-dom';
import Bar from './components/Bar';
import Light from './components/Light';
import SpeedSlider from './components/SpeedSlider';

const App = () => {
  const [lightSpeed, setLightSpeed] = useState('4');
  return (
    <>
      <Bar>
        <Light duration={parseInt(lightSpeed, 10)} />
      </Bar>
      <SpeedSlider speed={lightSpeed} updateSpeed={(e) => setLightSpeed(e.target.value)} />
    </>
  );
};

render(<App />, document.getElementById('app'));
