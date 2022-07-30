import React, {useState} from 'react'
import styled from 'styled-components'
import CalendarInput from '../../components/CalendarInput'
import VotedDates from '../../components/VotedDates'
import iconPlus from '../../assets/icons/add-button.png'
import deleteButton from '../../assets/icons/deleteButton.png'

const StyledTitle = styled.h2`
  font-size: 0.875rem;
  color: var(--color-white);
  `

const StyledDateSubtitle = styled.p`
  font-size: 0.675rem;
  color: var(--color-white);
  margin-top: .25rem;
`

const StyledTSubitle = styled.p`
  font-size: 0.675rem;
  color: var(--color-white);
  margin-top: .5rem;
  `

const StyledCalendarOption = styled.div `
  display: flex;
  align-items: end;
`

const StyledImg = styled.img `
  padding-bottom: 6px;
  padding-left: 0.5rem;
`

const StyledDeleteImg = styled.img `
  padding-bottom: 6px;
  padding-left: 0.5rem;
  width: 40px;
  height: 40px;
`

const TextStyled = styled.p`
  font-size: 0.875rem;
  color: var(---color-grey-light);
`;

const InputIconStyled = styled.div`
    position: relative;
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 0.25rem;
    min-height: 44px;
    width:80%;
`;

const InputIconIStyled = styled.i `
    position: absolute;
    right: 16px;
    top: 25%;
`;

const OrDivStyled = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`
const LineStyled = styled.div `
  margin: auto;
  width: 50%;
  border-bottom: 3px solid white;
  padding-top: 0px;
`

const TextOrStyled = styled.p `
  font-size: 1.5rem;
  margin-inline: 10px;
  color: var(--color-white);
`

function FormatDate(date) {
  return `${date?.day}/${date?.month}/${date?.year}`
}


const TeamAvailability = ({team, ...props}) => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  const [proposedDate, setproposedDate] = useState([]);

  const addDateProposition = () => {
    if(!proposedDate.includes(selectedDayRange)){
      setproposedDate(proposedDate => [...proposedDate, selectedDayRange]);
    }
  }

  
  const deleteDateProposition = (index) => {
    let dd = proposedDate.splice(index)
    setproposedDate(dd)
  }

  return (
    <div >
      <StyledTitle> Sélectionner une date </StyledTitle>
      <StyledTSubitle>   Sélectionner la période où vous serez disponible, les membres de votre troupe la verront aussi :</StyledTSubitle>
      <StyledCalendarOption>
        <CalendarInput selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange} />
        <StyledImg src={iconPlus} alt="ajouter une date" onClick={addDateProposition} />
      </StyledCalendarOption>
      {proposedDate && proposedDate.length > 1 && 
      proposedDate.map((date, index) =>
        <>
        <StyledDateSubtitle>Choix {index+1}</StyledDateSubtitle>
        <InputIconStyled key={index}>
            <TextStyled>
                {FormatDate(date.from)} - {FormatDate(date.to)}
            </TextStyled>
            <InputIconIStyled className='gg-calendar-dates-light'></InputIconIStyled>
          </InputIconStyled>
          <StyledImg src={deleteButton} alt="supprimer une date" onClick={() => deleteDateProposition(index)} />
        </>
      )
      }
      <OrDivStyled>
        <LineStyled></LineStyled>
        <TextOrStyled>OU</TextOrStyled>
        <LineStyled></LineStyled>
      </OrDivStyled>
      <StyledTitle> Disponiblité de votre troupe </StyledTitle>
      <StyledTSubitle>Voter pour une date parmi celles de votre troupe :</StyledTSubitle>
      <VotedDates />
    </div>
  )
}

export default TeamAvailability
