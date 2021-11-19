import styled from 'styled-components';

const SignatureContainer = styled.main`
  background-color: #6d7ce4;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
  overflow: scroll;
  padding: 80px 20px 20px 20px;

  & .header-section {
    width: 100%;
  }

  & .header-section p {
    font-weight: 300;
    font-size: 18px;
    margin: 20px 0 0 0;
    max-width: 400px;
    color: white;
  }

  & .avaliation {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
`;

const PlanSection = styled.section`
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

  & .signature-infos > div {
  }

  & .signature-infos p {
    margin: 0;
    height: 20px;
  }

  & .info-title {
    color: #4d65a8;
    font-weight: bold;
    font-size: 18px;
  }

  & .info {
    color: #e63c80;
    font-weight: bold;
    font-size: 18px;
  }

  & .tab {
    padding-left: 40px;
  }

  & .asked-products {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 350px) {
    .css-uydyiw-MuiButtonBase-root-MuiButton-root {
      font-size: 10px;
    }
  }
`;

export { SignatureContainer, PlanSection };
