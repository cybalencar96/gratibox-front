import styled from 'styled-components';

export default function Title({children, ...other}) {
    return (
        <Header other={other}>
            {children || 'Bem vindo(a) ao GratiBox'}
        </Header>
    )
} 

const Header = styled.header`
    color: white;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
`