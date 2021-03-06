import styled, { keyframes } from "styled-components";
import { CgSpinner } from "react-icons/cg";
import { themeVars } from "../../styles/GlobalStyles";

const Loading = () => {
  return (
    <Div className="spinner-div">
      <CgSpinner size="40" className="spinner" />
    </Div>
  );
};

export default Loading;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Div = styled.div`
padding: 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    color: ${themeVars.primaryColor};
    animation: ${rotate} 1s linear infinite;
  }
`;
