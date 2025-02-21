const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('✅ MongoDB connection established'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));

module.exports = mongoose.connection;
