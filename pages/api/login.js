import { magicAdmin } from '../../lib/db/magic';
import jwt from 'jsonwebtoken';

export default async function login(req, res) {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : '';
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );

      console.log({ token });

      res.status(200).send({ done: true });
    } catch (e) {
      console.log('Something went wrong logging in', e);
      res.status(500).send({ done: false });
    }
  } else {
    res.status(400).send({ done: false });
  }
}
