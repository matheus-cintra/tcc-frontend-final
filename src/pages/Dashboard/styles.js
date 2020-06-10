import styled from 'styled-components';

export const GraphContainer = styled.div`
  height: 430px;
  display: flex;
  justify-content: space-between;
  margin: 10px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    height: 100%;
  }
`;

export const Graph = styled.div`
  width: 100%;
  min-width: 210px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  text-align: center;

  flex-direction: column;

  &:first-child {
    margin-right: 10px;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 15px;
  border-radius: 5px;

  div {
    margin-top: 20px;
    margin-right: 40px;
  }

  @media screen and (max-width: 900px) {
    height: 100%;

    &:first-child {
      margin-bottom: 10px;
    }
  }
`;

export const BigGraph = styled.div`
  width: 100%;
  border-radius: 5px;
  min-width: 210px;
  flex-direction: column;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 15px;
  border-radius: 5px;

  div {
    margin-top: 20px;
    margin-right: 24px;
  }

  @media screen and (max-width: 900px) and (min-width: 400px) {
    height: 58%;
  }

  @media screen and (max-width: 400px) and (min-width: 375px) {
    height: 58%;
    /* margin-top: 70px; */
  }

  @media screen and (max-width: 400px) and (min-width: 375px) and (max-height: 750px) {
    height: 58%;
    margin-top: 70px;
  }

  @media screen and (max-width: 374px) and (min-width: 360px) {
    height: 58%;
    margin-top: 97px;
  }

  @media screen and (max-width: 359px) {
    height: 58%;
    margin-top: 169px;
  }
`;
