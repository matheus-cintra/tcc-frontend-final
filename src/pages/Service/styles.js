import styled from 'styled-components';

export const Toolbar = styled.div`
  background: #455a64;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ServiceTitle = styled.span`
  display: flex;
  align-items: center;
  padding: 20px;

  font-weight: normal;
  font-size: 24px;
  color: #fff;

  button {
    display: flex;
    height: 30px;
    width: 30px;
    align-items: center;
    background: transparent;
    border: none;
    margin-left: 10px;
  }
`;

export const ServiceList = styled.ul`
  list-style: none;
  text-decoration: none;

  li {
    border: 1px solid #d3d3d3;
    border-bottom: none;

    &:last-child {
      border-bottom: 1px solid #333;
    }

    button {
      width: 100%;
      border: none;
      padding: 20px 20px 20px 40px;
      background: #e0e0e0;
      transition: background 0.3s;

      &:hover {
        background: #bdbdbd;
      }

      span {
        display: flex;
        font-size: 16px;
        font-weight: normal;
      }
    }
  }
`;
