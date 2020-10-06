import styled from 'styled-components';

export const ErrorMessage = styled.span`
  color: #f00;
  margin: -5px 0 5px 30px;
  display: block;

  @media screen and (max-width: 900px) {
    margin: -8px 0 10px 0;
  }
`;

export const FloatLabelInput = styled.input`
  -webkit-appearance: none !important;
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  border: none;
  background: #f3f3f3;
  text-transform: uppercase;
  font-size: 14px !important;
`;
