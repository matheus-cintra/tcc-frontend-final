import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Autosuggest from 'react-autosuggest';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 300px;
  height: 100%;
  margin: 0 0 25px 0;
`;

export const NoAutocompleteSuggestion = styled.div`
  display: block;
  position: absolute;
  margin-top: -7px;
  width: 655px;
  border: 1px solid #f0f0f0;
  background: #fff;
  font-family: Helvetica, sans-serif;
  font-weight: 300;
  font-size: 13px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 2;
  margin-left: 5px;
  cursor: pointer;
  padding: 10px 10px;
  transition: background 0.5s;

  &:hover {
    background: #f0f0f0;
  }
`;

export const InputContainer = styled.div`
  width: 100%;

  .react-autosuggest__container {
    position: relative;
    width: 100%;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    margin-top: -5px;
    width: 100%;
    border: 1px solid #f0f0f0;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 3;
    margin-left: 5px;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    transition: background 0.5s;

    background: #ddd;
  }

  input {
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    border: none;
    background: #f3f3f3;
  }

  span {
    font-size: 12px;
    margin-left: 10px;
    margin-top: 0;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  height: 60px;
  background: #333;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  svg {
    margin-right: 15px;
  }
`;

export const Title = styled.span`
  font-size: 18px;
  color: #fff;
  margin-left: 15px;
`;

export const Form = styled(Unform)`
  input {
    width: 250px;
  }

  fieldset {
    border: none;
  }
`;

export const BottomActions = styled.div`
  display: flex;
  height: 60px;
  background: #ccc;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  svg {
    margin-left: 15px;
    cursor: pointer;
  }

  button {
    min-width: 90px;
    padding: 10px;
    margin-right: 15px;
    background: ${props =>
      props.searching || props.submitting ? '#ccc' : '#333'};
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: ${props =>
      props.searching || props.submitting ? 'default' : 'pointer'};
  }
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  input {
    width: 100%;
  }

  label {
    align-self: center;
    margin-left: 25px;
  }
`;

export const SearchButton = styled.button.attrs({
  type: 'button',
})`
  border: none;
  background: transparent;
  padding: 4px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`;

export const SearchContainer = styled.div`
  display: flex;
  width: 41%;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    input {
      margin-left: 0;
    }

    button {
      margin-left: 5px;
    }
  }
`;

export const LoadingScreen = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  padding: 100px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const AutocompleteContainer = styled.div`
  /* display: flex;
  width: 100%;
  flex: 1;
  justify-content: center; */
`;

export const AutoCompleteResult = styled.span`
  /* font-size: 12px;
  margin-left: 10px;
  margin-top: 0;
  padding: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  width: 100%;
  z-index: 5;
  transition: background 0.5s; */

  /* cursor: pointer; */
  /* width: 100%;
  padding: 10px;
  background: #fff;
  transition: background 1s; */

  /* &:hover {
    background: #333;
  } */
`;

export const Autocomplete = styled(Autosuggest)``;

export const FloatingLabelInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  input {
    -webkit-appearance: none !important;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    border: none;
    background: #f3f3f3;
  }
`;

export const FloatingLabel = styled.label`
  display: inline-block;
  z-index: 2;
  position: absolute;
  transition: all 150ms ease-in;
  color: #9a9a9a;
  margin-left: 15px !important;
  cursor: text;

  transform: ${props => (props.active ? 'translateY(-17px)' : null)};
  font-size: ${props => (props.active ? '0.8em' : null)};
  color: ${props => (props.active ? '#9a9a9a' : null)};
  text-shadow: ${props =>
    props.active
      ? '1px 0 0 #fff, -1px 0 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff'
      : null};
`;

export const FloatLabelInput = styled.input`
  -webkit-appearance: none !important;
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  border: none;
  background: #f3f3f3;
  text-transform: uppercase;
`;

export const AttachmentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  width: 100%;
  height: 50px;
  border-radius: 5px;
  margin-top: 20px;

  span {
    margin-left: 30px;
    font-weight: 600;
    color: #9a9a9a;
  }

  img {
    width: 200px;
    height: 200px;
    max-width: 200px;
    max-height: 200px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 50%;
  }

  a {
    margin-left: 30px;
  }
`;

export const UploadImage = styled.button`
  margin-top: 10px;
  height: 40px;
  width: 150px;
  border: none;
  background-color: #455a64;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
`;

export const RemoveButton = styled.button`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 100px;
`;
