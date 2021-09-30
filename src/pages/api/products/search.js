import Products from '../../../schema/Products';
import dbConnect from '../../../utils/DBconnect';
import { authinticated } from '../../../utils/AuthMiddleware';

dbConnect();
export default authinticated(async function handler(req, res) {
  if (req.method === 'GET') {
    const { page = 1, limit = 10, search = '', method = 'name' } = req.query;
    var regex = new RegExp(search, 'i');
    const autocomplete = await Products.find({ [method]: regex })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Products.countDocuments({ [method]: regex });
    let totalPages = 0;

    totalPages = count / limit;
    let totalApprox = totalPages.toFixed(0);

    if (totalPages > totalApprox) {
      totalPages = parseInt(totalApprox) + 1;
    } else if (parseInt(totalPages) < parseInt(totalApprox)) {
      totalPages = totalApprox;
    }

    res.status(200).json({ data: autocomplete, totalPages: totalPages });
  } else {
    res.status(500).json({ message: 'GET query missing' });
  }
});
