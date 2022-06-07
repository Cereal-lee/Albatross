import { T } from "constants/symbols";
import palette from "lib/palette";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SubInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  color: ${palette.gray[8]};

  span + span::before {
    color: ${palette.gray[8]};
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    content: "\\B7";
  }
`;
function SubInfo({ username, publishedDate }) {
  const timeArr = publishedDate.split(T);

  return (
    <SubInfoBlock>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{timeArr[0]}</span>
    </SubInfoBlock>
  );
}

export default SubInfo;
