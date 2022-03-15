import styles from './style.module.css'

export default function Component({children}) {
  return (
    <div className={styles.HeaderComponent}>
      This is a header.
      {
        children &&
        <>
          <div>Here are some <pre>props.children</pre>:</div>
          <section className={styles.children}>
            {children}
          </section>
        </>
      }
    </div>
  )
}
