//REQUIRE - EXPRESS & MONGOOSE
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

//USE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(require('./routes'));

//CONNECT MONGOOSE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  // useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//LOG MONGOOSE QUERY
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`*** Connected on localhost: ${PORT} ***`));