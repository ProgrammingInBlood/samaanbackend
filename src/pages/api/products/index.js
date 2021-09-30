import Products from '../../../schema/Products';
import dbConnect from '../../../utils/DBconnect';
import { authinticated } from '../../../utils/AuthMiddleware';

dbConnect();
export default authinticated(async function handler(req, res) {
  const { page = 1, limit = 20 } = req.query;
  try {
    const getAllProducts = await Products.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Products.countDocuments({});
    let totalPages = 0;

    totalPages = count / limit;
    let totalApprox = totalPages.toFixed(0);

    if (totalPages > totalApprox) {
      totalPages = parseInt(totalApprox) + 1;
    } else if (parseInt(totalPages) < parseInt(totalApprox)) {
      totalPages = totalApprox;
    }

    res.status(200).json({ totalPages: totalPages, data: getAllProducts });
  } catch (err) {
    res.json({ success: false, data: err.message });
  }
});
