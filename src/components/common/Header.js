import palette from "lib/palette";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Responsive from "./Responsive";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: ${palette.gray[2]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .userSec {
    display: flex;
    align-items: center;
  }
  .userInfo {
    font-weight: 700;
    margin-right: 1rem;
  }
`;

const Spacer = styled.div`
  padding-top: 64px;
`;

const LogoBlock = styled(Link)`
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 3px;
`;

function Header({ user, onLogout }) {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <LogoBlock to="/">ALBATROSS</LogoBlock>
          {user ? (
            <div className="userSec">
              <div className="userInfo">{user.username}様</div>
              <Button teal="true" onClick={onLogout} to="/">
                LOGOUT
              </Button>
            </div>
          ) : (
            <div className="userSec">
              <Button teal="true" to="/login">
                LOGIN
              </Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;
