"use client";
import { useState, useEffect } from 'react';
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
    const interval = setInterval(() => {
      fetchStatus();
    }, 15000); // 15000 milliseconds = 15 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.videoPlaceholder}>
          <iframe 
            style={{
              background: '#E0D4CD',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
            }} 
            width="540" 
            height="480" 
            src="https://charts.mongodb.com/charts-litterlensdb-bzszzhc/embed/charts?id=66af3ef1-f332-41e5-8e75-871405544387&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
        </div>

        <div className={styles.scrollableSection}>
          <div className={styles.topHalf}>
            <h2>Status</h2>
            <div className={styles.scrollableContainer}>
              <p>{status !== null ? status : 'Waiting for data...'}</p>
            </div>
          </div>
          <div className={styles.bottomHalf}>
            <iframe
              style={{
                background: '#E0D4CD',
                border: 'none',
                borderRadius: '2px',
                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
              }}
              width="480"
              height="230"
              src="https://charts.mongodb.com/charts-litterlensdb-bzszzhc/embed/charts?id=66af3f58-986b-4c24-8132-f616d9e51b34&maxDataAge=3600&theme=light&autoRefresh=true">
            </iframe>
          </div> 
        </div>
      </div>
    </div>
  );
}