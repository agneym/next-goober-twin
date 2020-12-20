import Head from "next/head";
import "twin.macro";
import Button from "../components/Button";

function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div tw="bg-indigo-400">
        <p tw="text-lg font-semibold">NextJS HERE!</p>
      </div>

      <Button />
    </div>
  );
}

export default Home;
