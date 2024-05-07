import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
const Value: React.FC = () => {
  const [count, setCount] = useState<number>(100);
  const timeId = useRef<any>(null);

  const handleStart = () => {
    if (timeId.current === null) {
      timeId.current = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
  };

  const handleStop = () => {
    if (timeId.current !== null) {
      clearInterval(timeId.current);
      timeId.current = null;
    }
  };
  const handleReset = () => {
    handleStop();
    setCount(100);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.countWrapper}>{count}</h3>
      <button className={styles.btn} onClick={handleStart}>
        Start
      </button>
      <button className={styles.btn} onClick={handleStop}>
        Stop
      </button>
      <button className={styles.btn} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Value;
