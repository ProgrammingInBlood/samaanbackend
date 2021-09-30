import Select from '@paljs/ui/Select';
import { Card, CardBody } from '@paljs/ui/Card';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'Layouts';
import { InputGroup } from '@paljs/ui/Input';
import { Button, ButtonLink } from '@paljs/ui/Button';
import axios from 'axios';
import router from 'next/router';
import { getSession } from 'next-auth/client';

export const SelectStyled = styled(Select)`
  min-width: 200px;
  z-index: 999;
`;
const Input = styled(InputGroup)``;
export default function SelectPage() {
  const [input, setInput] = useState();
  const [method, setMethod] = useState('name');
  const [response, setResponse] = useState();
  const [message, setMessage] = useState('');
  const statusOption = [
    { value: '_id', label: 'ID' },
    { value: 'name', label: 'Name' },
    { value: 'brand', label: 'Brand' },
    { value: 'description', label: 'Description' },
    { value: 'category', label: 'Category' },
  ];

  console.log(method);
  const sendRequest = async () => {
    if (input) {
      if (method !== '_id') {
        const res = await axios.get(`/api/products/search?search=${input}&method=${method}`);
        setResponse(res.data.data);
        res.data.data.length ? '' : setMessage('No Results Found');
      } else {
        const res = await axios.get(`/api/products/${input}`);
        setResponse(res.data.data);
        res.data.data.length ? '' : setMessage('No Results Found');
      }
    }
  };

  console.log(response);

  const deleteProduct = (id) => {
    axios.delete(`/api/products/delete/${id}`).then(() => {
      router.reload();
    });
  };

  return (
    <Layout title="Select">
      <Row>
        <Col>
          <Card>
            <CardBody style={{ overflow: 'unset' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input fullWidth shape="Rectangle" style={{ minWidth: '50%' }}>
                  <input
                    type="text"
                    placeholder="Search Products"
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </Input>
                <SelectStyled options={statusOption} placeholder="Search By" onChange={(e) => setMethod(e?.value)} />
                <Button fullWidth appearance="hero" status="Primary" style={{ maxWidth: '45%' }} onClick={sendRequest}>
                  search
                </Button>
              </div>
            </CardBody>
          </Card>

          {response?.length ? (
            response.map((product) => {
              return (
                <Card key={product._id}>
                  <header>
                    {product.name} || ID=({product._id})
                  </header>
                  <CardBody>
                    <p>Brand : {product.brand}</p>
                    <p>Price : {product.price}</p>
                    <p>Stock Count : {product.countInStock}</p>
                    <p>Order Per User : {product.orderPerUser}</p>
                    <p>Category: {product.category}</p>
                    <p>Image URL : {product.images}</p>
                    <p>description: {product.description}</p>
                    <p>timestamp: {product.timestamp}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        fullWidth
                        appearance="hero"
                        status="Primary"
                        style={{ maxWidth: '45%' }}
                        onClick={() => router.push(`/forms/edit?id=${product._id}`)}
                      >
                        Edit Product
                      </Button>
                      <Button
                        fullWidth
                        appearance="hero"
                        status="Danger"
                        style={{ maxWidth: '45%' }}
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete Product
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <h1 style={{ textAlign: 'center' }}>{message}</h1>
          )}
        </Col>
      </Row>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
