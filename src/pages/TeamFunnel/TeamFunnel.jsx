import React from 'react'
import { Link } from 'react-router-dom'

const TeamFunnel = () => {
  return (
    <div>
      <Link to={'/team-funnel/create'}>Créer une troupe</Link>
      <Link to={'/team-funnel/join'}>Rejoindre une troupe</Link>
    </div>
  )
}

export default TeamFunnel