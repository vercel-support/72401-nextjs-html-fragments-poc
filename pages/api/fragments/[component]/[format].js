import ReactDOMServer from 'react-dom/server';
import HeaderComponent from '/components/HeaderComponent'
import css from '!!raw-loader!/components/HeaderComponent/styles.module.css'


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