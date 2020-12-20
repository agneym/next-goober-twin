import Head from 'next/head'
import { styled } from 'goober';

const Title = styled('h1')`
  color: red;
`;

function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>NextJS HERE!</Title>
      </main>
    </div>
  )
}

export default Home;
