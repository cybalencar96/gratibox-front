import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import api from "../../../services/api";
import Title from "../../shared/Title";
import {
  AvaliationContainer,
  AvalSection,
  BadAvaliationContainer,
} from "./AvaliationStyles";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import MyButton from "../../shared/MyButton";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";
import Loading from "../../shared/Loading";
import { SuccessAlert, ErrorAlert, InfoAlert } from "../../../utils/Alerts.js";

dayjs.extend(isoWeek);

const buttonStyle = {
  primary: {
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
  },
  secondary: {
    color: "white",
  },
};

export default function Avaliation() {
  const { user } = useContext(UserContext);
  const [deliveries, setDeliveries] = useState(null);
  const [avals, setAvals] = useState([{}, {}, {}]);
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    info: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }

    setAvals(
      avals.map((aval) => ({
        inputs: {},
        wasGood: null,
        wasBad: null,
        deliveryId: null,
        date: null,
      }))
    );

    fetchData();
  }, []);

  function fetchData() {
    api
      .getDeliveries(user.token)
      .then((res) => {
        setDeliveries(res.data);
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

  async function sendAval() {
    if (!avals[0].deliveryId && !avals[0].deliveryId && !avals[0].deliveryId) {
      return setAlert({
        ...alert,
        info: "Para ser grato na avaliação, você precisa selecionar uma entrega!",
      });
    }

    if (!isValidBadAvalInputs()) {
      return;
    }

    await Promise.all(
      avals.map((aval) => {
        if (aval.wasBad || aval.wasGood) {
          const body = {
            deliveryId: aval.deliveryId,
            avaliation: aval.wasGood ? true : false,
          };

          if (!body.avaliation) {
            let avaliationType = aval.inputs.late ? "Entrega atrasada " : "";
            avaliationType += aval.inputs.unlike
              ? "Não gostei do que recebi"
              : "";
            body["avaliationType"] = avaliationType;
            body["avaliationDesc"] = aval.inputs.desc;
          }

          api.sendAvaliation(body, user.token);
        }
      })
    );

    setAlert({
      ...alert,
      success: "Sua avaliação foi registrada com sucesso! Aguarde...",
    });

    setDeliveries(null);
    api.getDeliveries(user.token).then((res) => {
      setAvals(
        avals.map((aval) => ({
          inputs: {},
          wasGood: null,
          wasBad: null,
          deliveryId: null,
          date: null,
        }))
      );
      setDeliveries(res.data);
    });
  }

  function isValidBadAvalInputs() {
    for (let i = 0; i < 3; i++) {
      if (avals[i].wasBad) {
        if (!avals[i].inputs.late && !avals[i].inputs.unlike) {
          setAlert({ ...alert, error: "Selecione o motivo do deslike" });
          return false;
        }

        if (!avals[i].inputs.desc) {
          setAlert({ ...alert, error: "Dê uma breve explicação do ocorrido" });
          return false;
        }
      }
    }

    return true;
  }

  if (!deliveries) return <Loading />;
  return (
    <AvaliationContainer>
      <section className="header-section">
        <Title>Reserve um tempo para avaliar nossas entregas.</Title>
        <p>
          “Quem agradece é humilde, valoriza a vida e honra a gratidão entre
          todas as pessoas.”
        </p>
      </section>

      <AvalSection>
        <img src="/img/image01.jpg" alt="men meditating" />
        <section className="boxes-aval">
          {deliveries.length === 0 ? (
            <Typography color="primary" align="center" variant="h6">
              Você é grato à pouco tempo, ainda não recebeu entregas ಥ_ಥ
            </Typography>
          ) : (
            deliveries.map((delivery, idx) => (
              <BoxAval
                delivery={delivery || {}}
                setAvals={setAvals}
                avals={avals}
                arrId={idx}
                setAlert={setAlert}
                alert={alert}
              />
            ))
          )}
        </section>
      </AvalSection>

      {avals[0].wasBad && (
        <BadAvaliation
          show={avals[0]}
          avals={avals}
          setAvals={setAvals}
          id={0}
        />
      )}
      {avals[1].wasBad && (
        <BadAvaliation
          show={avals[1]}
          avals={avals}
          setAvals={setAvals}
          id={1}
        />
      )}
      {avals[2].wasBad && (
        <BadAvaliation
          show={avals[2]}
          avals={avals}
          setAvals={setAvals}
          id={2}
        />
      )}

      <div className="button-container">
        <MyButton
          disableElevation
          variant="contained"
          onClick={sendAval}
          sx={buttonStyle.primary}
        >
          Avaliar
        </MyButton>
        <MyButton
          onClick={() => navigate("/signature")}
          sx={buttonStyle.secondary}
        >
          Voltar para minha assinatura
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
      <InfoAlert
        open={!!alert.info}
        onClose={handleAlertClose("info")}
        htmlText={alert.info}
      />
    </AvaliationContainer>
  );
}

function BoxAval({ delivery, arrId, setAvals, avals, alert, setAlert }) {
  const { id, avaliation, delivered_at } = delivery;
  const [selected, setSelected] = useState([false, false]);

  function formatDate(dateUnixSeconds) {
    return dayjs(dateUnixSeconds * 1000).format("DD/MM/YYYY");
  }

  function handleSelection(aval) {
    if (avaliation !== null) {
      setAlert({ ...alert, error: "Essa box já foi avaliada" });
      return;
    }

    setSelected(selected.map((select, idx) => aval === idx));

    if (aval === 1) {
      avals[arrId] = {
        inputs: avals[arrId].inputs,
        wasBad: true,
        deliveryId: id,
        date: formatDate(delivered_at),
      };
    } else {
      avals[arrId] = {
        deliveryId: id,
        wasGood: true,
        wasBad: false,
        inputs: {},
      };
    }

    setAvals([...avals]);
  }

  return (
    <div className="box-aval">
      <span className={typeof avaliation === "boolean" ? "avaliated" : ""}>
        Box: {formatDate(delivered_at)}
      </span>
      <div className="aval-types">
        <div
          className={avaliation || selected[0] ? "selected" : ""}
          onClick={() => handleSelection(0)}
        >
          🙏
        </div>
        <div
          className={avaliation === false || selected[1] ? "selected" : ""}
          onClick={() => handleSelection(1)}
        >
          👎
        </div>
      </div>
    </div>
  );
}

function BadAvaliation({ show, avals, setAvals, id }) {
  const { date } = show;

  const handleInputs = (input) => (event) => {
    if (input === "late" || input === "unlike") {
      avals[id].inputs[input] = event.target.checked;
    } else {
      avals[id].inputs[input] = event.target.value;
    }

    setAvals([...avals]);
  };

  return (
    <BadAvaliationContainer>
      <section className="header-section">
        <Title>Parece que houve um problema com a sua entrega</Title>
        <p>“Nem sempre acertamos, por isso a sua avaliação é essencial.”</p>
      </section>

      <AvalSection>
        <img src="/img/image01.jpg" alt="men meditating" />
        <section className="boxes-bad-aval">
          <div>Box: {date}</div>
        </section>
        <section className="check-container">
          <FormControlLabel
            variant="gratibox"
            control={<Checkbox onChange={handleInputs("late")} />}
            label="Entrega atrasada"
          />
          <FormControlLabel
            variant="gratibox"
            control={<Checkbox onChange={handleInputs("unlike")} />}
            label="Não gostei do que recebi"
          />
        </section>

        <TextField
          id="standard-multiline-static"
          label="Comentários"
          multiline
          rows={4}
          variant="filled"
          fullWidth
          sx={{ backgroundColor: "#E0D1ED" }}
          onChange={handleInputs("desc")}
          value={avals[id].inputs.desc}
        />
      </AvalSection>
    </BadAvaliationContainer>
  );
}
