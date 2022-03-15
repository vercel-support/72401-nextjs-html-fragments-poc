import ReactDOMServer from 'react-dom/server';
import HeaderComponent from '../../../../components/HeaderComponent'

const { readFile } = require('fs/promises')
const { join } = require('path')


export default async function handler(req, res) {
  const { component, format } = req.query
  
  if (format === 'html') {
    const htmlFragment = ReactDOMServer.renderToStaticMarkup(<HeaderComponent>I am some inside content!</HeaderComponent>)
    res.status(200).send(htmlFragment)
  } else if (format === 'css') {
    const styles = await readFile(join(process.cwd(), '/components/HeaderComponent/styles.module.css'), 'utf8')
    res.status(200).send(styles)
  } else {
    res.status(404).send('Error: 404')
  }
  
}