//UPDATING PRODUCTS BY ID

import Products from '../../../../schema/Products';
import dbConnect from '../../../../utils/DBconnect';
import { authinticated } from '../../../../utils/AuthMiddleware';

// import timestamp from 'time-stamp';

dbConnect();
export default authinticated(async function handler(req, res) {
  if (req.method === 'PUT') {
    const getProductsByID = await Products.findById(req.query.id);

    //CHECKING BODY
    req.body.name ? (getProductsByID.name = req.body.name) : null;
    req.body.brand ? (getProductsByID.brand = req.body.brand) : null;
    req.body.price ? (getProductsByID.price = req.body.price) : null;
    req.body.countInStock ? (getProductsByID.countInStock = req.body.countInStock) : null;
    req.body.orderPerUser ? (getProductsByID.orderPerUser = req.body.orderPerUser) : null;
    req.body.category ? (getProductsByID.category = req.body.category) : null;
    req.body.images ? (getProductsByID.images = req.body.images) : null;
    req.body.description ? (getProductsByID.description = req.body.description) : null;

    try {
      getProductsByID.save();
      console.log(getProductsByID);

      res.status(200).json({ success: true, data: getProductsByID });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else {
    res.status(404).json({ error: 'POST method missing' });
  }
});
