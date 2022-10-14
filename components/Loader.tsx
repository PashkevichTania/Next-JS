import styles from "src/styles/loader.module.scss"

function Loader() {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner}>
        <div className={"bg-gray-800 dark:bg-white " + styles.dot1} />
        <div className={"bg-gray-800 dark:bg-white " + styles.dot2} />
      </div>
    </div>
  )
}

export default Loader
