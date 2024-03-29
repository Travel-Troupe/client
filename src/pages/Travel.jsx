import React from 'react'
import {Link, useParams} from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import AppHeader from '../components/AppHeader'
import styled from 'styled-components'
import Profil from '../components/Profil'
import CardSm from '../components/CardSm'
import ImgProfil from '../assets/profil.jpg'
import Badge from '../components/Badge'
import formatDate from "../utils/formatDate";
import getUserAvatar from '../utils/getUserAvatar'
import ImgTask from '../assets/tasks.svg'
import ImgDoc from '../assets/documents.svg'
import ImgStep from '../assets/step.svg'
import ImgBudget from '../assets/budgets.svg'

const StyledContainer = styled.div`
  min-height: 100%;
`

const StyledCard = styled.div`
  position: relative;
  height: 100%;
  margin: 16px 0px 8px; 
  aspect-ratio: 5/3;

  .content {
    position: absolute;
    color: var(--color-white);
    width: 90%;
    bottom: 10px;
    left: 20px;
    z-index: 2;
  }

  .flex {
    display: flex;
  }

  .name {
    font-size: 20px;
  }

  .location {
    margin-top: 5px;
    font-size: 10px;
  }

  .team {
    margin-top: 15px;
    display: flex;
  }

  .profil {
    margin-right: 5px;
  }

  .background {
    position: absolute;
    filter: grayscale(20%);
    top: 0;
    left: 0;
    border-radius: 6px;
    width: 100%;
    height: 100%;
  }

  .badge {
    display: flex;
  }

  .card-bottom {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: end;
  }
`

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Travel = (props) => {
  const { travelId } = useParams()
  const { data, error, loading } = useFetch(`/travel/${travelId}`)
  return (
    <StyledContainer>
    {
      data && data.name && (
        <>
          <AppHeader title={data.name} subtitle={''}/>
          <StyledCard>
            <div className='content'>
              <h2 className='name'>{data.name}</h2>
              <p className='location'>{data.location.place_name}</p>
              <div className='card-bottom'>
                <div className='team'>
                { data.team && data.team.teamComposition.map((user, i) => (
                    <div  className='profil' key={i}>
                      <Profil small src={getUserAvatar(user)} alt=""></Profil>
                    </div>
                ))}
                </div>
                <div className='badge'>
                  <Badge>Définir un budjet</Badge>
                  <Badge grey>{formatDate(new Date(data.startDate))}</Badge>
                </div>
              </div>
            </div>
            <img className='background' src={data.picture} />
          </StyledCard>
        </>
        )
    }
      <Flex>
          <CardSm icon={ImgTask}>Tâches</CardSm>
          <CardSm icon={ImgDoc}>Documents</CardSm>
          <CardSm
            as={Link}
            to={`/travel/${travelId}/steps`}
            icon={ImgStep}
          >
            Étapes clés
          </CardSm>
          <CardSm icon={ImgBudget}>Budget</CardSm>

      </Flex>
    </StyledContainer>
  )
}

export default Travel
