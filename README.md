This POC demonstrates how a React component's HTML, CSS, and JS code can be served separately in Next.js.

## Problem

"HTML Fragments" - A piece of HTML code hosted in the _origin site_ that can be consumed and included into other sites as part of their HTML code. The other sites fetch these fragments via URLs like https://domain.com/fragments/header and https://domain.com/fragments/footer.

For example:

```
<div id="some_fragment">
  <section>I am inside a section</section>
  <ul>
    <li>...</li>
    <li>...</li>
  </ul>
  <section>...</section>
</div>
```

The _origin site_ has switched over to the Next.js framework, and the React components that were used to construct HTML Fragments are now padded with other HTML tags when they are delivered as Next.js pages.

```
<!DOCTYPE html>
<html lang="en">
  <head>...</head>
  <body>
    ...
    ...
    [HTML FRAGMENT]
  </body>
</html>
```


## Solution

Instead of rendering these "HTML Fragments" as Next.js `/pages/...`, they can be delivered using APIs `/pages/api/fragments/[component]/[format].js`. The serverless function takes in 2 parameters:

- `component` - used to find the correct base React component used to render the HTML Fragment
- `format` - used to determine the type of file required, it can be `css`, `html`, or `js`. (The naming of this parameter could have been better.)

1. When `html` is requested, the serverless function will render the relevant React component and converts it into HTML using `ReactDOMServer.renderToStaticMarkup(<SomeComponent></SomeComponent>)`.
2. When `css` or `js` is requested, the serverless function will return the content of the relevant static files imported using `raw-loader`.

PS: Due to the limitation of Next.js' `/pages/api/...` runtime, you will need to `import` all the static files at the start of the function or switch the APIs over to use the Node runtime `/api/...` so that these files can be included into the serverless functions by `includedFiles`. More information is available at https://vercel.com/support/articles/how-can-i-use-files-in-serverless-functions.

## Demo

The header component is rendered as an HTML page at https://72401-nextjs.vercel-support.app/.

The same header component can be fetched as pure HTML at https://72401-nextjs.vercel-support.app/api/fragments/header/html or by running: 

```bash
curl https://72401-nextjs.vercel-support.app/api/fragments/header/html
```

<img width="488" alt="image" src="https://user-images.githubusercontent.com/179761/158372307-a509225b-bf3e-41c4-b9aa-801abf745aaa.png">

The css styles used by the component is available at https://72401-nextjs.vercel-support.app/api/fragments/header/css. Please note that this component uses Module CSS in this example.

## Caching

A `cache-control` header is not set in this example but it is highly recommended.

