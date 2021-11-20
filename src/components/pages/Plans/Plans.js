import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/contexts";
import Title from "../../shared/Title";
import { PlansContainer } from "./PlansStyles";
import MyButton from "../../shared/MyButton";

export default function Plans() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, []);

  function sendToNewSignature(planType) {
    navigate(`/signature/new?${planType}`);
  }

  return (
    <PlansContainer>
      <section className="header-section">
        <Title>Bom te ver por aqui, {user.name}</Title>
        <p>Você ainda não assinou um plano, que tal começar agora?</p>
      </section>

      <section className="plan-section">
        <img src="/img/image04.jpg" alt="woman meditating" />
        <p>
          Você recebe um box por semana. <br /> <br />
          Ideal para quem quer exercer a gratidão todos os dias.
        </p>
        <div>
          <MyButton
            disableElevation
            variant="contained"
            onClick={() => sendToNewSignature("weekly")}
          >
            Assinar
          </MyButton>
        </div>
      </section>

      <section className="plan-section">
        <img src="/img/image02.jpg" alt="woman meditating" />
        <p>
          Você recebe um box por mês. <br /> <br /> Ideal para quem está
          começando agora.
        </p>
        <div>
          <MyButton
            disableElevation
            variant="contained"
            onClick={() => sendToNewSignature("monthly")}
          >
            Assinar
          </MyButton>
        </div>
      </section>
    </PlansContainer>
  );
}
