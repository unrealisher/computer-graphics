import React, { useEffect, useRef } from "react";

import renderCanvas from "../../services/canvas/canvas";

import styles from "./App.module.scss";

function App() {
  const canvasRef = useRef(null);
  useEffect(() => {
    renderCanvas(canvasRef);
  });

  return <canvas className={styles.canvas} ref={canvasRef} />;
}

export default App;
