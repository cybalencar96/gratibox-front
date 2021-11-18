import Title from "../../shared/Title"
import { HomeContainer } from "./HomeStyle"
import MyButton from "../../shared/MyButton"

export default function Home () {

    return (
        <HomeContainer>
            <section>
                <Title>Bem vindo(a) ao GratiBox</Title>
                <p>Receba em casa um box com chás, produtos organicos, incensos e muito mais...</p>
            </section>
            <section className='buttons'>
                <MyButton disableElevation onClick={() => console.log('primeiro')} variant="contained" >Quero começar</MyButton>
                <MyButton secondary onClick={() =>  console.log('segundo')}>Já sou grato</MyButton>
            </section>
        </HomeContainer>
    )
}