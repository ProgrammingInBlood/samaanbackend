//DELETING Users BY ID

import Users from '../../../../schema/CreateAccount';
import dbConnect from '../../../../utils/DBconnect';
// import timestamp from 'time-stamp';
import { authinticated } from '../../../../utils/AuthMiddleware';

dbConnect();
export default authinticated(async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const remove = await Users.deleteOne({ _id: req.query.id });
      res.status(200).json({ success: true, data: remove });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  } else {
    res.status(404).json({ error: 'This Method is not allowed' });
  }
});
