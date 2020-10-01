import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Form as Unform } from '@unform/web';

export const Toolbar = styled.div`
  background: #455a64;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: calc(100vh - 170px);
  height: 100%;
  margin: 0 0 25px 0;
`;

export const DocumentList = styled.ul`
  list-style: none;
  text-decoration: none;
`;

export const ListButton = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: none;
  align-items: center;
  padding: 20px;
  background-color: ${props =>
    props.color === 'even' ? '#f3f0f0' : '#dedcdc'};
  transition: background 0.3s;

  &:hover {
    background: #bdbdbd;
  }
`;

export const DocumentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DocumentCode = styled.span`
  padding-right: 15px;
  font-weight: bold;
  font-size: 15px;
`;

export const DocumentTitleSubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 15px;
`;

export const DocumentTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;
  max-width: 550px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  text-align: left;

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

export const DocumentSubtitle = styled.span`
  font-size: 13px;
  max-width: 550px;
  color: #969696;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  text-align: left;

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

export const EmptyListContainer = styled.div`
  border: 1px solid #ccc;
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextNoDocuments = styled.span`
  font-size: 20px;
  color: #ccc;
`;

export const SearchForm = styled(Unform)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;

  div {
    padding-right: 10px;
  }

  input {
    padding: 10px;
    border: none;
    background: #f3f3f3;
    background-color: transparent;
    border-bottom: 0.8px solid #8e8b8b;
    color: #fff;

    ::placeholder {
      color: #ccc;
    }
  }
`;

export const ToolbarTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 10px;
`;

export const SearchButton = styled.button`
  display: flex;
  width: 30px;
  align-items: center;
  background: transparent;
  border: none;
`;

export const NewButton = styled.button`
  display: flex;
  height: 30px;
  width: 30px;
  align-items: center;
  background: transparent;
  border: none;
  margin-left: 10px;
`;

export const VerticalSeparator = styled.span`
  display: inline-block;
  border-left: 1px solid #ccc;
  margin: 0 10px;
  height: 35px;
`;

export const Title = styled.span`
  padding: 10px 10px 2px 20px;
  font-weight: normal;
  font-size: 24px;
  color: #fff;
`;

export const Subtitle = styled.span`
  padding-left: 20px;
  font-weight: normal;
  font-size: 10px;
  color: #fff;
`;

export const LoadingScreen = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #455a64;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
  padding: 60px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingContainer = styled.div`
  max-height: calc(100vh - 170px);
  height: 100%;
  margin: 0 0 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TextLoadingDocuments = styled.span`
  font-size: 16px;
  color: #455a64;
  margin-bottom: 15px;
  font-weight: 600;
`;
