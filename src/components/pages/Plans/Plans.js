import Title from "../../shared/Title";
import { PlansContainer } from "./PlansStyles";
import MyButton from "../../shared/MyButton";
export default function Plans() {
    return (
        <PlansContainer>
            <section className='header-section'>
                <Title>Bom te ver por aqui, @User</Title>
                <p>Você ainda não assinou um plano, que tal começar agora?</p>
            </section>

            <section className='plan-section'>
                <img src='/img/image04.jpg' alt='woman meditating'/>
                <p>Você recebe um box por semana. Ideal para quem quer exercer a gratidão todos os dias.</p>
                <div><MyButton disableElevation variant='contained'>Assinar</MyButton></div>
            </section>

            <section className='plan-section'>
                <img src='/img/image02.jpg' alt='woman meditating'/>
                <p>Você recebe um box por mês. <br/> <br/> Ideal para quem está começando agora.</p>
                <div><MyButton disableElevation variant='contained'>Assinar</MyButton></div>
            </section>
        </PlansContainer>
    )
}