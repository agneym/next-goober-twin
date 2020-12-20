import Head from "next/head";
import { styled } from "goober";
import tw from "twin.macro";

const Title = styled("h1")`
  color: red;
`;

const Container = styled.div([
  tw`flex flex-col items-center justify-center h-screen`,
]);

function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container tw="bg-green-400">
        <Title>NextJS HERE!</Title>
      </Container>
    </div>
  );
}

export default Home;
