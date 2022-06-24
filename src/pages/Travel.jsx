import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const Travel = (props) => {
  const { travelId } = useParams()
  const { data, error, loading } = useFetch(`/travel/${travelId}`)
  console.log(data)
  return (
    <div>
      <h3>Travel</h3>
      {
        data && data.name && (
          <div>
            <img src={data.picture} />
          </div>
        )
      }
    </div>
  )
}

export default Travel