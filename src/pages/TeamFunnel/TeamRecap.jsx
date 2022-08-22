import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import img from '../../assets/profil.jpg'
import {useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getItem } from "../../utils/AppStorage";
import getUserAvatar from '../../utils/getUserAvatar';

const StyledTSubitle = styled.p`
  font-size: 0.675rem;
  color: var(--color-white);
  margin-top: .5rem;
  `

const StyledTag = styled.div `
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: var(--color-white);
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    p {
      color: var(--color-black);
    }
`
const StyledMembersList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  img {
    width: 28px;
    height: 28px;
    margin-right: .5rem;
    border-radius: 13px;
  }
`;

const StyledRecap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1.5rem;
  height: 100%;
`

const StyledValidedButton = styled.button `
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
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  display: block;
`

function compare( a, b ) {
  if ( a.votedBy < b.votedBy ){
    return -1;
  }
  if ( a.votedBy > b.votedBy ){
    return 1;
  }
  return 0;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const TeamRecap = () => {
  const { teamId } = useParams()
  const { data, error, loading, refetch } = useFetch(`/team/${teamId}`)
  const [favoriteDate, setfavoriteDate] = useState({});
  const [isLeader, setIsLeader] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    if(data && data?.validatedStartDate && data?.validatedEndDate){
      setfavoriteDate({
        startDate: data.validatedStartDate,
        endDate: data.validatedEndDate,
      })
    } else if(data && data?.datesProposals && data?.datesProposals.length > 0) {
      let sortedList = data.datesProposals.sort(compare)
      setfavoriteDate({
        startDate: sortedList[0].startDate,
        endDate: sortedList[0].endDate,
      })
    }

    if (getItem('user')?.id == data?.owner){
      setIsLeader(true)
    }
  }, [data])


  const onSubmit = () => {
    navigateTo(`/team-funnel/validation/${teamId}`)
  }

  return (
    <StyledRecap>
      <StyledTSubitle>La date favorite de votre troupe est le : </StyledTSubitle>
      <StyledMembersList> 
        {data && data?.teamComposition && data.teamComposition.length > 0 && (
          data.teamComposition.map(member => (
            <img src={member.name ? getUserAvatar(member) : img} alt="" />
          ))
        )}
      </StyledMembersList >
      <StyledTag>
        <p>{formatDate(favoriteDate.startDate)} - {formatDate(favoriteDate.endDate)}</p>
      </StyledTag>
      {
        isLeader && (
          <StyledValidedButton onClick={onSubmit}>VALIDER LA DATE</StyledValidedButton>
        )
      }
    </StyledRecap>
  )
}

export default TeamRecap
