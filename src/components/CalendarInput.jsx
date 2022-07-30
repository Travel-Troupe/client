import React from "react";
import styled from 'styled-components'
import { utils } from "react-modern-calendar-datepicker";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';

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
`;

const InputIconStyled = styled.div`
    position: relative;
    background-color: white;
    display: flex;
    margin-top: 1rem;
    align-items: center;
    border-radius: 0.25rem;
`;

const InputIconIStyled = styled.i `
    position: absolute;
    right: 16px;
    top: 25%;
`;


const frenchLocale = {
    // months list by order
    months: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mais',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
    ],
  
    // week days by order
    weekDays: [
      {
        name: 'Dimanche',
        short: 'DIM', 
        isWeekend: true,
      },
      {
        name: 'Lundi',
        short: 'LUN',
      },
      {
        name: 'Mardi',
        short: 'MAR',
      },
      {
        name: 'Mercredi',
        short: 'MER',
      },
      {
        name: 'Jeudi',
        short: 'JEU',
      },
      {
        name: 'Vendredi',
        short: 'VEN',
      },
      {
        name: 'Samedi',
        short: 'SAM',
        isWeekend: true,
      },
    ],
  
    weekStartingIndex: 0,
  
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
  
    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
  
    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
  
    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },
  
    // texts in the date picker
    nextMonth: '>',
    previousMonth: '<',
    openMonthSelector: 'Selectionner le mois',
    openYearSelector: 'Selectionner l année',
    closeMonthSelector: 'Fermer',
    closeYearSelector: 'Fermer',
    defaultPlaceholder: 'Selection...',
  
    // for input range value
    from: 'from',
    to: 'to',
    digitSeparator: ',',
    yearLetterSkip: 0,
    isRtl: false,
  }

function formatDate(date) {
    return `${date?.day}/${date?.month}/${date?.year}`
}



const CalendarInput = ({selectedDayRange, setSelectedDayRange}) => {
  const renderCustomInput = ({ ref }) => (
    <InputIconStyled>
        <Input
        readOnly
        ref={ref} 
        placeholder="Choisissez la date idéale"
        value={selectedDayRange && selectedDayRange.from && selectedDayRange.to ? `${formatDate(selectedDayRange.from)} - ${formatDate(selectedDayRange.to)}` : ''}
        />
        <InputIconIStyled className='gg-calendar-dates'></InputIconIStyled>
    </InputIconStyled>
  )

  return (
    <DatePicker
    value={selectedDayRange}
    onChange={setSelectedDayRange}
    minimumDate={utils().getToday()}
    colorPrimary="#79BFA4"
    colorPrimaryLight="rgba(121, 191, 164, 0.4)"
    renderInput={renderCustomInput}
    locale={frenchLocale}
    wrapperClassName="datepicker"
    />
  );
};

export default CalendarInput;