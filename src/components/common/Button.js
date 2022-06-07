import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components";
import palette from "../../lib/palette";

const buttonStyle = css`
  border: none;
  outline: none;
  background: ${palette.gray[8]};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  cursor: pointer;

  &:hover {
    background: ${palette.gray[9]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.teal &&
    css`
      background: ${palette.teal[6]};
      &:hover {
        background: ${palette.teal[5]};
      }
    `}

    &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const ButtonBlock = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

function Button(props) {
  return props.to ? <StyledLink {...props} /> : <ButtonBlock {...props} />;
}

export default Button;
