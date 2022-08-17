import React, {useState} from 'react'
import styled from 'styled-components'
import CalendarInputMUI from '../../components/CalendarInputMUI'
import VotedDates from '../../components/VotedDates'
import {useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {validDate} from "../../services/Api";
import { StyledCalendarOption, StyledTSubitle } from './TeamAvailability';

const StyledTitle = styled.h2`
  font-size: 0.875rem;
  color: var(--color-white);
  `

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

function apiFormatDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

const TeamLeadInterface = () => {
  const { teamId } = useParams()
  const { data, error, loading, refetch } = useFetch(`/team/${teamId}`)
  const navigateTo = useNavigate();
  const [selectedDayRange, setSelectedDayRange] = useState([null, null]);
  const [votedDate, setvotedDate] = useState(null);

  const addVote = (proposalId) => {
    setvotedDate(proposalId);
  }

  const removeVote = () => {
    setvotedDate(null);
  }


  const onSubmit = async (e) => {
    let startDate, endDate;
    if(selectedDayRange && selectedDayRange.length > 0 && selectedDayRange[0] && selectedDayRange[1]){
        startDate = apiFormatDate(selectedDayRange[0]);
        endDate = apiFormatDate(selectedDayRange[1]);
    } else if (votedDate) {
        if (data && data.datesProposals && data.datesProposals.length > 0){
            data.datesProposals.forEach(date => {
                if (date._id == votedDate){
                    startDate = date.startDate;
                    endDate = date.endDate;
                }
            });
        }

    }
    e.preventDefault()
    const payload = {
        teamId,
        startDate: startDate,
        endDate: endDate,
    }
    await validDate(payload)
    await refetch()
    navigateTo(`/`)
  }

  return (
    <div>
      <StyledTitle> En tant que chef d'équipe, vous validez la date finale</StyledTitle>
      <StyledTSubitle>   Sélectionner la période définitive où vous serez disponible :</StyledTSubitle>
      <StyledCalendarOption>
        <CalendarInputMUI selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange}/>
      </StyledCalendarOption>
      <OrDivStyled>
        <LineStyled></LineStyled>
        <TextOrStyled>OU</TextOrStyled>
        <LineStyled></LineStyled>
      </OrDivStyled>
      <StyledTSubitle>Valider une date déjà proposée :</StyledTSubitle>
      {data && data.datesProposals && data.datesProposals.length > 0 && 
      data.datesProposals.map((date) =>
          <VotedDates subtile="Voter" startDate={date.startDate}  endDate={date.endDate} addVote={addVote} removeVote={removeVote} proposalId={date._id} teamComposition={data.teamComposition} proposedBy={date.proposedBy}/>
      )}
      <SubmitButton onClick={onSubmit}>VALIDATION</SubmitButton>
    </div>
  )
}

export default TeamLeadInterface
