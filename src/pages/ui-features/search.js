import Select from '@paljs/ui/Select';
import { Card, CardBody } from '@paljs/ui/Card';
import { InputGroup } from '@paljs/ui/Input';
import { Button } from '@paljs/ui/Button';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Layout from 'Layouts';
import axios from 'axios';
import Progress from '@paljs/ui/ProgressBar';
import { Toastr, ToastrRef, ToastrProps } from '@paljs/ui/Toastr';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

const block = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];
const verify = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const InputPage = () => {
  const router = useRouter();

  const [id, setID] = useState(router.query.id);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const [blocked, setBlocked] = useState();
  const [verified, setVerified] = useState();

  let media = '';

  //TOASTER DATA
  const [count, setCount] = useState(0);

  const [toasterData, setToasterData] = useState({
    position: 'topEnd',
    status: 'Primary',
    duration: 5000,
    hasIcon: true,
    destroyByClick: true,
    preventDuplicates: false,
  });

  const toastrRef = useRef();
  const category = useRef();
  async function handleAddProduct(e) {
    e.preventDefault();

    //PAYLOAD
    const payload = {
      username: username,
      email: email,
      isVerified: verified,
      isBlocked: blocked,
    };

    async function handleNewProduct() {
      e.preventDefault();
      try {
        await axios.put(`/api/users/update/${id}`, payload).then(async (response) => {
          console.log(response);
          setCount(count + 1);
          toastrRef.current?.add('SUCCESS', 'User Updated Successfully', { ...toasterData, status: 'Success' });

          // setUsername('');
          // setBrand('');
          // setDescription('');
          // setEmail('');
          // setPassword('');
          // setBlocked('');
          // setBlock('');
          // setImage('');
          // setMedia('');
          // setPercent('');
          // inputRef.target.value = '';
          // category.target.value = '';
        });
      } catch (err) {
        setCount(count + 1);
        toastrRef.current?.add('ERROR', 'Somethingwent Wrong...Try Again', { ...toasterData, status: 'Danger' });
      }
    }

    if (!id) {
      setCount(count + 1);
      toastrRef.current?.add('ERROR', 'Please Enter User ID', { ...toasterData, status: 'Danger' });
    } else {
      handleNewProduct();
    }
  }

  const style = { marginBottom: '1rem' };
  console.log(router.query);

  return (
    <Layout title="Input">
      <Row>
        <Col>
          <Toastr ref={toastrRef} />

          <Card>
            <header>Edit User Details</header>
            <CardBody>
              {/* <Input fullWidth size="Small">
                <input type="text" placeholder="Size small" />
              </Input>
              <Input fullWidth size="Medium">
                <input type="text" placeholder="Size Medium" />
              </Input>
              <Input fullWidth size="Large">
                <input type="text" placeholder="Size Large" />
              </Input>
              <Input fullWidth shape="Rectangle">
                <input type="text" placeholder="Rectangle border" />
              </Input>
              <Input fullWidth shape="SemiRound">
                <input type="text" placeholder="SemiRound border" />
              </Input> */}
              <form>
                <Input fullWidth shape="Round">
                  <input
                    type="text"
                    placeholder="User ID"
                    required
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  />
                </Input>

                <Input fullWidth shape="Round">
                  <input
                    type="text"
                    placeholder="User username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    type="text"
                    placeholder="User email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Input>

                {/* <Row>
                <Col breakPoint={{ xs: 12, md: 6 }}>
                  <Input fullWidth>
                    <input type="text" disabled />
                  </Input>
                </Col>
                <Col breakPoint={{ xs: 12, md: 6 }}>
                  <Input fullWidth>
                    <input type="text" disabled placeholder="Disabled Input" />
                  </Input>
                </Col>
              </Row> */}
                <Input style={{ width: '100%', display: 'block' }}>
                  <Select
                    style={{ margin: '1rem' }}
                    fullWidth
                    placeholder="Choose User isBlocked"
                    options={block}
                    ref={category}
                    onChange={(e) => setBlocked(e?.value)}
                  />
                </Input>
                <Input style={{ width: '100%', display: 'block' }}>
                  <Select
                    style={{ margin: '1rem' }}
                    fullWidth
                    placeholder="Choose User isVerified"
                    options={verify}
                    ref={category}
                    onChange={(e) => setVerified(e?.value)}
                  />
                </Input>

                <Button
                  type="submit"
                  style={{ marginTop: 10 }}
                  fullWidth
                  appearance="hero"
                  status="Info"
                  onClick={handleAddProduct}
                >
                  SUBMIT
                </Button>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default InputPage;

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
