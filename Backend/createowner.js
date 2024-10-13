const mongoose = require('mongoose');
const Owner = require('./models/Owner');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const createOwner = async () => {
  try {
    const owner = await Owner.create({
      email: 'pareshprajapati10@gmail.com',
      password: 'paresh@1974'
    });
    console.log('Owner created successfully:', owner);
  } catch (error) {
    console.error('Error creating owner:', error);
  } finally {
    mongoose.connection.close();
  }
};

createOwner();