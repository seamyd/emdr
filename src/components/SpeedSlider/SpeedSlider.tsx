import React from "react";
import styled from "styled-components";

const sliderThumbStyles = () => (`
  width: 25px;
  height: 25px;
  background: black;
  cursor: pointer;
  outline: 5px solid #333;
  opacity: 0.7;
`);

const Styles = styled.div`
  grid-area: slider;
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .value {
    flex: 1;
    font-size: 2rem;
    font-weight: bold;
    color: #111;
    margin-left: 2rem;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${sliderThumbStyles()}
    }
    &::-moz-range-thumb {
      ${sliderThumbStyles()}
    }
  }
`;

interface Props {
  speed: string;
  updateSpeed(e: React.ChangeEvent<HTMLInputElement>): void;
}

const SpeedSlider: React.VFC<Props> = ({ updateSpeed, speed }) => (
  <Styles>
    <input type="range" min={1} max={12} step={1} value={speed} className="slider" onChange={updateSpeed} />
    <div className="value">{speed}</div>
  </Styles>
);

export default SpeedSlider;
