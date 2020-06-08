import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const InputContainer = styled.div`
  display: unset;
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
`;

export const LogoContainer = styled.div`
  display: flex;

  img {
    margin-left: 25px;
  }
`;
