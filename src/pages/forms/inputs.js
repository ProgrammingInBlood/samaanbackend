import Select from '@paljs/ui/Select';
import { Radio } from '@paljs/ui/Radio';
import { Card, CardBody } from '@paljs/ui/Card';
import { Checkbox } from '@paljs/ui/Checkbox';
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

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'samaan');
    data.append('cloud_name', 'dmdk1mm4p');
    let media = '';
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

    //PAYLOAD
    const payload = {
      name: name,
      brand: brand,
      price: price,
      description: description,
      stockCount: stockCount,
      maxUserOrder: maxUserOrder,
      productCategory: productCategory,
      images: media,
    };

    async function handleNewProduct() {
      try {
        await axios.post(`/api/products/addProducts`, payload).then(async (response) => {
          console.log(response);
          setCount(count + 1);
          toastrRef.current?.add('SUCCESS', 'Product Added Successfully', { ...toasterData, status: 'Success' });
        });
      } catch (err) {
        setCount(count + 1);
        toastrRef.current?.add('ERROR', 'Somethingwent Wrong...Try Again', { ...toasterData, status: 'Danger' });
      }
    }
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

    handleNewProduct();
  }

  const [checkbox, setCheckbox] = useState({
    1: false,
    2: false,
    3: false,
  });

  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };
  const onChangeRadio = (_value) => {
    // value will be item value
  };

  const style = { marginBottom: '1rem' };

  return (
    <Layout title="Input">
      <Row>
        <Col breakPoint={{ xs: 12, md: 6 }}>
          <Toastr ref={toastrRef} />
          <Card>
            <header>Upload Product</header>
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
                    required
                    type="text"
                    placeholder="Product Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    required
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    required
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    required
                    type="number"
                    placeholder="Product Stock"
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    required
                    type="number"
                    placeholder="Max Product Order Per User"
                    value={maxUserOrder}
                    onChange={(e) => setMaxUserOrder(e.target.value)}
                  />
                </Input>
                <Input fullWidth shape="Round">
                  <input
                    required
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
                  required
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
                      required
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
        <Col breakPoint={{ xs: 12, md: 6 }}>
          <Card>
            <header>Validation States</header>
            <CardBody>
              <Input fullWidth status="Info">
                <Button
                  fullWidth
                  appearance="hero"
                  status={parseInt(brand?.length) > 0 && parseInt(brand?.length) <= 50 ? 'Success' : 'Danger'}
                >
                  {console.log(brand)}
                  {console.log(brand?.length)}
                  {parseInt(brand?.length) > 0 && parseInt(brand?.length) <= 50
                    ? 'BRAND NAME VALIDATED'
                    : 'BRAND NAME SHOULD BE BETWEEN 1-50 LETTERS'}
                </Button>
              </Input>
              <Input fullWidth status="Warning">
                <Button
                  fullWidth
                  appearance="hero"
                  status={parseInt(name?.length) > 0 && parseInt(name?.length) <= 50 ? 'Success' : 'Danger'}
                >
                  {console.log(name)}
                  {console.log(name?.length)}
                  {parseInt(name?.length) > 0 && parseInt(name?.length) <= 50
                    ? 'PRODUCT NAME VALIDATED'
                    : 'PRODUCT NAME SHOULD BE BETWEEN 1-50 LETTERS'}
                </Button>
              </Input>
              <Input fullWidth status="Success">
                <Button
                  fullWidth
                  appearance="hero"
                  status={parseInt(price) <= 999999 && parseInt(price) > 0 ? 'Success' : 'Danger'}
                >
                  {console.log(price)}
                  {console.log(price?.length)}
                  {price <= 999999 && price > 0 ? 'PRICE VALIDATED' : 'PRICE SHOULD BE BETWEEN 1-9999999'}
                </Button>
              </Input>
              <Input fullWidth status="Danger">
                <Button
                  fullWidth
                  appearance="hero"
                  status={parseInt(stockCount) <= 999999 && parseInt(stockCount) > 0 ? 'Success' : 'Danger'}
                >
                  {stockCount <= 999999 && stockCount > 0
                    ? 'PRODUCT STOCK VALIDATED'
                    : 'PRODUCT STOCK SHOULD BE BETWEEN 1-9999999'}
                </Button>
              </Input>
              <Input fullWidth status="Danger">
                <Button
                  fullWidth
                  appearance="hero"
                  status={parseInt(maxUserOrder) <= 999999 && parseInt(maxUserOrder) > 0 ? 'Success' : 'Danger'}
                >
                  {maxUserOrder <= 999999 && maxUserOrder > 0
                    ? 'MAX USER ORDER VALIDATED'
                    : 'MAX USER ORDER  SHOULD BE BETWEEN 1-9999999'}
                </Button>
              </Input>
              <Input fullWidth status="Danger">
                <Button fullWidth appearance="hero" status={image ? 'Success' : 'Danger'}>
                  {image ? 'IMAGE SELECTED' : 'SELECT AN IMAGE'}
                </Button>
              </Input>
              <Input fullWidth status="Danger">
                <Button fullWidth appearance="hero" status={productCategory ? 'Success' : 'Danger'}>
                  {productCategory ? 'PRODUCT CATEGORY VALIDATED' : 'SELECT A PRODUCT CATEGORY'}
                </Button>
              </Input>
              <Input fullWidth status="Danger">
                <Button
                  fullWidth
                  appearance="hero"
                  status={
                    parseInt(description?.length) > 0 && parseInt(description?.length) <= 3000 ? 'Success' : 'Danger'
                  }
                >
                  {console.log(description)}
                  {console.log(description?.length)}
                  {parseInt(description?.length) > 0 && parseInt(description?.length) <= 3000
                    ? 'DESCRIPTION VALIDATED'
                    : 'DESCRIPTION SHOULD BE BETWEEN 1-3000 LETTERS'}
                </Button>
              </Input>
              {/* <Row>
                <Col breakPoint={{ xs: 12 }}>
                  <Radio
                    name="radio"
                    onChange={onChangeRadio}
                    options={[
                      {
                        value: 'value 1',
                        label: 'option 1',
                        checked: true,
                      },
                      {
                        value: 'value 2',
                        label: 'option 2',
                        status: 'Info',
                      },
                      {
                        value: 'value 3',
                        label: 'option 3',
                        status: 'Danger',
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row>
                <Col breakPoint={{ xs: 12, sm: 4 }}>
                  <Checkbox checked={checkbox[1]} status="Success" onChange={(value) => onChangeCheckbox(value, 1)}>
                    Success
                  </Checkbox>
                </Col>
                <Col breakPoint={{ xs: 12, sm: 4 }}>
                  <Checkbox checked={checkbox[2]} status="Danger" onChange={(value) => onChangeCheckbox(value, 2)}>
                    Danger
                  </Checkbox>
                </Col>
                <Col breakPoint={{ xs: 12, sm: 4 }}>
                  <Checkbox checked={checkbox[3]} status="Warning" onChange={(value) => onChangeCheckbox(value, 3)}>
                    Warning
                  </Checkbox>
                </Col>
              </Row> */}
              <h3 style={{ textAlign: 'center' }}>Make Sure Everything is Green Then Submit the Product</h3>
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
