import Title from '../../shared/Title';
import { LoginContainer } from './LoginStyles';
import MyInput from '../../shared/MyInput';
import MyButton from '../../shared/MyButton';

export default function Login() {
  return (
    <LoginContainer>
      <Title center />
      <section className="input-section">
        <MyInput label="Name" variant="outlined" />
        <MyInput label="Password" variant="outlined" />
      </section>
      <section className="buttons-section">
        <MyButton
          disableElevation
          variant="contained"
          sx={{ height: '60px', fontSize: '22px', fontWeight: 'bold' }}
        >
          Login
        </MyButton>
        <MyButton sx={{ color: 'white', fontWeight: 'bold' }}>
          Ainda não sou grato
        </MyButton>
      </section>
    </LoginContainer>
  );
}
