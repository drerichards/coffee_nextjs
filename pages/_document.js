import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {/* only use this when affecting the head of all pages */}
        {/* restart server after changes */}
        <Head>
          {/* preload prioritizes its download */}
          <link
            href="/fonts/IBMPlexSans-Thin.ttf"
            rel="stylesheet preload prefetch"
            as="style"
            type="font/ttf"
            crossOrigin="anonymous"
          ></link>
          <link
            href="/fonts/IBMPlexSans-Light.ttf"
            rel="stylesheet preload prefetch"
            as="style"
            type="font/ttf"
            crossOrigin="anonymous"
          ></link>
          <link
            href="/fonts/IBMPlexSans-Regular.ttf"
            rel="stylesheet preload prefetch"
            as="style"
            type="font/ttf"
            crossOrigin="anonymous"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
