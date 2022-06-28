import styled from 'styled-components'

const Badge = styled.p`
  display: block;
  padding: 8px;
  background-color: ${({grey}) => grey ? '#f6f6f679' : '#79bfa469'};
  color: ${({grey}) => grey ? '#f6f6f6' : '#79bfa4'};
  font-size: 12px;
  font-weight: 500;
  border-radius: 50px;
`

export default Badge