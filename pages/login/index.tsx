import React from "react";
import styled from "styled-components";
import Form from "../../components/Form";
import TextInput from "../../components/TextInput";
const LoginPage = () => {



  return (
    <Div>
      <h2>Login</h2>
      <Form url='/api/login' method='POST'>
        <TextInput label="email" placeholder="Email" />
        <TextInput label="password" placeholder="Password" type="password" />
        <button type='submit'>Log In</button>
      </Form>
      <h2>Sign Up</h2>
      <Form url='/api/register' method='POST'>
{/* <textarea id="story" name="story"
          rows="5" cols="33">
It was a dark and stormy night...
</textarea> */}
      {/* <input type="radio" id="html" name="fav_language" value="HTML" /> */}
        <TextInput label="firstname" placeholder="Firstname" />
        <TextInput label="Lastname" placeholder="Lastname" />
        <TextInput label="username" placeholder="username" />
        <TextInput label="email" placeholder="Email" />
        <TextInput label="password" placeholder="Password" type="password" />
        <button type='submit'>Sign Up</button>
      </Form>
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
`;
