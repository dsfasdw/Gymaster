const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

// Static file setup
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src')));
app.use('/src', express.static('src'));

// View engine and partials setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates')); // Set views directory

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('choose', { title: 'USER TYPE' });
});
app.get('/user', (req, res) => {
    res.render('admin_user', { title: 'USER' });
});
app.get('/report', (req, res) => {
    res.render('', { title: 'MEMBER' });
});
app.get('/program', (req, res) => {
    res.render('admin_editprogram', { title: 'MEMBER' });
});
app.get('/member', (req, res) => {
    res.render('admin_member', { title: 'MEMBER' });
});

app.get('/coach', (req, res) => {
    res.render('admin_addcoach', { title: 'COACH' });
});
app.get('/payment', (req, res) => {
    res.render('admin_addpayment', { title: 'PAYMENT' });
});
app.get('/subscription', (req, res) => {
    res.render('admin_addsub', { title: 'SUBSCRIPTION' });
});
app.get('/adduser', (req, res) => {
    res.render('admin_adduser', { title: 'ADD USER' });
});
app.get('/addmember', (req, res) => {
    res.render('admin_addmember', { title: 'ADD MEMBER' });
});
app.get('/addpay', (req, res) => {
    res.render('admin-editpayment', { title: 'EDIT PAYMENT' });
});
app.get('/edituser', (req, res) => {
    res.render('admin_edituser', { title: 'EDIT USER' });
});
app.get('/editmember', (req, res) => {
    res.render('admin_editmember', { title: 'EDIT MEMBER' });
});
app.get('/viewmemsub', (req, res) => {
    res.render('admin_viewmemsubs', { title: 'VIEW  MEMBER' });
});
app.get('/paytrans', (req, res) => {
    res.render('admin_paytransaction', { title: ' PAYMENT TRANSACTION' });
});
//staff
app.get('/staffmember', (req, res) => {
    res.render('staff_member', { title: ' PAYMENT TRANSACTION' });
});
app.get('/staffsubscription', (req, res) => {
    res.render('staff_viewmemsubs', { title: ' PAYMENT TRANSACTION' });
});
app.get('/staffpayment', (req, res) => {
    res.render('staff_paytransaction', { title: ' PAYMENT TRANSACTION' });
});
// Admin Login Page
app.get('/admin', (req, res) => {
    const userType = req.query.user_type;
    if (userType === 'admin') {
        res.render('admin_login', { title: 'ADMIN', userType });
    } else {
        res.redirect('/');
    }
});

// Staff Login Page
app.get('/staff', (req, res) => {
    const userType = req.query.user_type;
    if (userType === 'staff') {
        res.render('staff_login', { title: 'STAFF', userType });
    } else {
        res.redirect('/');
    }
});

// Admin Login Processing
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcode admin credentials
    const correctUsername = 'admin';
    const correctPassword = '123';

    if (username === correctUsername && password === correctPassword) {
        res.render('admin_addcoach', { title: 'ADMIN DASHBOARD' });
    } else {
        res.render('admin_login', { 
            title: 'Admin Login', 
            error: 'Invalid login credentials!' 
        });
    }
});

// Staff Login Processing
app.post('/staff/login', (req, res) => {
    const { username , password } = req.body;

    // Hardcode staff credentials
    const correctStaffUsername = 'staff';
    const correctStaffPassword = 'staff123';

    if (username === correctStaffUsername && password === correctStaffPassword) {
        res.render('staff_member', {  title: 'Staff Dashboard',   });
    } else {
        res.render('staff_login', { 
            title: 'Staff Login', 
            error: 'Invalid login credentials!' 
        });
    }
});

// Start the server
const PORT = 65428;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));