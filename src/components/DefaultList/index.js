import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from '@mdi/react';
import { mdiFile, mdiMagnify } from '@mdi/js';
import {
  Toolbar,
  Scroll,
  DocumentList,
  DocumentContainer,
  DocumentCode,
  DocumentTitleSubtitleContainer,
  DocumentTitle,
  DocumentSubtitle,
  RegisterSince,
  EmptyListContainer,
  TextNoDocuments,
  SearchForm,
  ToolbarTitle,
  ToolbarActions,
  SearchButton,
  NewButton,
  VerticalSeparator,
  Title,
  Subtitle,
  LoadingScreen,
  LoadingContainer,
  TextLoadingDocuments,
  ListButton,
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
  const [filtered, setFiltered] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setList(itemList);
  }, [itemList]);

  const handleLoadMore = async () => {
    if (list.length === itemCount || filtered) return;
    const result = await decorator.getRegisters('15', list.length);
    setList([...list, ...result.docs]);
  };

  const handleSearch = async data => {
    setSearching(true);
    const { searchContent } = data;
    let result;
    if (searchContent === '') {
      result = await decorator.getRegisters('15', undefined);
      setFiltered(false);
    } else {
      result = await decorator.getRegistersBySearch(searchContent);
      setFiltered(true);
    }

    setList(result.docs);
    setSearching(false);
  };

  return (
    <>
      <Toolbar>
        <ToolbarTitle>
          <Title>{title}</Title>
          <Subtitle>{itemCount} Documento(s)</Subtitle>
        </ToolbarTitle>
        <ToolbarActions>
          <SearchForm ref={formRef} onSubmit={handleSearch}>
            <DefaultInput name="searchContent" placeholder="Busca..." />
            <SearchButton type="submit">
              <Icon
                path={mdiMagnify}
                title="Buscar"
                size={1.4}
                color="#FFF"
                style={{ cursor: 'pointer' }}
              />
            </SearchButton>
          </SearchForm>

          <VerticalSeparator />

          <NewButton type="button" onClick={handleOpen}>
            <Icon
              path={toolbarIcon}
              title={iconTitle}
              size="30px"
              color="#fff"
            />
          </NewButton>
        </ToolbarActions>
      </Toolbar>
      {!working && list && list.length > 0 ? (
        <Scroll
          options={{ suppressScrollX: true }}
          onYReachEnd={() => !searching && handleLoadMore()}
        >
          <DocumentList>
            {list.map((item, idx) => (
              <li key={item._id}>
                <ListButton
                  type="button"
                  onClick={() => handleOpen(item)}
                  color={idx % 2 === 0 ? 'even' : 'odd'}
                >
                  <DocumentContainer>
                    <DocumentCode>{item.code}</DocumentCode>
                    <Icon
                      path={item.icon}
                      title={item.subtitle}
                      size="30px"
                      color="#333"
                    />
                    <DocumentTitleSubtitleContainer>
                      <DocumentTitle>{item.name}</DocumentTitle>
                      <DocumentSubtitle>{item.description}</DocumentSubtitle>
                    </DocumentTitleSubtitleContainer>
                  </DocumentContainer>
                  {item.formatedPrice ? (
                    <span>R$ {item.formatedPrice}</span>
                  ) : (
                    <RegisterSince>{item.registerSince}</RegisterSince>
                  )}
                </ListButton>
              </li>
            ))}
          </DocumentList>
        </Scroll>
      ) : working ? (
        <LoadingContainer>
          <TextLoadingDocuments>Carregando Documentos</TextLoadingDocuments>
          <LoadingScreen />
        </LoadingContainer>
      ) : (
        <EmptyListContainer>
          <Icon path={mdiFile} size={6} color="#CCC" />
          <TextNoDocuments>Nenhum Documento</TextNoDocuments>
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
