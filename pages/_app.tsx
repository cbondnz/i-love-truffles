// import type { AppProps } from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp
import "../styles/globals.css";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
