import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Input from "./Input";

const StyledInputContainer = styled.div`
  position: relative;
  .autocomplete__list-container {
    display: none;
    position: absolute;
    list-style-type: none;
    width: 100%;
    top: 100%;
    padding: 0;
    margin: 4px 0 0;
    border: solid 1px #eee;
    border-radius: 3px;
    background-color: #fff;
  }

  .autocomplete__list-container li {
    line-height: 1.6;
    padding: 8px;
    cursor: pointer;
    border-bottom: solid 1px #eee;
  }

  .autocomplete__list-container li:last-child {
    border-bottom: none;
  }

  .autocomplete__list-container li:hover {
    background-color: var(--automplete-hover-bg, #eee);
  }

  .autocomplete__list-item--active,
  li.autocomplete__list-item--active:hover {
    background-color: var(--automplete-selected-bg, #aaa);
  }

`

const StyledInput = styled(Input)`
  &:focus + .autocomplete__list-container {
    display: block;
  }
`

export default function Autocomplete({
  suggestions = [],
  value = "",
  onSelect,
  onChange,
  shouldKeepFocusOnSelect = false,
  ...props
 }) {
  const [state, setState] = useState(value);
  const [selected, setSelected] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const found = suggestions.find((e) => e.value === inputRef.current.value);
      setSelected(found ?? null);
    }
  }, [suggestions, onSelect]);

  useEffect(() => {
    onSelect && onSelect(selected);
    shouldKeepFocusOnSelect && inputRef.current.focus();
  }, [selected, onChange, shouldKeepFocusOnSelect]);

  const onElementClick = (e, option) => {
    setSelected(option);
    setState(option.label);
  };

  const onInputChange = (e) => {
    setState(e.target.value);
    onChange && onChange(e)
  };

  return (
    <StyledInputContainer>
      <StyledInput
        onChange={onInputChange}
        value={state}
        ref={inputRef}
        {...props}
      />
      <ul className="autocomplete__list-container">
        {suggestions.length === 0 && <li>
          Choisir un lieu
        </li>}
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion?.key || index}
            onMouseDown={(e) => onElementClick(e, suggestion)}
            className={`${
              suggestion.label === state
                ? "autocomplete__list-item--active"
                : ""
            }`}
          >
            {suggestion.label}
          </li>
        ))}
      </ul>
    </StyledInputContainer>
  );
}
