// Products.js
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, Button, Row, Col } from 'antd';

const apiUrl ='https://retoolapi.dev/0pwl39/data';

// Fetching products function
const fetchProducts = async () => {
  const { data } = await axios.get(apiUrl);
  return data;
};

// Adding a product function
const addProduct = async (newProduct) => {
  const { data } = await axios.post(apiUrl, newProduct);
  return data;
};

function Products() {
  const queryClient = useQueryClient();

  // Fetching products with useQuery
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Adding a product with useMutation
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // Invalidate and refetch products query on success
      queryClient.invalidateQueries(['products']);
    },
  });

  // Function to handle adding a product
  const handleAddProduct = () => {
    mutation.mutate({
      name: 'New Product',
      price: 100,
      rating: '⭐️⭐️⭐️⭐️⭐️',
      'product id': 'SKU_NEW'
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      <Button type="primary" onClick={handleAddProduct} disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Adding...' : 'Add Product'}
      </Button>
      {mutation.isError ? <div>Error adding product: {mutation.error.message}</div> : null}
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {data.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={product.name}
              bordered={false}
              style={{ width: '100%' }}
              extra={<span>{product.rating}</span>}
            >
              <p>Price: ${product.price}</p>
              <p>Product ID: {product['product id']}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Products;
