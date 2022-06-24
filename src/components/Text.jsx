import styled from 'styled-components'

const Text = styled.p`
margin-bottom: 20px;
  color: var(--color-white);
  font-size: ${({small}) => small ? '12px' : '20px'};
  font-weight: 500;
`


export default Text