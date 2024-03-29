import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Toolbar = styled.div`
  background: #455a64;
  display: flex;
  justify-content: flex-start;
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
  height: ${props => (props.loading ? '60%' : null)};
  display: ${props => (props.loading ? 'flex' : null)};
  justify-content: ${props => (props.loading ? 'center' : null)};
  align-items: ${props => (props.loading ? 'center' : null)};
`;

export const Form = styled(Unform)`
  padding: 20px 10px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;

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

export const LoadingScreen = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #455a64;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
  padding: 60px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const CompanyImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  width: 250px;
  height: 215px;
  border-radius: 15px;
  margin-top: 20px;

  span {
    margin-bottom: 10px;
    font-weight: 600;
    color: #9a9a9a;
  }

  img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 50%;
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

export const LoadingContainer = styled.div`
  max-height: calc(100vh - 170px);
  height: 100%;
  margin: 0 0 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TextLoadingDocuments = styled.span`
  font-size: 16px;
  color: #455a64;
  margin-bottom: 15px;
  font-weight: 600;
`;

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
