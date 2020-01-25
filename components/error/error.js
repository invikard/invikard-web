
import React from 'react';
import Head from 'next/head';

const Error = props => {

    return (
        <div>
            <Head>
                <title>:(</title>

                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:300,700" rel="stylesheet" />


                <link type="text/css" rel="stylesheet" href="/static/error.css" />

            </Head>
            <div>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1><span></span></h1>
                        </div>
                        <h2>Oops! Halaman yang Anda minta tidak dapat dimuat</h2>
                        <p>{props.message}</p>
                        <a href="https://invikard.com">Ke halaman utama</a>
                    </div>
                </div>
            </div>


        </div>
    )
};

export default Error;
