import * as dat from "dat.gui";
import task1 from "./tasks/task1";

const renderCanvas = canvasRef => {
  const gui = new dat.GUI();
  const state = {
    task: 1
  };
  gui
    .add(state, "task")
    .min(1)
    .max(6)
    .step(1);

  switch (state.task) {
    case 1:
      task1(canvasRef, gui);
    // eslint-disable-next-line no-fallthrough
    default:
      break;
  }
};

export default renderCanvas;
