import styled from 'styled-components';

const PlansContainer = styled.main`
  background-color: #6d7ce4;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  width: 100vw;
  height: 100vh;
  overflow: scroll;
  padding: 100px 20px 20px 20px;

  & .header-section p {
    font-weight: 300;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
    max-width: 400px;
    color: white;
  }

  & .plan-section {
    width: 100%;
    border-radius: 25px;
    background-color: #e5cdb3;
    padding: 0 20px 20px 20px;
    max-width: 500px;
  }

  & .plan-section img {
    width: 100%;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }

  & .plan-section div {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  & .plan-section p {
    font-weight: 700;
    color: #4d65a8;
    font-size: 18px;
    line-height: 21px;
  }
`;

export { PlansContainer };
