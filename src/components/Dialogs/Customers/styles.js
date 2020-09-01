import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const InputContainer = styled.div`
  width: 100%;

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
