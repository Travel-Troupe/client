import styled from 'styled-components'

const Image = styled.img`
    width: ${({small}) => small ? '30px' : '50px'};
    height: ${({small}) => small ? '30px' : '50px'};
    border-radius: 50%;
`

export default Image