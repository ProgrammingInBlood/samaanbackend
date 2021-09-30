import React, { useEffect } from 'react';
import Layout from 'Layouts';
import { Button, Col, Row } from '@paljs/ui';
import { getSession, signOut } from 'next-auth/client';

const Home = () => {
  return (
    <Layout title="Home">
      <Row>
        <Col>
          <Button fullWidth appearance="hero" status="Danger" style={{ maxWidth: '45%' }} onClick={() => signOut()}>
            LOGOUT
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};
export default Home;

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
