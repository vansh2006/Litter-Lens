"use client";
import { useState, useEffect } from 'react';
import styles from '../style.module.css';

export default function Status() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch('/api/status');
      const data = await response.json();
      setStatus(data.status);
    };

    // Fetch the status every second
    const intervalId = setInterval(fetchStatus, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.videoPlaceholder}>
          <p>Video will be displayed here</p>
        </div>

        <div className={styles.scrollableSection}>
          <h2>Status</h2>
          <div className={styles.scrollableContainer}>
            <p>Status: {status !== null ? status : 'Waiting for data...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
