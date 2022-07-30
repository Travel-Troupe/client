import React, {useState} from 'react'
import styled from 'styled-components'
import Calendar from '../components/Calendar'

const Input = styled.input`
  width: 100%;
  font-size: 0.875rem;
  padding: 0.875rem;
  background: white;
  border: none;
  border-radius: 0.2rem;
  ::placeholder {
    color: var(---color-grey-light);
  }
  outline: none;
`;

const InputIconStyled = styled.div`
position: relative;
    display: flex;
    width: 100%;
    margin-top: 1rem;
    align-items: center;
`;

const InputIconIStyled = styled.i `
  position: absolute;
  right: 16px;
  top: 25%;
`;

const DateInput = ({placeholder, ...props})  => {
  const [value, setValue] = useState(null);
  return (
    <>
    <InputIconStyled>
      <Input type="text" placeholder={placeholder} />
      <InputIconIStyled className='gg-calendar-dates'></InputIconIStyled>
    </InputIconStyled>
    <Calendar />
    </>
  );
};

export default DateInput;