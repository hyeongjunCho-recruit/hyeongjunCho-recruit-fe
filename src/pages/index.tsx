import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { Product } from '../types/product';
import Error from '../components/Error';

const size = 10;

const HomePage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const updatePage = useCallback((pageIndex: number) => {
    router.replace(`/?page=${pageIndex}`, '', { shallow: true });
  }, []);

  useEffect(() => {
    if (!page) {
      return;
    }
    const asyncFunc = async () => {
      try {
        const res = await axios.get(`/products?page=${page}&size=${size}`);
        setProducts(res.data.data.products);
        setTotalCount(res.data.data.totalCount);
      } catch (error) {
        setProducts([]);
        setTotalCount(0);
        return;
      }
    };
    asyncFunc();
  }, [page]);

  if (!page) return <Error />;
  if (products.length === 0) return <Error />;
  if (totalCount === 0) return <Error />;

  return (
    <>
      <Container>
        <ProductList products={products} />
        <Pagination page={+page} size={size} totalCount={totalCount} updatePage={updatePage} />
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
