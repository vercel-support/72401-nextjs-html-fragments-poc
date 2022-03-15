import { readFileSync } from 'fs'
import { join } from 'path'
import ReactDOMServer from 'react-dom/server';
import HeaderComponent from '/components/HeaderComponent'

const css = readFileSync(join(process.cwd(), 'components/HeaderComponent/styles.module.css'), 'utf8')

export default function handler(req, res) {
  const { component, format } = req.query
  
  if (format === 'html') {
    const htmlFragment = ReactDOMServer.renderToStaticMarkup(<HeaderComponent>I am some inside content!</HeaderComponent>)
    res.status(200).send(htmlFragment)
  } else if (format === 'css') {

    res.status(200).send(css)
  } else {
    res.status(404).send('Error: 404')
  }
  
}