import { readFileSync } from 'fs'
import { join } from 'path'
import HeaderComponent from '/components/HeaderComponent'

export function getServerSideProps() {
  const file = join(process.cwd(), 'components/HeaderComponent/styles.module.css')
  const css = readFileSync(file, 'utf8')
  return {
    props: {
      css,
      now: Date.now()
    }
  }
}

export default function Page({css, now}) {
  return (<><HeaderComponent>Header</HeaderComponent><pre>{css}</pre><time>{now}</time></>)
}