import React, { useState, useLayoutEffect } from "react";
import cn from "classnames";

import styles from "./App.module.scss";
import Canvas from "./../Canvas/Canvas";

const App = () => {
  const [task, setTask] = useState(1);

  useLayoutEffect(() => {
    const dg = document.querySelector(".main");
    if (dg) dg.remove();
  }, [task]);

  return (
    <>
      {task === 1 && <Canvas task={1} />}
      {task === 2 && <Canvas task={2} />}
      {task === 3 && <Canvas task={3} />}
      {task === 4 && <Canvas task={4} />}
      {task !== 1 && (
        <button
          className={cn(styles.button, styles.before)}
          onClick={() => {
            setTask(task - 1);
          }}
        >
          Назад
        </button>
      )}
      {task !== 4 && (
        <button
          className={cn(styles.button, styles.next)}
          onClick={() => {
            setTask(task + 1);
          }}
        >
          Далее
        </button>
      )}
    </>
  );
};

export default App;
