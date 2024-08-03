"use client";
import { useState, useEffect} from 'react';
import styles from '../style.module.css';
import fetchGarbageState from '@/app/helper';

export default function Status() {
  const [status, setStatus] = useState<string | null>(null);

  async function fetchStatus() {
    const data = await fetchGarbageState();
    console.log(data.status); 
    setStatus(data.status);
  }

  useEffect(() => {
    fetchStatus();
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
