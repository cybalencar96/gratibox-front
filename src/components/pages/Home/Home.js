import { useNavigate } from "react-router-dom";
import Title from "../../shared/Title";
import { HomeContainer } from "./HomeStyle";
import MyButton from "../../shared/MyButton";

export default function Home() {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <section>
        <Title />
        <p>
          Receba em casa um box com chás, produtos organicos, incensos e muito
          mais...
        </p>
      </section>
      <section className="buttons">
        <MyButton
          disableElevation
          onClick={() => navigate("/signup")}
          variant="contained"
          sx={{ height: "60px", fontSize: "22px", fontWeight: "bold" }}
        >
          Quero começar
        </MyButton>
        <MyButton
          secondary
          sx={{ color: "white", fontWeight: "bold" }}
          onClick={() => navigate("/login")}
        >
          Já sou grato
        </MyButton>
      </section>
    </HomeContainer>
  );
}
