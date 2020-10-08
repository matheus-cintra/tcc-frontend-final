import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: calc(100vw - 240px); /* Full width */
  z-index: 10;
  min-width: 350px;

  background: #fff;
  padding: 0 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  @media screen and (max-width: 900px) {
    width: calc(100vw - 70px); /* Full width */
    /* padding: 0 5px; */
  }
`;

export const Content = styled.div`
  height: 64px;
  max-width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  align-items: center;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  img {
    height: 48px;
    width: 48px;
    max-width: 48px;
    max-height: 48px;
    border-radius: 50%;
  }
`;
