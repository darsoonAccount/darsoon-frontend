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
        notifs.map((notif, index) => {
          return <ToastNotification key={`toastNotification-${index}`} message={notif.message} type={notif.type} />;
        })}
    </Div>
  );
}
const Div = styled.div`
  pointer-events: none;
  z-index: 999;
  position: fixed;
  inset-inline-start: min(10vw, 2rem);
  inset-block-end: min(10vw, 2rem);
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
