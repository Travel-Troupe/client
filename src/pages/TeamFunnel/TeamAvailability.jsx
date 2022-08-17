import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import CalendarInputMUI from '../../components/CalendarInputMUI'
import VotedDates from '../../components/VotedDates'
import iconPlus from '../../assets/icons/add-button.png'
import deleteButton from '../../assets/icons/deleteButton.png'
import {useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {proposeDate, voteForDate} from "../../services/Api";
import uuidv4 from '../../utils/uuidv4'
import formatDate from '../../utils/formatDate'

const StyledTitle = styled.h2`
  font-size: 0.875rem;
  color: var(--color-white);
  `

const StyledDateSubtitle = styled.p`
  font-size: 0.675rem;
  color: var(--color-white);
  margin-top: .85rem;
  margin-bottom: .2rem;
`

export const StyledTSubitle = styled.p`
  font-size: 0.675rem;
  color: var(--color-white);
  margin-top: .5rem;
  `

export const StyledCalendarOption = styled.div `
  display: flex;
  align-items: end;
  justify-content: space-between;
`

const StyledImg = styled.img `
  padding-bottom: 6px;
  padding-right: 10px;
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
  justify-content: space-between;
`

const TeamAvailability = () => {
  const { teamId } = useParams()
  const { data, error, loading, refetch } = useFetch(`/team/${teamId}`)
  const navigateTo = useNavigate();

  const [selectedDayRange, setSelectedDayRange] = useState([null, null]);
  const [proposedDate, setproposedDate] = useState([]);
  const [listVotedDates, setlistVotedDates] = useState([]);


  const addVote = (proposalId) => {
    if (listVotedDates.includes(element => element.proposalId === proposalId)) {
      return 
    }
    setlistVotedDates(listVotedDates => [...listVotedDates, proposalId]);
  }

  const removeVote = (proposalId) => {
    let filtered = listVotedDates.filter(data => data.proposalId != proposalId);
    setlistVotedDates(filtered);
  }


  const addDateProposition = () => {
    if (!selectedDayRange.filter(Boolean).length) {
      return
    }

    const payload = {
      id: uuidv4(),
      startDate: selectedDayRange[0],
      endDate: selectedDayRange[1]
    }
    
    const rangeExists = proposedDate.find(({ startDate, endDate }) => startDate === payload.startDate && endDate === payload.endDate)

    if(!rangeExists){
      setproposedDate([...proposedDate, payload]);
    } else {
      window.alert('Cette proposition de date existe déjà')
    }
  }
  
  const deleteDateProposition = (id) => {
    const filtered = proposedDate.filter(({ id: proposalId }) => id !== proposalId);
    setproposedDate(filtered)
  }

  const onSubmit = async (e) => {
    if (proposedDate && proposedDate.length > 0){
      for (let i = 0; i < proposedDate.length; i++) { 
        e.preventDefault()
        const payload = {
          teamId,
          startDate: (proposedDate[i].startDate.toString()),
          endDate: (proposedDate[i].endDate.toString()),
        }

        console.log(payload)
        await proposeDate(payload)
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
        await voteForDate(payload)
        await refetch()
      }
    }
    navigateTo(`/team-funnel/votes/${teamId}`)
  }

  return (
    <div >
      <StyledTitle>
        Sélectionner une date
      </StyledTitle>
      <StyledTSubitle>
        Sélectionner la période où vous serez disponible, les membres de votre troupe la verront aussi :
      </StyledTSubitle>
      <StyledCalendarOption>
        <CalendarInputMUI selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange}/>
        <StyledImg src={iconPlus} alt="Ajouter une date" onClick={addDateProposition} />
      </StyledCalendarOption>
      {
        proposedDate &&
        !!proposedDate.length &&
        proposedDate.map(({ startDate, endDate, id }, index) => (
          <React.Fragment key={index}>
            <StyledDateSubtitle>Choix {index + 1}</StyledDateSubtitle>
            <StyledDatesChoosen>
              <InputIconStyled>
                <TextStyled>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </TextStyled>
                <InputIconIStyled className='gg-calendar-dates-light'></InputIconIStyled>
              </InputIconStyled>
              <StyledDeleteImg src={deleteButton} alt="supprimer une date" onClick={() => deleteDateProposition(id)} />
            </StyledDatesChoosen>
          </React.Fragment>
        ))
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
        <VotedDates
          subtile="Voter"
          startDate={date.startDate}
          endDate={date.endDate}
          addVote={addVote}
          removeVote={removeVote}
          proposalId={date._id}
          teamComposition={data.teamComposition}
          proposedBy={date.proposedBy}
        />
      )}
      <SubmitButton onClick={onSubmit}>SUIVANT</SubmitButton>
    </div>
  )
}

export default TeamAvailability
