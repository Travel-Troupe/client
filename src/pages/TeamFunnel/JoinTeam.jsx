import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import useFetch from '../../hooks/useFetch'

const JoinTeam = () => {
  const [state, setState] = useState('')
  const { data, error, loading, refetch } = useFetch('/team/join', {
    method: 'POST', 
    body: JSON.stringify({ slug: state })
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

  const hasData = data && data?.message

  return (
    <div>
      <div>JoinTeam</div>
      {hasData && (
        <div>
          <p>bravo vous avez bien rejoins la team lol</p>
          <Button as={Link} to="/">Voir mes voyages</Button>
        </div>
      )}
      {!hasData && (
        <form onSubmit={onSubmit}>
          <Input onChange={e => setState(e.target.value)} />
          <Button type="submit">Rejoindre</Button>
        </form>
      )}
    </div>
  )
}

export default JoinTeam