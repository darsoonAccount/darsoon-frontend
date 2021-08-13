import React, { useContext, useState } from "react";
import styled from "styled-components";
import Form from "../../components/Form";
import TextInput from "../../components/TextInput";
import { AuthContext } from "../../contexts/AuthProvider";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [tab, setTab] = useState("signup");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleDataAfterSuccessfulLogin = (data) => {
    const { user, token, expiresIn } = data;
    login({ user, token, expiresIn });
    router.push("/");
  };

  const handleDataAfterSuccessfulSignup = (data) => {
    const { user, token, expiresIn } = data;
    login({ user, token, expiresIn });
    router.push("/");
  };

  return (
    <Div>
      <div className="tabs">
        <button
          className={`tab ${tab === "login" ? "active" : ""}`}
          onClick={() => {
            setTab(() => "login");
          }}
        >
          Login
        </button>
        <button
          className={`tab ${tab === "signup" ? "active" : ""}`}
          onClick={() => {
            setTab(() => "signup");
          }}
        >
          Sign Up
        </button>
      </div>
      {tab === "login" && (
        <>
          <Form
            url="/api/login"
            method="POST"
            handleDataAfterSuccess={handleDataAfterSuccessfulLogin}
          >
            <TextInput label="email" placeholder="Email" />
            <TextInput
              label="password"
              placeholder="Password"
              type="password"
            />
            <button type="submit">Log In</button>
          </Form>
        </>
      )}
      {tab === "signup" && (
        <>
          <Form
            url="/api/register"
            method="POST"
            handleDataAfterSuccess={handleDataAfterSuccessfulSignup}
          >
            {/* <textarea id="story" name="story"
          rows="5" cols="33">
It was a dark and stormy night...
</textarea> */}
            {/* <input type="radio" id="html" name="fav_language" value="HTML" /> */}
            <TextInput label="firstname" placeholder="Firstname" />
            <TextInput label="Lastname" placeholder="Lastname" />
            <TextInput label="username" placeholder="username" />
            <TextInput label="email" placeholder="Email" />
            <TextInput
              label="password"
              placeholder="Password"
              type="password"
            />
            <button type="submit">Sign Up</button>
          </Form>
        </>
      )}
    </Div>
  );
};
export default LoginPage;
const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  border: 1px solid gray;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .tab {
    border-radius: 1rem 1rem 0 0;
  }
  .active {
    background: yellow;
  }
`;
