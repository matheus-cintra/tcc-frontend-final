import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import FallbackIcon from '../../assets/fallback_icon.jpg';

import { Container, Content, Profile } from './styles';

function Header() {
  const accountInfo = store.getState();
  const userProfile = accountInfo.user;

  return (
    <Container>
      <Content>
        <aside>
          <Profile>
            <div>
              <strong>{userProfile.profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={userProfile.imageLink || FallbackIcon}
              alt="Profile Pic"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default connect(state => ({
  user: state.user,
}))(Header);
