import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import useFetch from '../../hooks/useFetch'


const CreateTeam = () => {
  const [state, setState] = useState('')
  const { data, error, loading, refetch } = useFetch('/travel/add', {
    method: 'POST', 
    body: JSON.stringify({ name: state })
  }, [state], false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!!state && state.length > 3) {
      try {
        await refetch()
      } catch(e) {
        console.error(e)
      }
    }
  }

  const hasData = data && data?.name

  return (
    <div>
      <div>TO DO</div>
    </div>
  )
}

export default CreateTeam