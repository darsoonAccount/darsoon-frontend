import { useState } from "react";
import styled from "styled-components";
import Form from "../../components/Form";
import Modal from "../../components/Modal";
import TextInput from "../../components/TextInput";

export default function AddTeacherModal(props) {

  const submitTeacherHandler = (event) => {
    console.log('fake submiting');
  }

  return (
    <Modal {...props}>
      <Form submitHandler={submitTeacherHandler}>
        <h2>Add a teacher</h2>
        <TextInput label="Firstname"  />
        <TextInput label="Lastname" />
        <TextInput label="Password" type="password" />
        <TextInput label="Email" type="email" className="green-outline"/>
        <button type='submit' className="green-outline">Submit</button>
      </Form>
    </Modal>
  );
}
