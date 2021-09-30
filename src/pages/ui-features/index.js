import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/ui-features/grid');
  }),
    [];
  return <div />;
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
