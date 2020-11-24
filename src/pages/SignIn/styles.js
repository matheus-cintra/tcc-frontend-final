import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  input {
    width: 250px;
  }

  fieldset {
    border: none;
  }
`;

export const LoginContainer = styled.div`
  img {
    margin-bottom: 30px;
  }

  fieldset {
    border: none;
  }
`;

export const RegisterContainer = styled.div`
  width: 300px;
  justify-content: center;
  align-items: center;
  display: flex;

  h2 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    margin-top: 20px;
  }

  @media screen and (max-width: 800px) {
    margin-top: 60px;
  }
`;

export const LoadingContainer = styled.div`
  max-height: calc(100vh - 170px);
  height: 260px;
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
