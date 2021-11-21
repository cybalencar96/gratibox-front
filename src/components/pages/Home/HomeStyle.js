import styled from "styled-components";

const HomeContainer = styled.main`
  background-image: url("/img/image05.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 100vh;
  padding: 50px 20px;
  color: white;

  & > section > p {
    font-weight: 300;
    font-size: 18px;
    text-align: center;
    margin-top: 40px;
    max-width: 400px;
  }

  & .buttons {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    width: 100%;
  }
`;

export { HomeContainer };
