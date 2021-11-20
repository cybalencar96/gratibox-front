import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/contexts";
import Title from "../../shared/Title";
import { NewSignatureContainer, PlanSection } from "./NewSigStyles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import MyButton from "../../shared/MyButton";
import { IoIosArrowDown } from "react-icons/io";
import MyInput from "../../shared/MyInput";
import { SuccessAlert, ErrorAlert } from "../../../utils/Alerts";
import api from "../../../services/api";

const inputStyle = {
  backgroundColor: "rgba(224, 209, 237, 0.62)",
  border: "none",
};

const labelStyle = {
  style: { color: "#4D65A8", fontWeight: "bold", fontSize: "18px" },
};

export default function NewSignature() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search.replace("?", "").split("&");
  const [formPart, setFormPart] = useState(1);
  const { user } = useContext(UserContext);
  const [addressData, setAddressData] = useState({ name: user.name });
  const [alert, setAlert] = useState({ success: false, error: false });
  const [planData, setPlanData] = useState({
    planType: search[0],
    teas: true,
    organics: true,
    inceses: true,
  });

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
      return;
    }

    if (search[0] !== "weekly" && search[0] !== "monthly") {
      setPlanData({ ...planData, planType: null });
    }
  }, []);

  const handleAlertClose = (alertType) => () => {
    alert[alertType] = "";
    setAlert({ ...alert });
  };

  function next() {
    if (formPart === 1) {
      if (!isPlanInfosValid()) return;
    }

    if (formPart === 2) {
      if (!isAddressInfosValid()) return;
    }

    if (formPart === 1) {
      setFormPart(2);
    }

    if (formPart === 2) {
      subscribe();
    }
  }

  function isPlanInfosValid() {
    if (!planData.planType) {
      setAlert({
        ...alert,
        error: "Escolha um plano...",
      });

      return false;
    }

    if (!planData.deliver) {
      setAlert({
        ...alert,
        error: "Escolha uma entrega...",
      });

      return false;
    }

    if (!planData.teas && !planData.incenses && !planData.organics) {
      setAlert({
        ...alert,
        error: "Escolha ao menos um produto...",
      });

      return false;
    }

    return true;
  }

  function isAddressInfosValid() {
    if (!addressData.name) {
      setAlert({
        ...alert,
        error: "Preencha seu nome...",
      });

      return false;
    }

    if (!addressData.address) {
      setAlert({
        ...alert,
        error: "Preencha o endereço...",
      });

      return false;
    }

    if (
      !addressData.cep ||
      addressData.cep.length !== 8 ||
      !Number(addressData.cep)
    ) {
      setAlert({
        ...alert,
        error: "Preencha o CEP apenas com números...",
      });

      return false;
    }

    if (!addressData.city) {
      setAlert({
        ...alert,
        error: "Preencha a cidade...",
      });

      return false;
    }

    if (!addressData.uf) {
      setAlert({
        ...alert,
        error: "Preencha o estado...",
      });

      return false;
    }

    return true;
  }

  function subscribe() {
    const body = {
      subscriptionType: planData.planType,
      deliverOption: planData.deliver,
      teas: planData.teas,
      incenses: planData.incenses,
      organics: planData.organics,
      deliverInfos: {
        name: addressData.name,
        cep: addressData.cep,
        address: addressData.address,
        city: addressData.city,
        uf: addressData.uf,
      },
    };

    api
      .subscribe(body, user.token)
      .then((res) => {
        navigate("/signature");
      })
      .catch((err) => {
        setAlert({
          alert,
          error: String(err.response && err.response.statusText),
        });
      });
  }

  return (
    <NewSignatureContainer>
      <section className="header-section">
        <Title>Bom te ver por aqui, {user.name}</Title>
        <p>“Agradecer é arte de atrair coisas boas”</p>
      </section>

      <PlanSection>
        <img src="/img/image03.jpg" alt="woman meditating" />
        {formPart === 1 ? (
          <PlanForm
            planType={planData.planType}
            setPlanData={setPlanData}
            planData={planData}
          />
        ) : (
          <AddressForm
            setAddressData={setAddressData}
            addressData={addressData}
          />
        )}
      </PlanSection>

      <div className="button-container">
        <MyButton
          disableElevation
          sx={{ fontSize: "20px", fontWeight: "bold" }}
          variant="contained"
          onClick={next}
        >
          {formPart === 1 ? "Próximo" : "Finalizar"}
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
    </NewSignatureContainer>
  );
}

function DeliverType({ planType, planData, setPlanData }) {
  let control = 0;
  if (planType === "monthly") {
    control = 1;
  }
  if (planType === "weekly") {
    control = 2;
  }

  if (control === 0) return "Antes, escolha o tipo do plano";

  return control === 1 ? (
    <section className="check-container">
      <RadioGroup
        name="radio-buttons-group"
        onChange={(e) => setPlanData({ ...planData, deliver: e.target.value })}
      >
        <FormControlLabel value="1" control={<Radio />} label="Dia 1" />
        <FormControlLabel value="10" control={<Radio />} label="Dia 10" />
        <FormControlLabel value="20" control={<Radio />} label="Dia 20" />
      </RadioGroup>
    </section>
  ) : (
    <section className="check-container">
      <RadioGroup
        name="radio-buttons-group"
        onChange={(e) => setPlanData({ ...planData, deliver: e.target.value })}
      >
        <FormControlLabel value="monday" control={<Radio />} label="Segunda" />
        <FormControlLabel
          value="wednesday"
          control={<Radio />}
          label="Quarta"
        />
        <FormControlLabel value="friday" control={<Radio />} label="Sexta" />
      </RadioGroup>
    </section>
  );
}

function PlanForm({ planType, setPlanData, planData }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (planType === "monthly" || planType === "weekly") {
      setExpanded("panel2");
    }
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        sx={{
          backgroundColor: "#E0D1ED",
          color: "#4D65A8",
        }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<IoIosArrowDown />}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Plano
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            name="radio-buttons-group"
            defaultValue={planType}
            onChange={(e) =>
              setPlanData({
                ...planData,
                planType: e.target.value,
                deliver: null,
              })
            }
          >
            <FormControlLabel
              value="monthly"
              control={<Radio />}
              label="mensal"
            />
            <FormControlLabel
              value="weekly"
              control={<Radio />}
              label="semanal"
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: "#E0D1ED",
          color: "#4D65A8",
        }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary expandIcon={<IoIosArrowDown />}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Entrega
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DeliverType
            planType={planType}
            setPlanData={setPlanData}
            planData={planData}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: "#E0D1ED",
          color: "#4D65A8",
        }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary expandIcon={<IoIosArrowDown />}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Quero receber
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <section className="check-container">
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  onChange={(e) =>
                    setPlanData({ ...planData, teas: e.target.checked })
                  }
                />
              }
              label="Chás"
            />
            <FormControlLabel
              variant="gratibox"
              control={
                <Checkbox
                  defaultChecked
                  onChange={(e) =>
                    setPlanData({ ...planData, inceses: e.target.checked })
                  }
                />
              }
              label="Incensos"
            />
            <FormControlLabel
              variant="gratibox"
              control={
                <Checkbox
                  defaultChecked
                  onChange={(e) =>
                    setPlanData({ ...planData, organics: e.target.checked })
                  }
                />
              }
              label="Produtos orgânicos"
            />
          </section>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function AddressForm({ addressData, setAddressData, user }) {
  const handleInputChange = (inputType) => (event) => {
    addressData[inputType] = event.target.value;
    setAddressData({ ...addressData });
  };

  return (
    <>
      <MyInput
        label="Nome completo"
        variant="outlined"
        sx={inputStyle}
        InputLabelProps={labelStyle}
        onChange={handleInputChange("name")}
        value={addressData.name}
      />
      <MyInput
        label="Endereço de entrega"
        variant="outlined"
        sx={inputStyle}
        InputLabelProps={labelStyle}
        onChange={handleInputChange("address")}
        value={addressData.address}
      />
      <MyInput
        label="CEP"
        variant="outlined"
        sx={inputStyle}
        InputLabelProps={labelStyle}
        onChange={handleInputChange("cep")}
        value={addressData.cep}
      />
      <div className="cep-uf">
        <MyInput
          label="Cidade"
          variant="outlined"
          sx={inputStyle}
          InputLabelProps={labelStyle}
          onChange={handleInputChange("city")}
          value={addressData.city}
        />

        <MyInput
          label="Estado"
          variant="outlined"
          sx={inputStyle}
          InputLabelProps={labelStyle}
          onChange={handleInputChange("uf")}
          value={addressData.uf}
        />
      </div>
    </>
  );
}
