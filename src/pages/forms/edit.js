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

const options = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'lifestyle', label: 'LifeStyle' },
];

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const InputPage = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [stockCount, setStockCount] = useState();
  const [maxUserOrder, setMaxUserOrder] = useState();
  const [productCategory, setProductCategory] = useState();
  const [image, setImage] = useState();
  const [brand, setBrand] = useState();
  const [percent, setPercent] = useState(0);
  const router = useRouter();
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
  const inputRef = useRef();
  const category = useRef();
  async function handleAddProduct(e) {
    e.preventDefault();

    if (image && media) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'samaan');
      data.append('cloud_name', 'dmdk1mm4p');

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;

          let percentage = Math.floor((loaded * 100) / total);
          setPercent(percentage);
        },
      };

      try {
        await axios.post('https://api.cloudinary.com/v1_1/dmdk1mm4p/image/upload', data, options).then((response) => {
          media = response.data.url;
          setCount(count + 1);
          toastrRef.current?.add('SUCCESS', 'Uploaded Image Successfully', { ...toasterData, status: 'Success' });
        });
      } catch (error) {
        setCount(count + 1);
        toastrRef.current?.add('ERROR', 'Image Uploading Failed', { ...toasterData, status: 'Danger' });
      }
    }
    //PAYLOAD
    const payload = {
      name: name,
      brand: brand,
      price: price,
      description: description,
      countInStock: stockCount,
      orderPerUser: maxUserOrder,
      category: productCategory,
      images: [{ media }, { media }],
    };

    async function handleNewProduct() {
      e.preventDefault();
      try {
        await axios.put(`/api/products/update/${router.query.id}`, payload).then(async (response) => {
          console.log(response);
          setCount(count + 1);
          toastrRef.current?.add('SUCCESS', 'Product Updated Successfully', { ...toasterData, status: 'Success' });

          // setName('');
          // setBrand('');
          // setDescription('');
          // setPrice('');
          // setStockCount('');
          // setProductCategory('');
          // setMaxUserOrder('');
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

    handleNewProduct();
  }

  const style = { marginBottom: '1rem' };
  console.log(router.query);

  return (
    <Layout title="Input">
      <Row>
        <Col>
          <Toastr ref={toastrRef} />

          <Card>
            <header>Edit Product</header>
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
                  <input type="text" placeholder="Product ID" required value={router.query.id} />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    type="text"
                    placeholder="Product Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    type="number"
                    placeholder="Product Stock"
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    type="number"
                    placeholder="Max Product Order Per User"
                    value={maxUserOrder}
                    onChange={(e) => setMaxUserOrder(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    type="file"
                    id="avatar"
                    onChange={(e) => setImage(e?.target?.files[0])}
                    name="avatar"
                    accept="image/png, image/jpeg , image/jpg"
                    ref={inputRef}
                  />
                </Input>
                <Col style={{ display: percent ? 'block' : 'none' }}>
                  <Progress style={style} value={percent} status="Success">
                    {percent == 100 ? 'Image Uploaded Successfully' : `Uploading ${percent}`}
                  </Progress>
                </Col>

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
                <Select
                  style={{ marginTop: '1rem' }}
                  fullWidth
                  placeholder="Choose Product Category"
                  options={options}
                  ref={category}
                  onChange={(e) => setProductCategory(e?.value)}
                />
                <div style={{ paddingTop: 10 }}>
                  <Input fullWidth shape="Round">
                    <textarea
                      rows={3}
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Input>
                </div>
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
