import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import AppHeader from '../components/AppHeader'
import styled from 'styled-components'
import Profil from '../components/Profil'
import ImgProfil from '../assets/profil.jpg'
import Badge from '../components/Badge'
import moment from 'moment'

const StyledContainer = styled.div`
  min-height: 100vh;
`

const StyledCard = styled.div`
  position: relative;
  height: 100%;
  margin: 8px; 
  aspect-ratio: 5/3;

  .content {
    position: absolute;
    color: var(--color-white);
    width: 90%;
    bottom: 10px;
    left: 20px;
    z-index: 2;
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

const Travel = (props) => {
  const { travelId } = useParams()
  const { data, error, loading } = useFetch(`/travel/${travelId}`)
  return (
    <StyledContainer>
      <AppHeader/>
          {
            data && data.name && (
              <StyledCard>
                <div className='content'>
                  <h2 className='name'>{data.name}</h2>
                  <p className='location'>{data.location.place_name}</p>
                  <div className='card-bottom'>
                    <div className='team'>
                    { data.team && data.team.teamComposition.map((travel, i) => (
                        <div  className='profil' key={i}>
                          <Profil small src={ImgProfil} alt=""></Profil>
                        </div>
                    ))}
                    </div>
                    <div className='badge'>
                      <Badge>Définir un budjet</Badge>
                      <Badge grey>{moment(data.startDate).format('DD/MM/YYYY')}</Badge>
                    </div>

                  </div>
                </div>
                <img className='background' src={data.picture} />
                </StyledCard>
            )
          }
    </StyledContainer>
  )
}

export default Travel