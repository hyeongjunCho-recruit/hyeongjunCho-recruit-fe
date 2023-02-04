import Link from 'next/link';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import axios from 'axios';
import Error from '../../components/Error';
import { Product } from '../../types/product';

function ProductDetailPage({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (product)
    return (
      <>
        <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
        <ProductInfoWrapper>
          <Name>{product.name}</Name>
          <Price>{product.price}원</Price>
        </ProductInfoWrapper>
      </>
    );
  return <Error />;
}

export const getServerSideProps: GetServerSideProps<{ product: Product }> = async (context) => {
  const id = context.params?.id ?? '-1';
  if (id === '-1') {
    return {
      props: {
        product: null,
      },
    };
  }
  try {
    const res = await axios.get(`/products/${id}`);
    console.log(res);
    if (!res?.data?.data?.product) {
      return {
        props: {
          product: null,
        },
      };
    }
    return {
      props: {
        product: res.data.data.product,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductDetailPage;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
