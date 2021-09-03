import React, { useContext, useState } from "react";
import styled from "styled-components";
import Form from "./Form";
import TextInput from "./TextInput";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import { useNotif } from "../contexts/AppProvider";
import { themeVars } from "./GlobalStyles";

interface ILoginBox {
  redirectTo?: string;
}

const LoginBox = ({ redirectTo }: ILoginBox) => {
  const [tab, setTab] = useState("signup");
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const { notify } = useNotif();

  const handleDataAfterSuccessfulLogin = (data) => {
    const { user, token, expiresIn } = data;
    login({ user, token, expiresIn });
    router.push(redirectTo || "/");
    notify("Your are logged in.", "success");
  };

  const handleDataAfterSuccessfulSignup = (data) => {
    const { user, token, expiresIn } = data;
    login({ user, token, expiresIn });
    router.push(redirectTo || "/");
    notify("Your are successfully signed up.", "success");
  };

  return (
    <Div>
      <div className="tabs">
        <button
          className={`button tab ${tab === "login" ? "active" : ""}`}
          onClick={() => {
            setTab(() => "login");
          }}
        >
          Login
        </button>
        <button
          className={`button tab ${tab === "signup" ? "active" : ""}`}
          onClick={() => {
            setTab(() => "signup");
          }}
        >
          Sign Up
        </button>
      </div>
      {tab === "login" && (
        <>
          <Form url="/api/login" method="POST" handleDataAfterSuccess={handleDataAfterSuccessfulLogin}>
            <TextInput label="email" placeholder="Email" required />
            <TextInput label="password" placeholder="Password" type="password" required />
          </Form>
        </>
      )}
      {tab === "signup" && (
        <>
          <Form url="/api/register" method="POST" handleDataAfterSuccess={handleDataAfterSuccessfulSignup}>
            <TextInput label="firstname" placeholder="Firstname" />
            <TextInput label="Lastname" placeholder="Lastname" />
            <TextInput label="username" placeholder="username" />
            <TextInput label="email" placeholder="Email" />
            <TextInput label="password" placeholder="Password" type="password" />
          </Form>
        </>
      )}
    </Div>
  );
};
export default LoginBox;
const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
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
    background: none;
    box-shadow: none;
    border-radius: 1rem 1rem 0 0;
    color: lightgray;

    &:hover {
      box-shadow: none;
    }
  }
  .active {
    color: ${themeVars.primaryColor};
  }
`;
