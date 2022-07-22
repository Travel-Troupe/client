import debounce from 'lodash.debounce'
import React, { useCallback, useState } from 'react'
import Autocomplete from "./Autocomplete";
import { API_URL } from "../utils/constants";
import { getItem } from "../utils/AppStorage";

const fetchData = async ({searchText, locationTypes}) => {
  try {
    const token = (await getItem('token')) || ''

    const req = await fetch(
      `${API_URL}/search`,
      {
        method: 'POST',
        headers: new Headers(token ? {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } : {}),
        body: JSON.stringify({ searchText, locationTypes }),
      }
    )
      return await req.json()
  } catch(e) {
    console.error(e)
  }
}

const MapboxAutocomplete = ({ locationTypes, onChange: onValueChange, value }) => {
  const [result, setResult] = useState([])

  const onChange = useCallback((e) => {
    if (e.target.value) {
      fetchData({ searchText: e.target.value, locationTypes }).then(res => {
        (res && res?.features) ? setResult(res.features.map(({ place_name, id }) => ({
          value: place_name,
          label: place_name,
          locationPoi: id
        }))) : setResult([])
      })
    } else {
      setResult([])
    }
  }, [locationTypes])


  const debouncedChangeHandler = useCallback(debounce((e) => onChange(e), 1000)
  , []);

  return (
    <Autocomplete
      onChange={debouncedChangeHandler}
      value={value}
      onSelect={onValueChange}
      suggestions={result}
    />
  )
}

export default MapboxAutocomplete
