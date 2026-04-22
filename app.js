const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/adminRoute');
const taskRoute = require('./routes/taskRoute');
const { createAdmin }  = require('./seeds/adminSeed');

(async () => {
    await createAdmin();
})();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/task', taskRoute);
app.listen(3000);