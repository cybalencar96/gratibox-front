import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../shared/Title";
import { LoginContainer } from "./LoginStyles";
import MyInput from "../../shared/MyInput";
import MyButton from "../../shared/MyButton";
import { UserContext } from "../../../contexts/contexts";
import { SuccessAlert, ErrorAlert } from "../../../utils/Alerts";
import api from "../../../services/api";
import Loading, { ButtonLoading } from "../../shared/Loading";

const labelStyle = {
  style: { fontWeight: "bold", fontSize: "20px" },
};

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ success: false, error: false });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.token && user.isSubscriber) {
      navigate("/signature");
    } else {
      setPageLoading(false);
    }
  }, []);

  const handleChange = (input) => (event) => {
    form[input] = event.target.value;
    setForm({ ...form });
  };

  const handleAlertClose = (alertType) => () => {
    alert[alertType] = "";
    setAlert({ ...alert });

    if (alertType === "success") {
      user.isSubscriber ? navigate("/signature") : navigate("/plans");
    }
  };

  function login(e) {
    e.preventDefault();
    setLoading(true);
    const { email, password } = form;
    api
      .login({ email, password })
      .then((res) => {
        api
          .getSubscription(res.data.token)
          .then((resp) => {
            setUser({ ...res.data, isSubscriber: true });
            localStorage.setItem(
              "gratibox",
              JSON.stringify({ ...res.data, isSubscriber: true })
            );
          })
          .catch((error) => {
            setUser(res.data);
            localStorage.setItem(
              "gratibox",
              JSON.stringify({ ...res.data, isSubscriber: true })
            );
          })
          .finally(() => {
            setAlert({
              ...alert,
              success:
                "Login realizado com sucesso! Redirecionando, aguarde...",
            });
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

  if (pageLoading) return <Loading />;
  return (
    <LoginContainer>
      <Title center />
      <form onSubmit={login}>
        <section className="inputs-section">
          <MyInput
            label="Email"
            variant="outlined"
            InputLabelProps={labelStyle}
            onChange={handleChange("email")}
            value={form.email}
            required
            type="email"
          />
          <MyInput
            label="Password"
            variant="outlined"
            InputLabelProps={labelStyle}
            onChange={handleChange("password")}
            value={form.password}
            type="password"
            required
          />
        </section>
        <section className="buttons-section">
          <MyButton
            disableElevation
            variant="contained"
            sx={{ height: "60px", fontSize: "22px", fontWeight: "bold" }}
            type="submit"
          >
            {loading ? <ButtonLoading color="info" /> : "Entrar"}
          </MyButton>
          <MyButton
            sx={{ color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}
          >
            Ainda não sou grato
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
    </LoginContainer>
  );
}
