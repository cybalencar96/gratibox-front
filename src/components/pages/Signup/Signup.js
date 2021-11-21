import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../shared/Title";
import { SignupContainer } from "./SignupStyles";
import MyInput from "../../shared/MyInput";
import MyButton from "../../shared/MyButton";
import api from "../../../services/api";
import { SuccessAlert, ErrorAlert } from "../../../utils/Alerts";
import { ButtonLoading } from "../../shared/Loading";

const labelStyle = {
  style: { fontWeight: "bold", fontSize: "17px" },
};

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({ success: false, error: false });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (input) => (event) => {
    form[input] = event.target.value;
    setForm({ ...form });
  };

  const handleAlertClose = (alertType) => () => {
    alert[alertType] = "";
    setAlert({ ...alert });

    if (alertType === "success") {
      navigate("/login");
    }
  };

  function signup(e) {
    e.preventDefault();
    setLoading(true);
    if (form.password !== form.confirmPassword) {
      setAlert({ ...alert, error: "Senhas não coincidem" });
      setLoading(false);
      return;
    }

    const { name, email, password } = form;
    api
      .signup({ name, email, password })
      .then((res) => {
        setAlert({
          ...alert,
          success:
            "Cadastro realizado com sucesso! Redirecionando para login...",
        });
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          alert,
          error: String(err.response && err.response.statusText),
        });
      });
  }

  return (
    <SignupContainer>
      <Title center />
      <form onSubmit={signup}>
        <section className="inputs-section">
          <MyInput
            color="common"
            label="Nome"
            variant="outlined"
            InputLabelProps={labelStyle}
            onChange={handleChange("name")}
            value={form.name}
            required
            inputProps={{ id: "name" }}
          />
          <MyInput
            color="common"
            label="Email"
            variant="outlined"
            InputLabelProps={labelStyle}
            onChange={handleChange("email")}
            value={form.email}
            type="email"
            required
            title="example@example.com"
            inputProps={{ id: "email" }}
          />
          <MyInput
            color="common"
            label="Senha"
            variant="outlined"
            InputLabelProps={labelStyle}
            onChange={handleChange("password")}
            value={form.password}
            type="password"
            required
            inputProps={{ id: "password" }}
          />
          <MyInput
            color="common"
            label="Confirmar Senha"
            variant="outlined"
            InputLabelProps={labelStyle}
            onChange={handleChange("confirmPassword")}
            value={form.confirmPassword}
            type="password"
            required
            inputProps={{ id: "confirmPassword" }}
          />
        </section>

        <section className="buttons-section">
          <MyButton
            disableElevation
            variant="contained"
            sx={{ height: "60px", fontSize: "22px", fontWeight: "bold" }}
            type="submit"
          >
            {loading ? <ButtonLoading /> : "Cadastrar"}
          </MyButton>
          <MyButton
            sx={{ color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/login")}
          >
            Já sou grato
          </MyButton>
        </section>
      </form>
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
    </SignupContainer>
  );
}
