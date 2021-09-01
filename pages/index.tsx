import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Darsoon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <Div>
        <h1>Welcome to the new Darsoon Website.</h1>
        <p className="center-text">Corrently under development.</p>
        <p>
          <Link href="/become-a-teacher" className="center-item">
            <a>Join us as a teacher</a>
          </Link>
        </p>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: grid;
  place-items: center;
  gap: 1rem;
`;
