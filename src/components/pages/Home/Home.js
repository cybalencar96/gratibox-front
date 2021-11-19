import Title from "../../shared/Title";
import { HomeContainer } from "./HomeStyle";
import MyButton from "../../shared/MyButton";

export default function Home() {
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
          onClick={() => console.log("primeiro")}
          variant="contained"
          sx={{ height: "60px", fontSize: "22px", fontWeight: "bold" }}
        >
          Quero começar
        </MyButton>
        <MyButton
          secondary
          onClick={() => console.log("segundo")}
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Já sou grato
        </MyButton>
      </section>
    </HomeContainer>
  );
}
