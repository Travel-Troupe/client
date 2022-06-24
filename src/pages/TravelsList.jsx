import React from 'react'
import Card from '../components/Card'
import useFetch from '../hooks/useFetch'
import styled from 'styled-components'
import AppHeader from '../components/AppHeader'

const StyledContainer = styled.div`
  min-height: 100vh;
`

const StyledContent = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
`

const TravelsList = () => {
  const { data, error, loading } = useFetch('/travel/all')
  return (
    <StyledContainer>
      <AppHeader></AppHeader>
      <StyledContent>
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
      </StyledContent>
    </StyledContainer>
  )
}

export default TravelsList