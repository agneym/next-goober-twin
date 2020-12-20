import Head from "next/head";
import tw, { styled } from "twin.macro";
import Button from "../components/Button";

const Container = styled.div([
  tw`flex flex-col items-center justify-center h-screen`,
  tw`bg-gradient-to-r from-purple-400 via-pink-500 to-red-500`,
]);

function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div tw="px-6 py-10 bg-white flex flex-col space-y-5 text-center shadow-md">
          <h1 tw="text-3xl font-extrabold text-gray-900 tracking-tight mb-10">
            <span>Developer.</span>
            <br />
            <span>Sleeping if not Online.</span>
          </h1>
          <div tw="flex space-x-5 justify-center">
            <Button styleType="primary" href="https://twitter.com/agneymenon">
              Follow on Twitter
            </Button>
            <Button styleType="secondary" href="https://buttondown.email/agney">
              Subcribe to Newsletter
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
