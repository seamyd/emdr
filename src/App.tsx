import React, { useState } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Circle from "./components/Bar";
import SpeedSlider from "./components/SpeedSlider";

const Layout = styled.div`
  display: grid;
  grid-template-areas:
      ". . . . ."
      ". bar bar bar ."
      ". . slider . ."
      ". . . . .";
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 20px repeat(3, 1fr) 20px;
`;

const App = () => {
  const [lightSpeed, setLightSpeed] = useState("4");
  return (
    <Layout>
      <Circle />
      <SpeedSlider speed={lightSpeed} updateSpeed={(e) => setLightSpeed(e.target.value)} />
    </Layout>
  );
};

render(<App />, document.getElementById("app"));
