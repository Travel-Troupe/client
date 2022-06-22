import styled from 'styled-components'

const Button = styled.button`
display: inline-block;
padding: 15px 35px;
  /* background: ${({secondary}) => secondary ? 'var(---color-green);' : 'blue'}; */
  background: var(--color-green);
  border: none;
  color: white;
  text-transform: uppercase;
  font-size: 14px;
  border-radius: 6px;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: black;
  `}
`


export default Button