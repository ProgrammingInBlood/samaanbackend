//ADDING PRODUCTS BY POST METHOD

import Products from '../../../schema/Products';
import dbConnect from '../../../utils/DBconnect';
import timestamp from 'time-stamp';
import { authinticated } from '../../../utils/AuthMiddleware';

dbConnect();
export default authinticated(async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, brand, price, stockCount, maxUserOrder, productCategory, images, description } = req.body;
    //CHECKING IF ANY FIELD IS EMPTY

    console.log(req.body);
    console.log(req.body.name);
    if (!name || !brand || !price || !stockCount || !maxUserOrder || !productCategory || !images || !description) {
      res.status(404).json({ success: false, error: 'Oops...Some Field Left Empty' });
    } else {
      const data = [
        {
          name: name,
          brand: brand,
          price: price,
          countInStock: stockCount,
          orderPerUser: maxUserOrder,
          category: productCategory,
          images: images,
          description: description,
          timestamp: timestamp('YYYY/MM/DDTHH:mm:ss'),
        },
      ];

      try {
        await Products.create(data);
        res.status(200).json({ success: true });
      } catch (err) {
        res.json({ success: false, message: err.message });
      }
    }
  } else {
    res.status(404).json({ error: 'POST query Missing' });
  }
});
