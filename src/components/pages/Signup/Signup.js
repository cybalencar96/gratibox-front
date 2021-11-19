import Title from '../../shared/Title';
import { SignupContainer } from './SignupStyles';
import MyInput from '../../shared/MyInput';
import MyButton from '../../shared/MyButton';

export default function Signup() {
  return (
    <SignupContainer>
      <Title center />
      <section className="input-section">
        <MyInput color="common" label="Nome" variant="outlined" />
        <MyInput color="common" label="Email" variant="outlined" />
        <MyInput color="common" label="Senha" variant="outlined" />
        <MyInput color="common" label="Confirmar Senha" variant="outlined" />
      </section>
      <section className="buttons-section">
        <MyButton
          disableElevation
          variant="contained"
          sx={{ height: '60px', fontSize: '22px', fontWeight: 'bold' }}
        >
          Signup
        </MyButton>
        <MyButton sx={{ color: 'white', fontWeight: 'bold' }}>
          Já sou grato
        </MyButton>
      </section>
    </SignupContainer>
  );
}
