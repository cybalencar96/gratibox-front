import { useState } from "react";
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

export default function NewSignature() {
  const [formPart, setFormPart] = useState(1);
  return (
    <NewSignatureContainer>
      <section className="header-section">
        <Title>Bom te ver por aqui, @User</Title>
        <p>“Agradecer é arte de atrair coisas boas”</p>
      </section>

      <PlanSection>
        <img src="/img/image03.jpg" alt="woman meditating" />
        {formPart === 1 ? <PlanForm /> : <AddressForm />}
      </PlanSection>

      <div className="button-container">
        <MyButton
          disableElevation
          sx={{ fontSize: "20px", fontWeight: "bold" }}
          variant="contained"
          onClick={() => setFormPart(2)}
        >
          {formPart == 1 ? "Próximo" : "Finalizar"}
        </MyButton>
      </div>
    </NewSignatureContainer>
  );
}

function DeliverType({ type }) {
  let control = 0;
  if (type === "mensal") {
    control = 1;
  }
  if (type === "semanal") {
    control = 2;
  }

  if (control === 0) return "Antes, escolha o tipo do plano";

  return control === 1 ? (
    <section className="check-container">
      <RadioGroup name="radio-buttons-group">
        <FormControlLabel value="1" control={<Radio />} label="Dia 1" />
        <FormControlLabel value="10" control={<Radio />} label="Dia 10" />
        <FormControlLabel value="20" control={<Radio />} label="Dia 20" />
      </RadioGroup>
    </section>
  ) : (
    <section className="check-container">
      <RadioGroup name="radio-buttons-group">
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

function PlanForm() {
  const [expanded, setExpanded] = useState(false);

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
          <RadioGroup name="radio-buttons-group">
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
          <DeliverType type="" />
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
              control={<Checkbox defaultChecked />}
              label="Chás"
            />
            <FormControlLabel
              variant="gratibox"
              control={<Checkbox />}
              label="Incensos"
            />
            <FormControlLabel
              variant="gratibox"
              control={<Checkbox />}
              label="Produtos orgânicos"
            />
          </section>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function AddressForm() {
  const inputStyle = {
    backgroundColor: "rgba(224, 209, 237, 0.62)",
    border: "none",
  };

  const labelStyle = {
    style: { color: "#4D65A8", fontWeight: "bold", fontSize: "18px" },
  };
  return (
    <>
      <MyInput
        label="Nome completo"
        variant="outlined"
        sx={inputStyle}
        InputLabelProps={labelStyle}
      />
      <MyInput
        label="Endereço de entrega"
        variant="outlined"
        sx={inputStyle}
        InputLabelProps={labelStyle}
      />
      <MyInput
        label="CEP"
        variant="outlined"
        sx={inputStyle}
        InputLabelProps={labelStyle}
      />
      <div className="cep-uf">
        <MyInput
          label="Cidade"
          variant="outlined"
          sx={inputStyle}
          InputLabelProps={labelStyle}
        />

        <MyInput
          label="Estado"
          variant="outlined"
          sx={inputStyle}
          InputLabelProps={labelStyle}
        />
      </div>
    </>
  );
}
