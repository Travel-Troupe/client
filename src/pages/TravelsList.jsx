import React from 'react'
import Card from '../components/Card'
import useFetch from '../hooks/useFetch'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`

const TravelsList = () => {
  const { data, error, loading } = useFetch('/travel/all')
  return (
    <StyledContainer>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </StyledContainer>
  )
}

export default TravelsList