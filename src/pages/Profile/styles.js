import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  height: 100%;
  padding: 30px;

  @media screen and (max-width: 1100px) {
    height: calc(100vh + 470px);
    padding: 15px;
  }

  @media screen and (max-width: 360px) {
    height: calc(100vh + 800px);
    padding: 15px;
  }
`;

// CONTINUAR RESPONSIVIDADE DAQUI

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }

  @media screen and (max-width: 720px) {
    min-width: 550px;
  }

  @media screen and (max-width: 360px) {
    min-width: 300px;
  }
`;

export const ProfileImage = styled.div`
  @media screen and (max-width: 1100px) {
    padding-top: 20px;
  }
`;

export const UploadImage = styled.button`
  margin-top: 10px;
  height: 40px;
  width: 150px;
  border: none;
  background-color: #455a64;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
`;

export const Row = styled.div`
  width: 500px;
  margin-top: 20px;
`;

export const ProfileInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 30px;
  height: calc(100% - 350px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    height: initial;
  }

  @media screen and (max-width: 720px) {
    min-width: 550px;

    @media screen and (max-width: 360px) {
    min-width: 300px;
  }
`;

export const DBSize = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media screen and (max-width: 360px) {
    width: 250px;
  }
`;

export const QtyAttachedValue = styled.span`
  display: block;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
`;

export const SizeAttached = styled.span`
  display: block;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
`;

export const LastLoginPosition = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media screen and (max-width: 360px) {
    width: 250px;
  }
`;

export const LastLoginLat = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const LastLoginLong = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const LastLoginCity = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const LastLoginISP = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const RemoveButton = styled.button`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 100px;
`;

export const Image = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-width: 200px;
    max-height: 200px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 50%;
  }
`;

export const FormContainer = styled(Unform)`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 720px) {
    & > div {
      width: 250px;
      text-align: center;
    }
  }
`;

export const DBUsageTitle = styled.span`
  display: block;
  padding: 20px;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-weight: bold;
`;

export const LastLoginTitle = styled.span`
  display: block;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  text-align: center;
`;

export const QtyTitle = styled.span`
  padding: 5px;
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const TitleContainer = styled.div``;

export const ContentContainer = styled.div`
  padding: 15px;
  height: calc(100% - 62px);
  background: #455a64;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LatTitle = styled.span`
  padding: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const LongTitle = styled.span`
  padding: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const CityTytle = styled.span`
  padding: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const StateTitle = styled.span`
  padding: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  margin: 30px 30px 0 0;
  width: 150px;
  height: 40px;
  border: none;
  background: #ff3d00;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  transition: background 0.4s;

  &:hover {
    background: #ff0000;
  }

  @media screen and (max-width: 768px) {
    margin: 30px 0 0 0;
  }
`;

export const LoadingScreen = styled.div`
  border: ${props =>
    props.padding
      ? `${props.padding}px solid  #f3f3f3`
      : '16px solid #f3f3f3'}; /* Light grey */
  border-top: ${props =>
    props.padding
      ? `${props.padding}px solid  #3498db`
      : '16px solid #3498db'}; /* Blue */
  border-radius: 50%;
  width: ${props => (props.width ? props.width : '120px')};
  height: ${props => (props.height ? props.height : '120px')};
  animation: spin 2s linear infinite;
  padding: ${props =>
    props.totalPadding ? `${props.totalPadding}px` : '100px'};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
