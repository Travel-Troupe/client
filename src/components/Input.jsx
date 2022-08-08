import styled from 'styled-components'

const Input = styled.input`
  display: block;
  padding: 15px 10px;
  width: 100%;
  background-color: var(--color-white);
  color: var(--color-black);
  border: ${({error}) => error ? 'solid red 1px' : 'none'};
  font-size: 14px;
  border-radius: 6px;

  &::placeholder {
    color: var(--color-grey);
  }

  &:focus {
    outline: none;
  }

  & + .error {
    color: red;
    text-align: left;
  }
`


export default Input