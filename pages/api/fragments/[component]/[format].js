import ReactDOMServer from 'react-dom/server';
import HeaderComponent from '../../../../components/HeaderComponent'

const fs = require('fs')

export default function handler(req, res) {
  const { component, format } = req.query
  
  if (format === 'html') {
    const htmlFragment = ReactDOMServer.renderToStaticMarkup(<HeaderComponent>I am some inside content!</HeaderComponent>)
    res.status(200).send(htmlFragment)
  } else if (format === 'css') {
    const styles = fs.readFileSync('./components/HeaderComponent/styles.module.css', {encoding:'utf8', flag:'r'});
    res.status(200).send(styles)
  } else {
    res.status(404).send('Error: 404')
  }
  
}