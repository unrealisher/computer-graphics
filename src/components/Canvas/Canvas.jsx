import React, { useRef, useEffect } from "react";
import renderCanvas from "../../services/canvas/canvas";

import styles from "./Canvas.module.scss";

const Canvas = ({ task }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    renderCanvas(canvasRef, task);
  }, [task]);

  return <canvas className={styles.canvas} ref={canvasRef} />;
};

export default Canvas;
