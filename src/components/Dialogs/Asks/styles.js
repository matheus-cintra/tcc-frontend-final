import styled from 'styled-components';

export const Toolbar = styled.div`
  display: flex;
  height: 60px;
  background: #333;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  svg {
    margin-right: 15px;
    cursor: pointer;
  }
`;

export const Title = styled.span`
  font-size: 18px;
  color: #fff;
  margin-left: 15px;
`;

export const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const AskText = styled.span`
  font-size: 18px;
  text-align: center;
  padding: 30px;
`;

export const BottomActions = styled.div`
  display: flex;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  svg {
    margin-left: 15px;
    cursor: pointer;
  }

  button {
    min-width: 90px;
    padding: 10px;
    margin-right: 15px;
    background: #ececec;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: ${props => (props.submitting ? 'default' : 'pointer')};
  }
`;
