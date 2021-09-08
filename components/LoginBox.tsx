import React, { useContext, useState } from "react";
import styled from "styled-components";
import Form from "./Form/Form";
import TextInput from "./Form/TextInput";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import { useNotif } from "../contexts/AppProvider";
import { themeVars } from "../styles/GlobalStyles";
import T from "./translation/T";
import En from "./translation/En";
import Fa from "./translation/Fa";

interface ILoginBox {
  redirectTo?: string;
}

const LoginBox = ({ redirectTo }: ILoginBox) => {
  const [tab, setTab] = useState("signup");
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const { notify } = useNotif();

  // LOGIN Handlers ***************************************

  const handleDataAfterSuccessfulLogin = (data) => {
    const { user, token, expiresIn } = data;
    login({ user, token, expiresIn });
    router.push(redirectTo || "/");
    notify({ fa: "وارد حساب کاربریتان شدید.", en: "Your are logged in.", type: "success" });
  };

  const handleLogiFail = (error) => {
    notify({ en: error.response.data.message, fa: error.response.data.messageFa, type: "error" });
  };

  // SIGNUP Handlers ***************************************

  const handleDataAfterSuccessfulSignup = (data) => {
    const { user, token, expiresIn } = data;
    login({ user, token, expiresIn });
    router.push(redirectTo || "/");
    notify({ fa: "حساب کاربری شما با موفقیت ساخته شد.", en: "Your are successfully signed up.", type: "success" });
  };

  const hadleSignupFail = (error) => {
    console.log(error.response.data);

    notify({ en: error.response.data.message, fa: error.response.data.messageFa, type: "error" });
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
          <T fa="ورود به حساب کاربری" en="Login to your account" />
        </button>
        <button
          className={`button tab ${tab === "signup" ? "active" : ""}`}
          onClick={() => {
            setTab(() => "signup");
          }}
        >
          <T fa="ساختن حساب کاربری" en="Create an account" />
        </button>
      </div>
      {tab === "login" && (
        <>
          <Form url="/api/login" handleDataAfterSuccess={handleDataAfterSuccessfulLogin} handleFail={handleLogiFail}>
            <TextInput name="email" labelFa="ایمیل" labelEn="Email" required />
            <TextInput name="password" labelFa="گذرواژه" labelEn="Password" type="password" required />
            <button className="button" type="submit">
              <T fa="ورود به حساب" en="Login" />
            </button>
          </Form>
        </>
      )}
      {tab === "signup" && (
        <>
          <Form url="/api/register" handleDataAfterSuccess={handleDataAfterSuccessfulSignup} handleFail={hadleSignupFail}>
            <TextInput name="firstname" labelFa="نام به انگلیسی" labelEn="Firstname" required />
            <TextInput name="lastname" labelFa="نام خانوادگی به انکلیسی" labelEn="Lastname" required />
            <TextInput name="firstnameFa" labelFa="نام به فارسی" labelEn="Firstname in Farsi" required />
            <TextInput name="lastnameFa" labelFa="نام خانوادگی به فارسی" labelEn="Lastname in Farsi" required />
            <TextInput name="username" labelFa="نام کاربری" labelEn="username" required />
            <TextInput name="email" labelFa="ایمیل" labelEn="Email" type="email" required />
            <TextInput name="password" labelFa="گذرواژه" labelEn="Password" type="password" required />
            <button className="button" type="submit">
              <T fa="ایجاد حساب" en="Signup" />
            </button>
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
