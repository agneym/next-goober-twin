import Document, { Html, Head, Main, NextScript } from "next/document";
import { extractCss } from "goober";

export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const css = extractCss();
    return { ...page, css };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id={"_goober"}
            dangerouslySetInnerHTML={{ __html: " " + this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
