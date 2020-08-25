import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const DefaultList = styled.div``;

export const Toolbar = styled.div`
  background: #455a64;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ToolbarTitle = styled.div`
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

export const Scroll = styled(PerfectScrollbar)`
  max-height: calc(100vh - 170px);
  margin: 0 0 25px 0;
`;

export const List = styled.ul`
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
    }
  }
`;

export const SpanContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CodeInfo = styled.span`
  padding-right: 15px;
  font-weight: bold;
  font-size: 15px;
`;

export const TitleSubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 15px;
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;

  @media screen and (max-width: 500px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 68%;
    text-align: left;
  }

  @media screen and (max-width: 400px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 50%;
    text-align: left;
  }
`;

export const Subtitle = styled.span`
  font-size: 13px;
  color: #b3aaaa;

  @media screen and (max-width: 500px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 68%;
    text-align: left;
  }

  @media screen and (max-width: 400px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 50%;
    text-align: left;
  }
`;

export const RegisterSince = styled.span`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
