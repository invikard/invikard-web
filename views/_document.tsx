import React from 'react';
import { Document, Head, Main } from '@react-ssr/express';

export default class extends Document {
  render() {
    return (
      <html lang='en'>
      <Head>
        <meta charSet='utf-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
        <title>Wedding &mdash; 100% Free Fully Responsive HTML5 Template by FREEHTML5.co</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <meta name='description' content='Free HTML5 Template by FREEHTML5.CO'/>
        <meta name='keywords' content='free html5, free template, free bootstrap, html5, css3, mobile first, responsive'/>
        <meta name='author' content='FREEHTML5.CO'/>
        <meta property='og:title' content=''/>
        <meta property='og:image' content=''/>
        <meta property='og:url' content=''/>
        <meta property='og:site_name' content=''/>
        <meta property='og:description' content=''/>
        <meta name='twitter:title' content=''/>
        <meta name='twitter:image' content=''/>
        <meta name='twitter:url' content=''/>
        <meta name='twitter:card' content=''/>
        <link href='https://fonts.googleapis.com/css?family=Work+Sans:400,300,600,400italic,700' rel='stylesheet'
              type='text/css'/>
        <link href='https://fonts.googleapis.com/css?family=Sacramento' rel='stylesheet'/>
        <link rel='stylesheet' href='css/animate.css'/>
        <link rel='stylesheet' href='css/icomoon.css'/>
        <link rel='stylesheet' href='css/bootstrap.css'/>
        <link rel='stylesheet' href='css/magnific-popup.css'/>
        <link rel='stylesheet' href='css/owl.carousel.min.css'/>
        <link rel='stylesheet' href='css/owl.theme.default.min.css'/>
        <link rel='stylesheet' href='css/style.css'/>
        <script src='js/modernizr-2.6.2.min.js'></script>
      </Head>
      <body>
      <Main/>
      <script src='js/jquery.min.js'></script>
      <script src='js/jquery.easing.1.3.js'></script>
      <script src='js/bootstrap.min.js'></script>
      <script src='js/jquery.waypoints.min.js'></script>
      <script src='js/owl.carousel.min.js'></script>
      <script src='js/jquery.countTo.js'></script>
      <script src='js/jquery.stellar.min.js'></script>
      <script src='js/jquery.magnific-popup.min.js'></script>
      <script src='js/magnific-popup-options.js'></script>
      <script src='js/simplyCountdown.js'></script>
      <script src='js/main.js'></script>
      </body>
      </html>
    );
  }
}
