import styled from 'styled-components';

export const ErrorMessage = styled.span`
  color: #f00;
  margin: -5px 0 5px 30px;
  display: block;

  @media screen and (max-width: 900px) {
    margin: -8px 0 10px 0;
  }
`;

export const TextArea = styled.textarea`
  font: 14px 'Roboto', sans-serif;
  padding: 10px;
  /* margin: 5px 5px 5px 10px; */
  /* margin-left: 5px; */
  margin: 5px 0 0 5px;
  border-radius: 4px;
  border: none;
  background: #f3f3f3;
  width: 100%;
  font-size: 14px;
  resize: none;
`;
