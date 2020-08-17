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
    font-size: 11px;
    margin-left: 15px;
    margin-top: -5px;
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
    cursor: pointer;
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
    background: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
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
