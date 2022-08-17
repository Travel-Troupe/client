import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {voteForDate} from "../../services/Api";
import styled from 'styled-components'
import VotedDates from '../../components/VotedDates'
import {useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';

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
const StyledGreyButton = styled.button `
    background-color: var(--color-white);
    border-radius: 5px;
    color: white;
    padding: 8px 23px;
    text-align: center;
    -webkit-text-decoration: none;
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
    border: 2px solid var(--color-grey-black);
    color: var(--color-grey-black);
`

const StyledTitle = styled.h2`
  font-size: 0.875rem;
  color: var(--color-white);
  margin-top: 1.5rem;
  `

const StyledModalChoose = styled.div`
  margin-top: 1rem;
  display: flex;
`

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: var(--color-white);
  border: '2px solid #000';
  boxShadow: 24;
  padding: 2rem 1rem;
  text-align: center;
`
function compare( a, b ) {
  return a.votedBy.length > b.votedBy.length
}

const TeamVoteResult = () => {
  const { teamId } = useParams()
  const { data, error, loading, refetch } = useFetch(`/team/${teamId}`)
  const [finalVote, setFinalVote] = useState();
  const [listProposals, setlistProposal] = useState([]);
  const [open, setVisibilty] = useState(false)
  const navigateTo = useNavigate();

  const handleModal = () => {
    setVisibilty(!open)
  }

  const onSubmit = async (e) => {
    if(finalVote){
        e.preventDefault()
        const payload = {
          teamId,
          proposalId: finalVote
        }
        await voteForDate(payload)
        await refetch()
        navigateTo(`/team-funnel/recap/${teamId}`)
    }
  }

  const addVote = (proposalId) => {
    setFinalVote(proposalId);
  }

  const removeVote = (proposalId) => {
    setFinalVote(proposalId);
  }

  useEffect(() => {
    if(data && data.datesProposals && data.datesProposals.length > 0) {
      setlistProposal(data.datesProposals.sort(compare))
    } else {
      setlistProposal(data?.datesProposals)
    }
  }, [data])

  return (
    <>
      <StyledTitle> Sélectionner une date définitive : </StyledTitle>
      {data && data.datesProposals && data.datesProposals.length > 0 && listProposals && 
      listProposals.map((date, index) =>
          <VotedDates
            subtile={`${index+1}e`}
            startDate={date.startDate}
            endDate={date.endDate}
            addVote={addVote}
            removeVote={removeVote}
            proposalId={date._id}
            teamComposition={data.teamComposition}
            proposedBy={date.proposedBy}
          />
      )}
      <SubmitButton onClick={handleModal}>VALIDER</SubmitButton>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <StyledModal>
          <p> Voulez-vous valider cette date ? </p>
          <p>Ce choix sera définitif pour ce voyage </p>
          <StyledModalChoose>
            <SubmitButton onClick={onSubmit}>OUI</SubmitButton>
            <StyledGreyButton onClick={handleModal}>NON</StyledGreyButton>
          </StyledModalChoose>
        </StyledModal>
      </Modal>
    </>
  )
}

export default TeamVoteResult
