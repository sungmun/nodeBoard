import express from 'express';
import swaggerDoc from './lib/document/swaggerDoc';
import db from './config/mariadb.config';
import post from './product/post/post.router';
import user from './product/user/user.router';
import auth from './product/auth/auth.router';

const app = express();

db.sequelize
  // .sync()
  .authenticate()
  .then(() => console.log('✓ DB connection success.'))
  .catch((err) => {
    console.log(`✗ DB connection error. :::: ${err}`);
    process.exit();
  });

app.use(express.json());

app.use('/user', user);

app.use('/post', post);

app.use('/auth', auth);

app.use(swaggerDoc);

app.listen(8080, () => {});
