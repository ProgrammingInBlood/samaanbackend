import { Status, Size, Shape } from '@paljs/ui/types';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button, ButtonLink } from '@paljs/ui/Button';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getSession } from 'next-auth/client';

const style = { marginBottom: '1.5rem' };

export default function Userpage() {
  const router = useRouter();
  const status = ['Info', 'Success', 'Danger', 'Primary', 'Warning', 'Basic', 'Control'];
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [serverpage, setServerPage] = useState();

  useEffect(() => {
    function getProducts() {
      axios.get(`/api/users?page=1&limit=20`).then((response) => {
        setUser(response.data.data);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
    }
    getProducts();
  }, []);

  console.log(user);

  const loadNextPage = async () => {
    axios.get(`/api/users?page=${page}&limit=20`).then((response) => {
      setUser([...user, ...response.data.data]);
      setServerPage(response.data.totalPages);
      setPage(page + 1);
    });
  };

  const deleteProduct = (id) => {
    axios.delete(`/api/users/delete/${id}`).then(() => {
      router.reload();
    });
  };

  return (
    <Layout title="Button">
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          {!user ? (
            <h1>Loading</h1>
          ) : (
            user?.map((person) => {
              return (
                <Card key={person._id}>
                  <header>ID=({person._id})</header>
                  <CardBody>
                    <p style={{ textTransform: 'capitalize' }}>Name : {person.username}</p>
                    <p>Email : {person.email}</p>
                    <p>Password : {person.password}</p>
                    <p>Joined On : {person.timestamp}</p>
                    <p>isVerified : {person.isVerified ? 'Yes' : 'No'}</p>
                    <p>isBlocked : {person.isBlocked ? 'Yes' : 'No'}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        fullWidth
                        appearance="hero"
                        status="Primary"
                        style={{ maxWidth: '45%' }}
                        onClick={() => router.push(`/ui-features/search?id=${person._id}`)}
                      >
                        Edit person
                      </Button>
                      <Button
                        fullWidth
                        appearance="hero"
                        status="Danger"
                        style={{ maxWidth: '45%' }}
                        onClick={() => deleteProduct(person._id)}
                      >
                        Delete person
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          )}

          <Button
            style={{ display: page <= serverpage ? 'block' : 'none' }}
            fullWidth
            appearance="hero"
            status="Success"
            onClick={loadNextPage}
          >
            Load more user
          </Button>
          {/* <Card>
            <header>Button Hero</header>
            <CardBody>
              <Row>
                {status.map((state) => (
                  <Col key={state} style={style} breakPoint={{ xs: true }}>
                    <Button fullWidth appearance="hero" status={state}>
                      {state}
                    </Button>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>Button Colors</header>
            <CardBody>
              <Row>
                {status.map((state) => (
                  <Col key={state} style={style} breakPoint={{ xs: true }}>
                    <Button fullWidth status={state}>
                      {state}
                    </Button>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>Button Outline</header>
            <CardBody>
              <Row>
                {status.map((state) => (
                  <Col key={state} style={style} breakPoint={{ xs: true }}>
                    <Button fullWidth appearance="outline" status={state}>
                      {state}
                    </Button>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>Button Size</header>
            <CardBody>
              <Row middle="xs">
                {['Tiny', 'Small', 'Medium', 'Large', 'Giant'].map((size) => (
                  <Col key={size} style={style} breakPoint={{ xs: true }}>
                    <Button fullWidth size={size}>
                      {size}
                    </Button>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>Button Shape</header>
            <CardBody>
              <Row middle="xs">
                {['Rectangle', 'SemiRound', 'Round'].map((shape) => (
                  <Col key={shape} style={style} breakPoint={{ xs: true }}>
                    <Button fullWidth shape={shape}>
                      {shape}
                    </Button>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>Button Elements</header>
            <CardBody>
              <Row middle="xs">
                <Col style={style} breakPoint={{ xs: true }}>
                  <Button fullWidth shape="Rectangle">
                    Button
                  </Button>
                </Col>
                <Col style={style} breakPoint={{ xs: true }}>
                  <ButtonLink onClick={() => router.push('/')} fullWidth shape="Rectangle">
                    Link
                  </ButtonLink>
                </Col>
              </Row>
            </CardBody>
          </Card> */}
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
