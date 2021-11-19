import styled from "styled-components";

const AvaliationContainer = styled.main`
  background-color: #6d7ce4;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
  overflow: scroll;
  padding: 40px 20px 20px 20px;

  & .header-section {
    width: 100%;
  }

  & .header-section p {
    font-weight: 300;
    font-size: 18px;
    margin: 20px 0;
    max-width: 400px;
    color: white;
  }
`;

const AvalSection = styled.section`
  width: 100%;
  border-radius: 25px;
  background-color: white;
  padding: 0 20px 20px 20px;
  max-width: 500px;

  & img {
    width: 100%;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }

  & .boxes-aval {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  & .box-aval {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8c97ea;
    font-size: 24px;
  }

  & .aval-types {
    display: flex;
    gap: 15px;
  }

  & .aval-types div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e0d1ed;
    border-radius: 5px;
    padding: 5px;
  }
`;

const BadAvaliationContainer = styled.section`
  margin-top: 80px;

  & .boxes-bad-aval {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: #8c97ea;
    font-size: 24px;
  }

  & .check-container {
    display: flex;
    justify-content: space-evenly;
    margin: 10px 0;
  }

  & .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
`;

export { AvaliationContainer, AvalSection, BadAvaliationContainer };
