import userService from './user.service';
import jwt from '../auth/jwt.token';

const signUp = async (req, res) => {
  const { body } = req;

  userService
    .checkEamil(body.email)
    .then((answer) => {
      if (!answer) {
        res.json({ emailOverlap: !answer });
      } else {
        userService
          .createUser(body)
          .then((user) => jwt.createTokens(user))
          .then((token) => res.json(token));
      }
    })
    .catch((err) => {
      console.log(':::: USER CONTROLLER ERROR ===========');
      res.json({ message: err.message });
    });
};

const signIn = (req, res) => {
  userService
    .compareUser(req.body)
    .then((user) => {
      console.log(user);
      if (!user) {
        res.json({ message: user });
      } else {
        jwt.createTokens(user).then((token) => res.json(token));
      }
    })
    .catch((error) => {
      res.json(error);
    });
};

      res.json(err);
    });
};

export default {
  signUp,
  signIn,
};
