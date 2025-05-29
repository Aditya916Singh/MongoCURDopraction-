const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ✅ EJS Layout Setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // Uses views/layout.ejs

// ✅ Static Files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ AdminLTE Assets (optional: if extracted to public/admin-lte)
app.use('/admin-lte', express.static(path.join(__dirname, 'public/admin-lte')));

// ✅ Routes
app.use('/', userRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
