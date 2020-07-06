import styled from 'styled-components';

export const DefaultInput = styled.input`
  width: 100%;
  margin: 5px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
`;

export const ErrorMessage = styled.span`
  color: #f00;
  margin: -5px 0 5px 30px;
  display: block;

  @media screen and (max-width: 900px) {
    margin: -8px 0 10px 0;
  }
`;
