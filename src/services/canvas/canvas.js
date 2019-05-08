import * as dat from "dat.gui";

import task1 from "./tasks/task1";
import task2 from "./tasks/task2";

const renderCanvas = (canvasRef, task) => {
  const gui = new dat.GUI();
  switch (task) {
    case 1:
      task1(canvasRef, gui);
      break;

    case 2:
      task2(canvasRef, gui);
      break;

    default:
      break;
  }
};

export default renderCanvas;
