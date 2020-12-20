import { createElement } from "react";
import { setup } from "goober";
import { prefix } from "goober-autoprefixer";
import { GlobalStyles } from "twin.macro";

setup(createElement, prefix);

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}

export default CustomApp;
