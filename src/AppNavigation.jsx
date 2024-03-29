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
import Destination from "./pages/TravelFunnel/Destination";
import Team from "./pages/TravelFunnel/Team";
import Steps from "./pages/Steps";
import Step from "./pages/Step";
import TeamAvailability from './pages/TeamFunnel/TeamAvailability';
import TeamVoteResult from './pages/TeamFunnel/TeamVoteResult';
import TeamRecap from './pages/TeamFunnel/TeamRecap';
import TeamLeadInterface from './pages/TeamFunnel/TeamLeadInterface';
import Settings from './pages/Settings';

const StyledWrapper = styled.div`
  height: 100%;
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
  height: 100%;
  padding: 30px 20px 67px 20px;
  overflow-y: scroll;
`

const AppNavigation = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <AppView>
          <Routes>
            <Route path="/" element={<TravelsList />} />
            <Route path="/teams" element={<Team />} />
            <Route path="/settings" element={<Settings />} />

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
            <Route path="travel/:travelId/steps" element={<Steps />}/>
            <Route path="travel/:travelId/steps/:stepId" element={<Step />}/>
            {/* Travel Funnel */}
            <Route path="travel/create-travel" element={<Team />}/>
            <Route path="travel/create-travel/destination/:teamId" element={<Destination />}/>
          </Routes>
        </AppView>
        <AppBottomBar />
      </AppWrapper>
    </BrowserRouter>
  )
}

export default AppNavigation