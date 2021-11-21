import styled from "styled-components";

const LoginContainer = styled.main`
  background-color: #6d7ce4;

  width: 100vw;
  height: 100vh;
  padding: 110px 20px 80px 20px;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  }

  & .inputs-section,
  & .buttons-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    width: 100%;
  }

  & .inputs-section {
    row-gap: 30px;
    height: 250px;
  }

  & .buttons-section {
    margin-top: 150px;
  }
`;

export { LoginContainer };
