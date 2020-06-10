import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const ErrorMessage = styled.span`
  color: #f00;
  margin: -5px 0 5px 30px;
  display: block;

  @media screen and (max-width: 900px) {
    margin: -8px 0 10px 0;
  }
`;
