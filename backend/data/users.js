import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Tiya Luthra',
    email: 'tiyaluthra@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Rahul Luthra',
    email: 'rahulapps29@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'nanu',
    email: 'rl3711@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
