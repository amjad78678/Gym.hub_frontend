import React from 'react'
import styles from './Loader.module.css'



const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className={styles.loader}></div>
  </div>
  )
}

export default Loader