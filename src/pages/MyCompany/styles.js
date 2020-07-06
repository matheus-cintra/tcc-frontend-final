import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Toolbar = styled.div`
  background: #455a64;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ToolbarTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  font-weight: normal;
  font-size: 24px;
  color: #fff;
`;

export const Container = styled.main`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const Form = styled(Unform)`
  padding: 20px 10px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;

  &:last-child {
    justify-content: space-between;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 0;

    div {
      width: 100%;
    }
  }

  input {
    width: ${props => (props.width ? props.width : '100')}%;
    margin: 5px;
    height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
  }
`;

export const Divider = styled.div`
  border: none;
  border-bottom: 1px solid #ccc;
  margin-top: 30px;
  width: 95%;
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  margin: 30px 30px 0 0;
  width: 150px;
  height: 40px;
  border: none;
  background: #ff3d00;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  transition: background 0.4s;

  &:hover {
    background: #ff0000;
  }

  @media screen and (max-width: 768px) {
    margin: 30px 0 0 0;
  }
`;

export const SearchButton = styled.button.attrs({
  type: 'button',
})`
  border: none;
  background: transparent;
  padding: 4px;
`;

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
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
