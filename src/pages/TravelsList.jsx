import React from 'react'
import useFetch from '../hooks/useFetch'

const TravelsList = () => {
  const { data, error, loading } = useFetch('/travel/all')
  return (
    <div>TravelsList</div>
  )
}

export default TravelsList