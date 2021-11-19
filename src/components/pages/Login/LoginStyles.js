import styled from "styled-components";

const LoginContainer = styled.main`
  background-color: #6d7ce4;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
  padding: 110px 20px 80px 20px;

  & .input-section,
  & .buttons-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    width: 100%;
  }

  & .input-section {
    row-gap: 20px;
    height: 250px;
  }

  & .buttons-section {
    margin-top: 150px;
  }
`;

export { LoginContainer };
