import Button from "components/common/Button";
import React from "react";
import styled from "styled-components";
import qs from "qs";

const PaginationBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin: 0 auto;
  margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/@${username}?${query}` : `/?${query}`;
};

function Pagination({ page, lastPage, username, tag }) {
  if (page > lastPage) return <>Error</>;

  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        前に
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        次に
      </Button>
    </PaginationBlock>
  );
}

export default Pagination;
