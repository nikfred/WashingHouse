import '../styles/globals.css'
import NavBar from "../components/NavBar";
import Head from "next/head";
import {Provider} from "react-redux";
import {store} from "../store";

function MyApp({Component, pageProps}) {


    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@900&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@1,300&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                    crossOrigin="anonymous"
                />
            </Head>
            <Provider store={store}>
                <NavBar/>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

export default MyApp
