import React from "react";
import styled from "styled-components";
import { useNotif } from "../contexts/AppProvider";
import ToastNotification from "./ToastNotification";

export default function ToastNotifications() {
  //get toast notifications from appContenxt
  const { notifs } = useNotif();
  //display them
  return (
    <Div>
      {notifs &&
        notifs.length > 0 &&
        notifs.map((notif) => {
          return <ToastNotification message={notif.message} type={notif.type} />;
        })}
    </Div>
  );
}
const Div = styled.div`
  z-index: 999;
  position: fixed;
  inset-inline-start: 3rem;
  inset-block-end: 3rem;
  border-radius: 2rem;
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
