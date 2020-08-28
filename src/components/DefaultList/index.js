import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from '@mdi/react';
import { mdiFile, mdiMagnify } from '@mdi/js';
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
  RegisterSince,
  EmptyListContainer,
  Text,
  SearchForm,
} from './styles';

import DefaultInput from '../DefaultInput/Input';

function DefaultList(props) {
  const {
    title,
    handleOpen,
    toolbarIcon,
    iconTitle,
    working,
    itemList,
    itemCount,
    decorator,
  } = props;

  const formRef = useRef();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(itemList);
  }, [itemList]);

  const handleLoadMore = async () => {
    if (list.length === itemCount) return;
    const result = await decorator.getRegisters('15', list.length);
    setList([...list, ...result.docs]);
  };

  const handleSearch = async data => {
    const { searchContent } = data;
    let result;
    if (searchContent === '') {
      result = await decorator.getRegisters('15');
    } else {
      result = await decorator.getRegistersBySearch(searchContent);
    }

    setList(result.docs);
  };

  return (
    <>
      <Toolbar>
        <ToolbarTitle>
          <SearchForm ref={formRef} onSubmit={handleSearch}>
            <DefaultInput name="searchContent" placeholder="Busca..." />
            <button type="submit">
              <Icon
                path={mdiMagnify}
                title="Buscar"
                size={1.4}
                color="#FFF"
                style={{ cursor: 'pointer' }}
              />
            </button>
          </SearchForm>

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
      {!working && list && list.length > 0 ? (
        <Scroll
          options={{ suppressScrollX: true }}
          onYReachEnd={handleLoadMore}
        >
          <List>
            {list.map(item => (
              <li key={item._id}>
                <button type="button" onClick={() => handleOpen(item)}>
                  <SpanContainer>
                    <CodeInfo>{item.code}</CodeInfo>
                    <Icon
                      path={item.icon}
                      title={item.subtitle}
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
                  ) : (
                    <RegisterSince>{item.registerSince}</RegisterSince>
                  )}
                </button>
              </li>
            ))}
          </List>
        </Scroll>
      ) : (
        <EmptyListContainer>
          <Icon path={mdiFile} size={6} color="#CCC" />
          <Text>Nenhum Documento</Text>
        </EmptyListContainer>
      )}
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
  decorator: PropTypes.objectOf(PropTypes.func).isRequired,
  itemCount: PropTypes.number.isRequired,
};
