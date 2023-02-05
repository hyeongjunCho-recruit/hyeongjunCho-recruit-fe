import { useRouter } from 'next/router';
import styled from 'styled-components';
import usePagination from '../hook/usePagination';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  const router = useRouter();

  const showProduct = (id: string) => {
    router.replace(`/products/${id}`, '', { shallow: true });
  };

  return (
    <Container>
      {products.map((product) => (
        <Flexdiv onClick={() => showProduct(product.id)}>
          <ProductItem key={product.id} product={product} />
        </Flexdiv>
      ))}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;

const Flexdiv = styled.div`
  display: flex;
`;
