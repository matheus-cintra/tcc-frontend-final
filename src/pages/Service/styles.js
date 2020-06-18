import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
      display: flex;
      justify-content: space-between;
      width: 100%;
      border: none;
      align-items: center;
      padding: 20px;
      background: #e0e0e0;
      transition: background 0.3s;

      &:hover {
        background: #bdbdbd;
      }

      span {
        display: flex;
        font-size: 16px;
        font-weight: normal;

        &:first-child {
          margin: 0 15px;
        }

        &:last-child {
          margin-right: 15px;
        }
      }
    }
  }
`;

export const SpanContainer = styled.div`
  span {
    display: flex;
    font-size: 16px;
    font-weight: normal;

    &:first-child {
      margin: 0 15px;
    }

    &:last-child {
      margin-left: 79px;
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 800px;
  margin: 0 0 25px 0;
`;
