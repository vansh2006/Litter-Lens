"use client"; 
import { useState } from 'react';
import styles from '../style.module.css';

export default function Status() {
  const [log, setLog] = useState('');
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddInputLog = () => {
    setLog((prevLog) => (prevLog ? `${prevLog}\n${input}` : input));
    setInput('');
  };

  // FETCH STRING FROM SERVER HERE 
  const fetchLog = async () => {
    const response = await fetch('/api/log');
    const data = await response.json();
    setLog(data.log);
  }

  // FETCH VIDEO???

  return (
    <div className={styles.bg}>
    <div className={styles.container}>
      <div className={styles.videoPlaceholder}>
        <p>Video will be displayed here</p>
      </div>

      <div className={styles.scrollableSection}>
        <h2>Trask Talk Log</h2>
      
        <button onClick={handleAddInputLog}>Add Log Entry</button>
        <div className={styles.scrollableContainer}>
          <ul>
            {log.split('\n').map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div> 
  );
}