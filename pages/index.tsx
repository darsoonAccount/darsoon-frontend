import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import TT from "../components/translation/TT";
import Fa from "../components/translation/Fa";
import En from "../components/translation/En";

export default function Home() {
  return (
    <>
      <Head>
        <title>Darsoon</title>
      
      </Head>
      <Div>
        <h1>
          <Fa>به وبسایت جدید درسون خوش آمدید.</Fa>
          <En>Welcome to the Darsoon&apos;s new website.</En>
        </h1>
        <p className="center-text">
          <Fa>در دست ساخت.</Fa>
          <En>Corrently under development.</En>
        </p>

        <p>
          <Link href="/become-a-teacher">
            <a className="center-item">
              <En>Join us as a teacher</En>
              <Fa>به معلم‌های درسون بپیوندید!</Fa>
            </a>
          </Link>
        </p>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;
