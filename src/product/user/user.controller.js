import userService from './service/user.service';

const signUp = async (req, res) => {
  const { body } = req;

  userService
    .signUp(body)
    .then((userHash) => res.json({ hash: userHash }))
    .catch((error) => res.status(409).json({ message: error.message }));
};

const signIn = (req, res) => {
  const { body } = req;

  userService
    .signIn(body)
    .then((token) => res.json({ tokens: token }))
    .catch((error) => res.json({ message: error.message }));
};

const comparePassword = (req, res) => {
  const { password } = req.body;
  const { hash } = req.user;

  userService
    .comparePassword(hash, password)
    .then(() => res.json({ password: true }))
    .catch((error) => res.status(422).json({ message: error.message }));
};

const signOut = (req, res, next) => {
  const { body } = req;

  userService
    .signOut(body)
    .then((result) => res.json({ message: result }))
    .catch((error) => res.json({ message: error.message }));
  next();
};

const modifyPw = (req, res) => {
  const { body } = req;

  userService
    .modifyPw(body)
    .then((result) => res.json({ message: result }))
    .catch((error) => res.json({ message: error.message }));
};

const modifyInfo = async (req, res) => {
  const { body } = req;

  userService
    .modifyUserInfo(body)
    .then(() => res.status(204))
    .catch((error) => res.json({ message: error.message }));
};

const userInfo = (req, res) => {
  const userHash = req.user.hash;
  userService
    .getUserInfo(userHash)
    .then((user) => res.json({ userInfo: user }))
    .catch((error) => res.json({ message: error.message }));
};

const deleteUser = (req, res) => {
  const { password } = req.body;
  const userHash = req.user.hash;

  userService
    .deleteUser(userHash, password)
    .then(() => res.status(204))
    .catch((error) => res.json({ message: error.message }));
};

export default {
  signUp,
  signIn,
  signOut,
  userInfo,
  modifyPw,
  modifyInfo,
  deleteUser,
  comparePassword,
};
