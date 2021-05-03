import React from 'react';

interface Props {
  speed: string;
  updateSpeed(e: React.ChangeEvent<HTMLInputElement>): void;
}

const SpeedSlider: React.VFC<Props> = ({ updateSpeed, speed }) => (
  <div>
    <label htmlFor="speedSlider">
      Selecteer Snelheid
      <input
        type="range"
        id="SpeedSlider"
        name="speedSlider"
        min="1"
        max="10"
        step="0.5"
        value={speed}
        onChange={(e) => updateSpeed(e)}
      />
    </label>
  </div>
);

export default SpeedSlider;
