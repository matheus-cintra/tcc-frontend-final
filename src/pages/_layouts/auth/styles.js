import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    width: 100px;
  }

  img:hover {
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: ${props => (props.submit ? `rotate(0deg)` : '')};
    }
    to {
      transform: ${props => (props.submit ? `rotate(359deg)` : '')};
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.2);
      }
    }

    button {
      margin: 0;
      height: 44px;
      background: #81d4fa;
      font-weight: bold;
      color: #000;
      border: 0;
      border-radius: 4px;
      transition: background 0.3s;

      &:hover {
        background: #29b6f6;
      }
    }

    a {
      margin-top: 10px;
      height: 44px;
      line-height: 44px;
      background: #c5e1a5;
      font-weight: bold;
      color: #000;
      border: 0;
      border-radius: 4px;
      transition: background 0.3s;

      &:hover {
        background: #9ccc65;
      }
    }
  }
`;
