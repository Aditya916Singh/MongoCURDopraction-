const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const userRoutes = require('./routes/userRoutes');
const fs = require('fs');

const app = express();
const PORT = 3000;

// ✅ Ensure 'public/uploads' directory exists
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

mongoose.connect('mongodb://127.0.0.1:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB Connected'))
.catch(err => console.error(' MongoDB Connection Error:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin-lte', express.static(path.join(__dirname, 'public/admin-lte')));
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
