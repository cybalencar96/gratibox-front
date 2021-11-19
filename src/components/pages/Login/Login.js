import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../shared/Title";
import { LoginContainer } from "./LoginStyles";
import MyInput from "../../shared/MyInput";
import MyButton from "../../shared/MyButton";
import { UserContext } from "../../../contexts/Contexts";

const labelStyle = {
  style: { fontWeight: "bold", fontSize: "20px" },
};

export default function Login() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.token && user.isSubscriber) {
      navigate("/signature");
    }
  }, []);

  const handleChange = (input) => (event) => {
    form[input] = event.target.value;
    setForm({ ...form });
  };

  function login() {}

  return (
    <LoginContainer>
      <Title center />
      <form className="input-section" onSubmit={login}>
        <MyInput
          label="Email"
          variant="outlined"
          InputLabelProps={labelStyle}
          onChange={handleChange("email")}
          value={form.email}
        />
        <MyInput
          label="Password"
          variant="outlined"
          InputLabelProps={labelStyle}
          onChange={handleChange("password")}
          value={form.password}
        />
      </form>
      <section className="buttons-section">
        <MyButton
          disableElevation
          variant="contained"
          sx={{ height: "60px", fontSize: "22px", fontWeight: "bold" }}
        >
          Login
        </MyButton>
        <MyButton
          sx={{ color: "white", fontWeight: "bold" }}
          onClick={() => navigate("/signup")}
        >
          Ainda não sou grato
        </MyButton>
      </section>
    </LoginContainer>
  );
}
