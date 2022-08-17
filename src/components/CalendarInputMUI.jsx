import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import frLocale from 'date-fns/locale/fr';

const Input = styled.input`
  font-size: 0.875rem;
  padding: 0.875rem;
  background: white;
  border: none;
  border-radius: 0.5rem;
  ::placeholder {
    color: var(---color-grey-light);
  }
  outline: none;
  width: 9rem;
`;

const StyledRightInput = styled.input`
  font-size: 0.875rem;
  padding: 0.875rem;
  background: white;
  border: none;
  border-radius: 0.5rem;
  ::placeholder {
    color: var(---color-grey-light);
  }
  outline: none;
  width: 6.25rem;
`;


const InputIconStyled = styled.div`
  position: relative;
  display: flex;
  margin-top: 1rem;
  align-items: center;
  border-radius: 0.25rem;
`;

const InputIconIStyled = styled.i `
  position: absolute;
  right: 10px;
  top: 25%;
`;

const StyledBox = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

const  CalendarInputMUI = ({selectedDayRange, setSelectedDayRange}) => {
  return (
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        localeText={{ start: 'Date du début', end: 'Date de fin' }}
        adapterLocale={frLocale}
      >
        <MobileDateRangePicker
          toolbarTitle="Choisir une date"
          value={selectedDayRange}
          onChange={setSelectedDayRange}
          renderInput={(startProps, endProps) => (
            <InputIconStyled>
            <StyledBox>
            <StyledRightInput
              ref={startProps.inputRef}
              {...startProps.inputProps}
            />
            <Box sx={{ mx: 1 }}> - </Box>
            <Input
              ref={endProps.inputRef}
              {...endProps.inputProps}
            />
            </StyledBox>
              <InputIconIStyled className='gg-calendar-dates'></InputIconIStyled>
            </InputIconStyled>
          )}
        />
      </LocalizationProvider>
  );
}

export default CalendarInputMUI;
