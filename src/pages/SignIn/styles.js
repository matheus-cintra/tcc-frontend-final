import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  input {
    width: 250px;
  }
`;

export const LoginContainer = styled.div`
  img {
    margin-bottom: 30px;
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
