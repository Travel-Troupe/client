import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import useFetch from '../../hooks/useFetch'


const CreateTeam = () => {
  const [state, setState] = useState('')
  const { data, error, loading, refetch } = useFetch('/team/add', {
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
      <div>CreateTeam</div>
      {hasData && (
        <div>
          <Input value={data.slug} disabled />
          <Button secondary>Partager mon identifiant de team</Button>
          <Button as={Link} to="/">Créer un voyage</Button>
          <Button as={Link} to="/">Créer un voyage</Button>
        </div>
      )}
      {!hasData && (
        <form onSubmit={onSubmit}>
          <Input onChange={e => setState(e.target.value)} />
          <Button type="submit">ok</Button>
        </form>
      )}
    </div>
  )
}

export default CreateTeam