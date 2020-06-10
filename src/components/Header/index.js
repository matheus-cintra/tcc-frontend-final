import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';
import logo from '../../assets/logo.svg';

export default function Header() {
  return (
    <Container>
      <Content>
        <aside>
          <Profile>
            <div>
              <strong>Matheus Cintra</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img src="https://api.adorable.io/avatars/48/abott@adorable.png" />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
