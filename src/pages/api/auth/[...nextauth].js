import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Admin from '../../../schema/Admin';
import dbConnect from '../../../utils/DBconnect';
import { compare } from 'bcrypt';
dbConnect();
export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        async authorize(credentials) {
          console.log(req.body);
          //Connect to DB

          const user = await Admin.findOne({
            email: credentials.email,
          });

          //Not found - send error res
          if (!user) {
            throw new Error('No user found with the email');
          }
          //Check hased password with DB password
          const checkPassword = await compare(credentials.password, user.password);
          //Incorrect password - send response
          if (!checkPassword) {
            throw new Error('Email or Password is incorrect');
          }
          //Else send success response

          return { email: user.email };
        },
      }),
    ],
    database: process.env.MONGODB_URI,
    debug: process.env.NODE_ENV !== 'development',
    secret: process.env.JWT_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    session: {
      jwt: true,
    },
    pages: {
      signin: '/register',
      signout: '/',
      error: '/register',
    },
  });
