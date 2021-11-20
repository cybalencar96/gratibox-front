import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../shared/Title";
import { SignatureContainer, PlanSection } from "./SignatureStyles";
import MyButton from "../../shared/MyButton";
import { UserContext } from "../../../contexts/contexts";
import api from "../../../services/api";
import { SuccessAlert, ErrorAlert } from "../../../utils/Alerts";

export default function Signature() {
  const { user } = useContext(UserContext);
  const [subscrition, setSubscription] = useState(null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ success: false, error: false });

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
    fetchData();
  }, []);

  function fetchData() {
    api
      .getSubscription(user.token)
      .then((res) => {
        setSubscription(res.data);
      })
      .catch((err) => {
        setAlert({
          alert,
          error: String(err.response && err.response.statusText),
        });
      });
  }

  const handleAlertClose = (alertType) => () => {
    alert[alertType] = "";
    setAlert({ ...alert });
  };

  return (
    <SignatureContainer>
      <section className="header-section">
        <Title>Bom te ver por aqui, @User</Title>
        <p>“Agradecer é arte de atrair coisas boas”</p>
      </section>

      <PlanSection>
        <img src="/img/image03.jpg" alt="woman meditating" />
        <div className="signature-infos">
          <div>
            <span className="info-title">Plano: </span>
            <span className="info">@Tipo do plano</span>
          </div>
          <div>
            <span className="info-title">Data da assinatura: </span>
            <span className="info">dd/mm/aa</span>
          </div>
          <div>
            <div className="info-title">Proximas entregas:</div>
            <p className="info tab">dd/mm/aa</p>
            <p className="info tab">dd/mm/aa</p>
            <p className="info tab">dd/mm/aa</p>
          </div>
        </div>

        <div className="asked-products">
          <MyButton autoWidth color="secondary">
            Chás
          </MyButton>
          <MyButton autoWidth color="secondary">
            Produtos Orgânicos
          </MyButton>
          <MyButton autoWidth color="secondary">
            Incensos
          </MyButton>
        </div>
      </PlanSection>
      <div className="avaliation">
        <MyButton
          disableElevation
          sx={{ fontSize: "20px", fontWeight: "bold" }}
          variant="contained"
        >
          Avaliar entregas
        </MyButton>
      </div>

      <SuccessAlert
        open={!!alert.success}
        onClose={handleAlertClose("success")}
        htmlText={alert.success}
      />
      <ErrorAlert
        open={!!alert.error}
        onClose={handleAlertClose("error")}
        htmlText={alert.error}
      />
    </SignatureContainer>
  );
}
