import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@mdi/react';
import {
  Toolbar,
  ToolbarTitle,
  Scroll,
  List,
  SpanContainer,
} from '../../components/DefaultList/styles';

function ServiceOrderList(props) {
  const {
    title,
    handleOpen,
    toolbarIcon,
    iconTitle,
    working,
    itemList,
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
                    <span>
                      <button type="button"> Dar Baixa</button>
                    </span>
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

export default ServiceOrderList;

ServiceOrderList.propTypes = {
  title: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  toolbarIcon: PropTypes.string.isRequired,
  iconTitle: PropTypes.string.isRequired,
  working: PropTypes.bool.isRequired,
  itemList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
