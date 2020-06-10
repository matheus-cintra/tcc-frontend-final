import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #fff;
  padding-left: 240px;

  @media screen and (max-width: 900px) {
    padding-left: 70px;
  }
`;

export const Container = styled.main`
  position: relative;
  height: 100vh;
  padding: 75px 10px 10px 10px;
`;
