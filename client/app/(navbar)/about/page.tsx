import styles from '../style.module.css';
import logo from '../TrashTalkLogo.png'; 

export default function About() {
  return <div className={styles.bg}>
      <img className={styles.imageBig} src={logo.src} alt="logo" />
      <h1 className={styles.aboutTitle}>Whats TrashTalk?</h1>
      <div className={styles.aboutDiv}>
        The goal of this project is to alert pedestrians when they are littering and they miss the garbage can!!! This is unacceptable so we must remind them by sending customized messages! Reminding them to PICK UP AFTER THEIR TRASH!!!
      </div>  
    </div>
    
}