import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../shared/Title";
import { SignatureContainer, PlanSection } from "./SignatureStyles";
import MyButton from "../../shared/MyButton";
import { UserContext } from "../../../contexts/UserContext";
import api from "../../../services/api";
import { SuccessAlert, ErrorAlert } from "../../../utils/Alerts";
import Loading from "../../shared/Loading";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";

dayjs.extend(isoWeek);

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
        if (err.response) navigate("/plans");
        console.error(err);
      });
  }

  const handleAlertClose = (alertType) => () => {
    alert[alertType] = "";
    setAlert({ ...alert });
  };

  function getNext3DeliverDates() {
    const nextDeliverDate = new Date(subscrition.next_deliver_date * 1000);
    let next2;
    let next3;
    if (subscrition.subscription_type === "monthly") {
      next2 = dayjs(
        new Date(
          nextDeliverDate.getFullYear(),
          nextDeliverDate.getMonth() + 1,
          nextDeliverDate.getDate()
        )
      );
      next3 = dayjs(
        new Date(
          nextDeliverDate.getFullYear(),
          nextDeliverDate.getMonth() + 2,
          nextDeliverDate.getDate()
        )
      );

      const weekday2 = next2.isoWeekday();
      const weekday3 = next3.isoWeekday();

      if (weekday2 === 6) next2 = next2.add(2, "day");
      if (weekday3 === 6) next3 = next3.add(2, "day");
      if (weekday2 === 7) next2 = next2.add(1, "day");
      if (weekday3 === 7) next3 = next3.add(1, "day");
    }

    if (subscrition.subscription_type === "weekly") {
      next2 = dayjs(nextDeliverDate).add(7, "day");
      next3 = dayjs(nextDeliverDate).add(14, "day");
    }

    return [dayjs(nextDeliverDate), next2, next3];
  }

  if (!subscrition) return <Loading />;
  return (
    <SignatureContainer>
      <section className="header-section">
        <Title>Bom te ver por aqui, {user.name}</Title>
        <p>“Agradecer é arte de atrair coisas boas”</p>
      </section>

      <PlanSection>
        <img src="/img/image03.jpg" alt="woman meditating" />
        <div className="signature-infos">
          <div>
            <span className="info-title">Plano: </span>
            <span className="info">
              {subscrition.subscription_type === "monthly"
                ? "Mensal"
                : "Semanal"}
            </span>
          </div>
          <div>
            <span className="info-title">Data da assinatura: </span>
            <span className="info">
              {new Date(
                Number(subscrition.created_at) * 1000
              ).toLocaleDateString()}
            </span>
          </div>
          <div>
            <div className="info-title">Proximas entregas:</div>
            {getNext3DeliverDates().map((date) => {
              return <p className="info tab">{date.format("DD/MM/YYYY")}</p>;
            })}
          </div>
        </div>

        <div className="asked-products">
          {subscrition.teas && (
            <MyButton autoWidth color="secondary">
              Chás
            </MyButton>
          )}
          {subscrition.organics && (
            <MyButton autoWidth color="secondary">
              Produtos Orgânicos
            </MyButton>
          )}

          {subscrition.incenses && (
            <MyButton autoWidth color="secondary">
              Incensos
            </MyButton>
          )}
        </div>
      </PlanSection>
      <div className="avaliation">
        <MyButton
          disableElevation
          sx={{ fontSize: "20px", fontWeight: "bold" }}
          variant="contained"
          onClick={() => navigate("/avaliation")}
        >
          Avaliar entregas
        </MyButton>

        <MyButton
          disableElevation
          onClick={() => navigate("/")}
          sx={{ color: "white" }}
        >
          Voltar para home
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
