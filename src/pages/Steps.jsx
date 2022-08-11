import React, {useEffect, useState, useRef, useMemo} from 'react';
import useFetch from "../hooks/useFetch";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import MapboxAutocomplete from "../components/MapboxAutocomplete";
import Label from "../components/label";
import Button from "../components/Button";
import Text from "../components/Text";
import getDays from "../utils/getDays";
import formatDate from "../utils/formatDate";
import {addStep} from "../services/Api";
import StepCard from "../components/StepCard";

const StyledAddStep = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 16px 32px;
  border: dotted 2px var(--color-grey);
  i {
    color: var(--color-green)
  }
  
  span {
    display: block;
    margin-left: 16px;
  }
`

const StyledModalContainer = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ visible }) => visible ? 'block' : 'none'};
`

const StyledModalContent = styled.form`
  position: relative;
  display: inline-block;
  width: 80%;
  padding: 24px;
  border-radius: 8px;
  background-color: var(--color-green);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledInput = styled(Input)`
  margin-bottom: 16px;
  font-family: sans-serif;
`

const StyledModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  color: var(--color-white);
`

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
`

const StyledDateCarousel = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: scroll;
  margin-bottom: 32px;
`

const StyledDateItem = styled.div`
  background-color: var(--color-white);
  padding: 12px;
  border-radius: 8px;
  margin: 0 4px;
  border: solid ${({selected}) => selected ? 'var(--color-green)' : 'var(--color-white)'} 2px;
  &:first-child {
    margin-left: 0;
  }
`

function formatDateApp(date) {
  return moment(date).format('YYYY-MM-DD');
}


const Steps = () => {
  const { travelId } = useParams()
  const { data, error, loading, refetch } = useFetch(`/travel/${travelId}`)

  const [destination, setDestination] = useState();
  const [visible, setVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [dates, setDates] = useState([])
  const nameInput = useRef()
  const descriptionInput = useRef()


  const onContentClick = (e) => {
    e.stopPropagation()
  }

  const onOverlayClick = (e) => {
    setVisible(false)
  }

  const onDestinationChange = (e) => {
    setDestination(e)
  }

  const onSelectDate = (e) => {
    setSelectedDate(dates[e])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      travelId,
      name: nameInput.current.value,
      description: descriptionInput.current.value,
      startDate: selectedDate,
      address: destination.locationPoi
    }

    const res = await addStep(payload)
    await refetch()
    setVisible(false)
  }

  useEffect(() => {
    if (
      data &&
      data.team &&
      data.team.validatedEndDate &&
      data.team.validatedStartDate
    ) {
      const { validatedStartDate: startDate, validatedEndDate: endDate } = data.team;
      // prevent infinite loop
      if (new Date(endDate) > new Date(startDate)) {
        const everyDates = getDays(startDate, endDate)
        setDates(everyDates)
        !selectedDate && setSelectedDate(everyDates[0])
      }
    }
  }, [data]);

  const hasSteps = !!data && data.steps

  const filteredSteps = useMemo(() => {
    return data ? data.steps.filter(step => formatDate(step.date) === formatDate(selectedDate)) : []
  }, [data, selectedDate]);


  return (
    <>
      <div>
        <StyledDateCarousel>
          {dates && dates.length && dates.map((d, i) =>
            <StyledDateItem
              selected={selectedDate === d}
              onClick={() => onSelectDate(i)}
              key={d.toString()}
            >
              {formatDate(d)}
            </StyledDateItem>
          )}
        </StyledDateCarousel>
        {hasSteps && filteredSteps.map((step) => (
          <StepCard key={step._id} as={Link} to={`/travel/${travelId}/steps/${step._id}`} {...step} />
        ))}
        <StyledAddStep onClick={() => setVisible(c => !c)}>
          <i className="gg-add" />
          <span>Ajouter une nouvelle activité</span>
        </StyledAddStep>
      </div>
      <StyledModalContainer visible={visible} onClick={onOverlayClick}>
        {visible && <StyledModalContent onSubmit={onSubmit} onClick={onContentClick}>
          <StyledModalHeader>
            <Text>Ajouter une activité</Text>
            <i className="gg-close" onClick={() => setVisible(false)}/>
          </StyledModalHeader>
          <StyledInput ref={nameInput} placeholder="Choisissez un intitulé…"/>
          <MapboxAutocomplete as={StyledInput} placeholder="Lieu" onChange={onDestinationChange}/>
          <Label>Ajouter un rappel</Label>
          <StyledInput ref={descriptionInput} as={"textarea"} placeholder={"Description"}/>
          <StyledButton primary type="submit" secondary>Valider</StyledButton>
        </StyledModalContent>}
      </StyledModalContainer>
    </>
  );
};

export default Steps;
