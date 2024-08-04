import styles from '../style.module.css';
import logo from '../TrashTalkLogo.png'; 

export default function About() {
  return <div className={styles.bg}>
      <img className={styles.imageBig} src={logo.src} alt="logo" />
      <h1 className={styles.aboutTitle}>What's TrashTalk?</h1>
      <div className={styles.aboutDiv}>
        Meet TrashTalk: The "gamified" garbage bin that talks trash when you shoot like trash! The premise 
        of this bin is to alert pedestrians when they are littering and they miss the garbage can using our 
        LitterLens technology. However, we understand that not everyone is a litterbug, so we have also added
        some messages that reward you for getting rid of garbage on the streets. This is designed to 
        reduce littering in public areas and residential properties, gamifying their recycling skils, 
        without collecting an ounce of their personal data.
      </div>  
    </div>
    
}