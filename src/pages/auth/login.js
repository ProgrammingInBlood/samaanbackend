import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';
import { signIn, getSession } from 'next-auth/client';
import router from 'next/router';

export default function Login({ session }) {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (session) {
      router.replace('/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  async function submitLogin(e) {
    e.preventDefault();

    const status = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (!status.error) {
      router.replace('/dashboard');
    }

    console.log(status);
  }

  const onCheckbox = () => {
    // v will be true or false
  };
  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form>
          <InputGroup fullWidth>
            <input
              type="email"
              placeholder="Email Address"
              autocomplete
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputGroup>
          <InputGroup fullWidth>
            <input
              type="password"
              autocomplete
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputGroup>
          <Group>
            <Checkbox checked onChange={onCheckbox}>
              Remember me
            </Checkbox>
            <Link href="/auth/request-password">
              <a>Forgot Password?</a>
            </Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth onClick={submitLogin}>
            Login
          </Button>
        </form>
        <Socials />
        <p>
          Don&apos;t have account?{' '}
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  return {
    props: { session },
  };
}
