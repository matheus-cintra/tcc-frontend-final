import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@mdi/react';
import {
  Toolbar,
  ToolbarTitle,
  Scroll,
  List,
  SpanContainer,
  CodeInfo,
  TitleSubtitleContainer,
  Title,
  Subtitle,
} from './styles';

function DefaultList(props) {
  const {
    title,
    handleOpen,
    toolbarIcon,
    iconTitle,
    working,
    itemList,
    companyIcon,
    personIcon,
  } = props;

  return (
    <>
      <Toolbar>
        <ToolbarTitle>
          {title}
          <button type="button" onClick={handleOpen}>
            <Icon
              path={toolbarIcon}
              title={iconTitle}
              size="30px"
              color="#fff"
            />
          </button>
        </ToolbarTitle>
      </Toolbar>
      {!working && itemList && itemList.length > 0 ? (
        <Scroll>
          <List>
            {itemList.map(item => (
              <li key={item._id}>
                <button type="button" onClick={() => handleOpen(item)}>
                  <SpanContainer>
                    <CodeInfo>{item.code}</CodeInfo>
                    <Icon
                      path={item.cnpj ? companyIcon : personIcon}
                      title={iconTitle}
                      size="30px"
                      color="#333"
                    />
                    <TitleSubtitleContainer>
                      <Title>{item.name}</Title>
                      <Subtitle>{item.description}</Subtitle>
                    </TitleSubtitleContainer>
                  </SpanContainer>
                  {item.formatedPrice ? (
                    <span>R$ {item.formatedPrice}</span>
                  ) : null}
                </button>
              </li>
            ))}
          </List>
        </Scroll>
      ) : null}
    </>
  );
}

export default DefaultList;

DefaultList.propTypes = {
  title: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  toolbarIcon: PropTypes.string.isRequired,
  iconTitle: PropTypes.string.isRequired,
  working: PropTypes.bool.isRequired,
  itemList: PropTypes.arrayOf(PropTypes.object).isRequired,
  companyIcon: PropTypes.string.isRequired,
  personIcon: PropTypes.string.isRequired,
};

// <span>{item.code}</span>
//                     <span> - {item.name}</span>
//                     <span>{item.description}</span>
