import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 10px;
  height: 100%;
  justify-content: space-around;

  & > div {
    width: 250px;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

export const BillingTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 150px 0;
`;

export const ServiceOrderTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 150px 0;
`;
export const CustomerTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 150px 0;
`;
export const DocumentsTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 150px 0;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const BigNumber = styled.span`
  font-size: ${props => (props.size ? props.size : 35)}px;
  font-weight: 600;
  color: red;
`;
export const NormalText = styled.span`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;
