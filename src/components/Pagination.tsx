import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from '../hook/usePagination';

type PaginationProps = {
  page: number;
  size: number;
  totalCount: number;
  updatePage: (pageIndex: number) => void;
};

const Pagination = ({ page, size, totalCount, updatePage }: PaginationProps) => {
  const { min, max, current, changePage, prev, next } = usePagination({ page, size, totalCount, rangeCount: 5 });
  const pages = useMemo(() => Array.from({ length: max - min + 1 }, (v, i) => i + min), [min, max]);

  useEffect(() => {
    updatePage(current);
  }, [current]);

  const onClickNext = useCallback(() => {
    if (!next) return;
    changePage(max + 1);
  }, [next, max]);

  const onClickPrev = useCallback(() => {
    if (!prev) return;
    changePage(min - 1);
  }, [next, min]);

  return (
    <Container>
      <Button disabled={!prev} onClick={onClickPrev}>
        <VscChevronLeft />
      </Button>
      <PageWrapper key={pages.join(',')}>
        {pages.map((pageIndex) => (
          <Page
            key={pageIndex}
            selected={pageIndex === page}
            disabled={pageIndex === page}
            onClick={() => changePage(pageIndex)}
          >
            {pageIndex}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={!next} onClick={onClickNext}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
