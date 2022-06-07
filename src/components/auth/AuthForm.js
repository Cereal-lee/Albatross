import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/palette";
import Button from "../common/Button";

const AuthFormBlock = styled.div`
  h4 {
    margin: 0;
    color: ${palette.gray[6]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.7rem;
  width: 100%;
  &:focus {
    border-bottom: 1px solid ${palette.cyan[3]};
  }
  & + & {
    margin-top: 1rem;
  }

  &::placeholder {
    color: ${palette.gray[3]};
  }
`;

const Footer = styled.div`
  a {
    text-decoration: none;
    color: ${palette.gray[5]};
    font-size: 0.8rem;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
  margin-top: 2rem;
  text-align: right;
`;

const ErrMsg = styled.div`
  text-align: center;
  font-size: 0.8rem;
  margin-top: 1rem;
  color: rgba(255, 0, 0, 0.6);
`;

const textMap = {
  login: "LOGIN",
  register: "REGISTER",
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h4>{text}</h4>
      <form onSubmit={onSubmit}>
        <StyledInput
          name="username"
          placeholder="username"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          type="password"
          name="password"
          placeholder="password"
          onChange={onChange}
          value={form.password}
        />
        {type === "register" && (
          <StyledInput
            type="password"
            name="passwordConfirm"
            placeholder="passwordConfirm"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrMsg>{error}</ErrMsg>}
        <Button fullWidth teal style={{ marginTop: "1rem" }}>
          {text}
        </Button>
      </form>
      <Footer>
        {type === "register" ? (
          <Link to="/login">ログイン➝</Link>
        ) : (
          <Link to="/register">まだ会員ではありませんか？</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
