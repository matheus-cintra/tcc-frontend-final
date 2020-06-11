import styled from 'styled-components';

const sizes = {
  desktop: '240px',
  tablet: '90px',
  smartphone: '230px',
};

export const Container = styled.nav`
  background: #455a64;
  height: 100%;
  width: ${sizes.desktop};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  outline: none;
  box-shadow: 4px 0px 8px -4px rgba(0, 0, 0, 0.23),
    6px 0 6px rgba(0, 0, 0, 0.23);

  header {
    background: rgba(0, 0, 0, 0.1);
    padding: 2em 0.5em;
    text-align: center;

    img {
      width: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #333;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    h2 {
      font-weight: normal;
      margin-bottom: 0;
      margin-top: 15px;
      color: #fff;
    }
  }

  ul {
    list-style: none;
    padding: 0.5em 0;
    margin: 0;

    li {
      font-size: 1em;
      font-weight: regular;
      background-repeat: no-repeat;
      background-position: left 15px center;
      background-size: auto 20px;
      transition: all 0.3s linear;
      cursor: pointer;

      a {
        display: flex;
        align-items: center;
        padding: 0.5rem 4.45rem;
        color: #fff;

        span {
          display: inline;
          align-items: center;
        }

        svg {
          margin-right: 5px;
        }
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }

      &:focus {
        outline: none;
      }

      .active {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  @media screen and (max-width: 900px) {
    width: calc(${sizes.tablet} - 20px);

    header {
      padding: 0.5em;
      position: relative;
      img {
        width: calc(${sizes.tablet} - 50px);
      }

      h2 {
        display: none;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: calc(${sizes.table} + 10px);
        margin: 0;
        min-width: 200px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.4);
        transform: translate3d(-30%, 0, 0);
        transition: all 0.15s ease-in-out;
      }
    }

    ul {
      li {
        a {
          height: 60px;
          background-position: center center;
          background-size: 30px auto;
          position: relative;
          padding: 0;
          display: flex;
          justify-content: center;

          span {
            display: block;
            opacity: 0;
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            padding: 0.2em 0.5em;
            border-radius: 4px;
            top: 80%;
            transform: translate3d(-15px, -50%, 0);
            transition: all 0.15s ease-in-out;

            &::before {
              display: inline;
              opacity: 1;
              content: '';
              position: absolute;
              top: 50%;
              left: -5px;
              border-top: 5px solid transparent;
              border-bottom: 5px solid transparent;
              border-right: 5px solid rgba(0, 0, 0, 0.5);
              transform: translateY(-50%);
            }
          }
        }

        &:hover {
          span {
            opacity: 1;
            transform: translate3d(0px, -50%, 0);
          }
        }
      }
    }
  }
`;
