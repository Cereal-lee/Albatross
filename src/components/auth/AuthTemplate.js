import palette from "lib/palette";
import React from "react";
import styled from "styled-components";

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  .title {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    font-size: 1.125rem;
    letter-spacing: 3px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 3px;
`;

function AuthTemplate({ children }) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="title">ALBATROSS</div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

export default AuthTemplate;
