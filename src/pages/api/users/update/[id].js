//UPDATING User BY ID

import User from '../../../../schema/CreateAccount';
import dbConnect from '../../../../utils/DBconnect';
import { authinticated } from '../../../../utils/AuthMiddleware';

// import timestamp from 'time-stamp';

dbConnect();
export default authinticated(async function handler(req, res) {
  if (req.method === 'PUT') {
    const getUserByID = await User.findById(req.query.id);
    let hashed = null;
    //CHECKING BODY
    req.body.username ? (getUserByID.username = req.body.username) : null;
    req.body.email ? (getUserByID.email = req.body.email) : null;

    if (req.body.isVerified == 'true') {
      getUserByID.isVerified = await true;
    } else if (req.body.isVerified == 'false') {
      getUserByID.isVerified = await false;
    } else {
      ('');
    }

    if (req.body.isBlocked == 'true') {
      getUserByID.isBlocked = await true;
    } else if (req.body.isBlocked == 'false') {
      getUserByID.isBlocked = await false;
    } else {
      ('');
    }

    try {
      await getUserByID.save();
      console.log(getUserByID);
      res.status(200).json({ success: true, data: getUserByID });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else {
    res.status(404).json({ error: 'PUT method missing' });
  }
});
