import Styled from "styled-components";
import { themeVars } from "../../styles/GlobalStyles";

const Modal = ({ isVisible, closeHandler, children }) => {
  return (
    <>
      {isVisible && (
        <Div onClick={() => closeHandler()}>
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </div>
        </Div>
      )}
    </>
  );
};

export default Modal;

const Div = Styled.div`
z-index: 100;
/* max-height: 80vh; */
overflow-y: auto;
position: fixed;
z-index: 100;

  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  display: flex;
  justify-content: center;
  align-items: center;

.modal-content {
    /* max-width: 50ch; */
    background: white;
    border-radius: 1rem;
    box-shadow: ${themeVars.boxShadowHover};
}

`;
