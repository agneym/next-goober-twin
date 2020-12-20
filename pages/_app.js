import { createElement } from 'react';
import { setup } from 'goober';
import { prefix } from 'goober-autoprefixer';

setup(createElement, prefix);

function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default CustomApp
