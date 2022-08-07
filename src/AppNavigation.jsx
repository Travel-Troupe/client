import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  matchPath,
} from 'react-router-dom';
import AppBottomBar from './components/AppBottomBar';
import TravelsList from './pages/TravelsList';
import styled from 'styled-components'
import appBackground from './utils/appBackground';
import indexBg from './assets/cover-home.jpg'
import TeamFunnel from './pages/TeamFunnel/TeamFunnel';
import CreateTeam from './pages/TeamFunnel/CreateTeam';
import JoinTeam from './pages/TeamFunnel/JoinTeam';
import TeamsList from './pages/TeamsList';
import Travel from './pages/Travel';
import TeamAvailability from './pages/TeamFunnel/TeamAvailability';
import TeamVoteResult from './pages/TeamFunnel/TeamVoteResult';
import TeamRecap from './pages/TeamFunnel/TeamRecap';
import TeamLeadInterface from './pages/TeamFunnel/TeamLeadInterface';

const StyledWrapper = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${({ bg }) => bg});
`;

const AppWrapper = (props) => {
  const location = useLocation()
  const path = Object.keys(appBackground)
    .find(pattern => matchPath(pattern, location.pathname))
  const bg = path ? appBackground[path] : indexBg
  
  return <StyledWrapper bg={bg} {...props} />
}

const AppView = styled.div`
  height: calc(100vh - 67px);
  overflow-y: scroll;
`

const AppNavigation = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <AppView>
          <Routes>
            <Route path="/" element={<TravelsList />} />
            <Route path="/teams" element={<TeamsList />} />

            {/* Team */}
            <Route path="team-funnel" element={<TeamFunnel />} />
            <Route path="team-funnel/create" element={<CreateTeam />} />
            <Route path="team-funnel/join" element={<JoinTeam />} />
            <Route path="team-funnel/availability/:teamId" element={<TeamAvailability />} />
            <Route path="team-funnel/votes/:teamId" element={<TeamVoteResult />} />
            <Route path="team-funnel/recap/:teamId" element={<TeamRecap />} />
            <Route path="team-funnel/validation/:teamId" element={<TeamLeadInterface />} />


            {/* Travel */}
            <Route path="travel/:travelId" element={<Travel />}/>
          </Routes>
        </AppView>
        <AppBottomBar />
      </AppWrapper>
    </BrowserRouter>
  )
}

export default AppNavigation