import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 3px;
    vertical-align: middle;
  }
`;

export const Form = styled(Unform)`
  input {
    width: 250px;
  }

  button {
    width: 250px;
    align-self: flex-end;
  }

  @media screen and (max-width: 800px) {
    margin-top: 30px;

    button {
      width: 100%;
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;

  img {
    margin-right: 30px;
  }

  @media screen and (max-width: 800px) {
    img {
      margin-right: 0px;
    }
  }
`;
