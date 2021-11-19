import styled from "styled-components";

export default function Title({ children, center, ...other }) {
  return (
    <Header center={center} other={other}>
      {children || "Bem vindo(a) ao GratiBox"}
    </Header>
  );
}

const Header = styled.header`
  color: white;
  font-size: 28px;
  font-weight: 700;
  text-align: ${(props) => (props.center ? "center" : "")};
  margin-bottom: 20px;
  width: 100%;
`;
