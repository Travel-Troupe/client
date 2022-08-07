import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import CalendarInputMUI from '../../components/CalendarInputMUI'
import VotedDates from '../../components/VotedDates'
import iconPlus from '../../assets/icons/add-button.png'
import deleteButton from '../../assets/icons/deleteButton.png'
import {useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {proposeDate, voteForDate} from "../../services/Api";

const StyledTitle = styled.h2`
  font-size: 0.875rem;
  color: var(--color-white);
  `

const StyledDateSubtitle = styled.p`
  font-size: 0.675rem;
  color: var(--color-white);
  margin-top: .85rem;
  margin-bottom: .2rem
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
  padding-left: 0.5rem;
  width: auto;
  height: 50px;
  align-self: center;
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
    border-radius: 0.5rem;
    min-height: 44px;
    width:80%;
    padding-left: .85rem;
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
const SubmitButton = styled.button `
  background-color: var(--color-green);
  border-radius: 5px;
  color: white;
  padding: 8px 23px;
  text-align: center;
  -webkit-text-decoration: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  display: block;
`

const StyledDatesChoosen = styled.div `
  display: flex;
  align-items: center;
`

function newFormatDate(date) {
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const TeamAvailability = () => {
  const { teamId } = useParams()
  const { data, error, loading, refetch } = useFetch(`/team/${teamId}`)
  const navigateTo = useNavigate();

  const [selectedDayRange, setSelectedDayRange] = useState([null, null]);
  const [proposedDate, setproposedDate] = useState([]);
  const [listVotedDates, setlistVotedDates] = useState([]);


  const addVote = (proposalId) => {
    for (let i = 0; i < listVotedDates.length; i++) { 
        if(listVotedDates[i] && listVotedDates[i].proposalId == proposalId) {
            return
        }
    }
    setlistVotedDates(listVotedDates => [...listVotedDates, proposalId]);
  }

  const removeVote = (proposalId) => {
    let filtered = listVotedDates.filter(data => data.proposalId != proposalId);
    setlistVotedDates(filtered);
  }


  const addDateProposition = () => {
    if(!proposedDate.includes(selectedDayRange)){
      setproposedDate(proposedDate => [...proposedDate, selectedDayRange]);
    }
  }
  
  const deleteDateProposition = (index) => {
    let filtered = proposedDate.filter(function(_, i){
      return i != index;
  });
    setproposedDate(filtered)
  }

  const onSubmit = async (e) => {
    if(proposedDate && proposedDate.length > 0){
      for (let i = 0; i < proposedDate.length; i++) { 
        e.preventDefault()
        const payload = {
          teamId,
          startDate: newFormatDate(proposedDate[i][0]),
          endDate: newFormatDate(proposedDate[i][1]),
        }
        let res = await proposeDate(payload)
        await refetch()
      }
    }
    if(listVotedDates && listVotedDates.length > 0){
      for (let i = 0; i < listVotedDates.length; i++) { 
        e.preventDefault()
        const payload = {
          teamId,
          proposalId: listVotedDates[i]
        }
        let res = await voteForDate(payload)
        await refetch()
      }
    }
    navigateTo(`/team-funnel/votes/${teamId}`)
  }

  return (
    <div >
      <StyledTitle> Sélectionner une date </StyledTitle>
      <StyledTSubitle>   Sélectionner la période où vous serez disponible, les membres de votre troupe la verront aussi :</StyledTSubitle>
      <StyledCalendarOption>
        <CalendarInputMUI selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange}/>
        <StyledImg src={iconPlus} alt="ajouter une date" onClick={addDateProposition} />
      </StyledCalendarOption>
      {proposedDate && proposedDate.length > 1 && 
      proposedDate.map((date, index) =>
        <>
        <StyledDateSubtitle>Choix {index+1}</StyledDateSubtitle>
        <StyledDatesChoosen>
        <InputIconStyled key={index}>
            <TextStyled>
                {newFormatDate(date[0])} - {newFormatDate(date[1])}
            </TextStyled>
            <InputIconIStyled className='gg-calendar-dates-light'></InputIconIStyled>
          </InputIconStyled>
          <StyledDeleteImg src={deleteButton} alt="supprimer une date" onClick={() => deleteDateProposition(index)} />
          </StyledDatesChoosen>
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
      {data && data.datesProposals && data.datesProposals.length > 0 && 
      data.datesProposals.map((date) =>
          <VotedDates subtile="Voter" startDate={date.startDate}  endDate={date.endDate} addVote={addVote} removeVote={removeVote} proposalId={date._id} />
      )}
      <SubmitButton onClick={onSubmit}>SUIVANT</SubmitButton>
    </div>
  )
}

export default TeamAvailability
