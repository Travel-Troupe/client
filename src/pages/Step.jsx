import React, {useEffect, useMemo, useState} from 'react';
import StepCard from "../components/StepCard";
import {useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Mapbox from "../components/Mapbox";
import detectDevice from "../utils/detectDevice";
import Button from "../components/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  margin-top: 8px;
`

const Step = () => {
  const { travelId, stepId } = useParams()
  const { data } = useFetch(`/travel/${travelId}`)
  const [prefix, setPrefix] = useState('');

  const step = useMemo(() => {
    return data ? data.steps.find(step => step._id === stepId) : {}
  }, [data]);

  useEffect(() => {
    const ua = detectDevice();
    // eslint-disable-next-line no-nested-ternary
    const link = ua === 'Android' ? 'https://maps.google.com/?q=' : ua === 'iOS' ? '//maps.apple.com/?q=' : 'https://maps.google.com/?q=';
    setPrefix(link);
  }, []);

  const hasData = step && step.name
  return (
    hasData ? (
      <div>
        <StepCard {...step} />
        <Mapbox
          coordinates={[
            step.address.geometry.coordinates
          ]}
          center={step.address.geometry.coordinates}
        />
        <StyledButton
          onClick={
            () => {
              window.open(`${prefix}${step.address.geometry.coordinates.reverse().join(',')}&dir_action=navigate`); }
          }
        >Voir l'itinéraire</StyledButton>
      </div>
    ) : null
  );
};

export default Step;
