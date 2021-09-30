//GET PRODUCT BY DATABASE ID

import Products from '../../../schema/Products';
import dbConnect from '../../../utils/DBconnect';
import { authinticated } from '../../../utils/AuthMiddleware';

dbConnect();
export default authinticated(async function handler(req, res) {
  try {
    const getProductsByID = await Products.findById(req.query.id);

    res.status(200).json({ data: [getProductsByID] });
  } catch (err) {
    res.json({ success: false, data: 'Server Error' });
  }
});
