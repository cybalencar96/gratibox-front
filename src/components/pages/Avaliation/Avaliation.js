import Title from "../../shared/Title";
import {
  AvaliationContainer,
  AvalSection,
  BadAvaliationContainer,
} from "./AvaliationStyles";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import MyButton from "../../shared/MyButton";

export default function Avaliation() {
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
          <BoxAval />
          <BoxAval />
          <BoxAval />
        </section>
      </AvalSection>
      <BadAvaliation />
    </AvaliationContainer>
  );
}

function BoxAval() {
  return (
    <div className="box-aval">
      <span>Box: dd/mm/aaaa</span>
      <div className="aval-types">
        <div>🙏</div>
        <div>👎</div>
      </div>
    </div>
  );
}

function BadAvaliation() {
  return (
    <BadAvaliationContainer>
      <section className="header-section">
        <Title>Parece que houve um problema com a sua entrega</Title>
        <p>“Nem sempre acertamos, por isso a sua avaliação é essencial.”</p>
      </section>

      <AvalSection>
        <img src="/img/image01.jpg" alt="men meditating" />
        <section className="boxes-bad-aval">
          <div>Box: dd/mm/aaaa</div>
          <div>Box: dd/mm/aaaa</div>
        </section>
        <section className="check-container">
          <FormControlLabel
            variant="gratibox"
            control={<Checkbox />}
            label="Entrega atrasada"
          />
          <FormControlLabel
            variant="gratibox"
            control={<Checkbox />}
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
        />
      </AvalSection>

      <div className="button-container">
        <MyButton disableElevation variant="contained">
          Avaliar
        </MyButton>
      </div>
    </BadAvaliationContainer>
  );
}
