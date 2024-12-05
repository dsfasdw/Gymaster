//connect to express
const express = require('express');
//directory paths 
const path = require('path');
//connect to sql server 
const sql = require("msnodesqlv8");

//conect to express(means you can use the top level function)
const app = express();

// Set the view engine and static file serving
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src')));
app.use('/src', express.static('src'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../tempelates'));

// Connection string to the GYMASTER database
const connectionString = "Driver={SQL Server Native Client 11.0};Server=.;Database=GYMASTER;Trusted_Connection=Yes;";

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));            

// Routes to all home page 

// Home Page with choice options( in choice only )
app.get('/member', (req, res) => {
    res.render('Member', { title: 'Member page' });
});

app.get('/coach', (req, res) => {
    res.render('Coach', { title: 'Coach Page' });
});

app.get('/', (req, res) => {
    res.render('choice', { title: 'Choose Login Type' });
});

// Admin Login Page
app.get('/admin', (req, res) => {
    const userType = req.query.user_type;

    if (userType === 'admin') {
        res.render('admin_login', { title: 'Admin Login', userType });
        // admin_login home page if the user type is valid to admin and the userType contains the value of user_type from /admin body
    } else {
        res.redirect('/'); // Redirect back to the home page if user_type is invalid
    }
});

// Staff Login Page
app.get('/staff', (req, res) => {
    const userType = req.query.user_type;

    if (userType === 'staff') {
        res.render('staff_login', { title: 'Staff Login', userType });
    } else {
        res.redirect('/'); // Redirect back to the home page if user_type is invalid
    }
});

// Admin Login Processing
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    // if the username,password and usertype is valid it can sent to admin dashboard
    const query = `
        SELECT * FROM U_SER WHERE USERNAME = '${username}' AND PASSWORD = '${password}' AND USER_TYPE = 'admin'
    `;

    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.render('admin_login', { title: 'Admin Login', error: 'Error during login!' });
        }

        if (rows.length === 0) {
            return res.render('admin_login', { title: 'Admin Login', error: 'Invalid login credentials!' });
            //this is the admin_login page if the user data is not in the database this will appear
        } else {
            // Successfully logged in as Admin
            res.render('admin', { title: 'Admin Dashboard' });
        }
    });
});

// Staff Login Processing
app.post('/staff/login', (req, res) => {
    const { username, password } = req.body;
    const query = `
        SELECT * FROM U_SER WHERE USERNAME = '${username}' AND PASSWORD = '${password}' AND USER_TYPE = 'staff'
    `;

    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.render('staff_login', { title: 'Staff Login', error: 'Error during login!' });
        }

        if (rows.length === 0) {
            return res.render('staff_login', { title: 'Staff Login', error: 'Invalid login credentials!' });
        } else {
            // Successfully logged in as Staff
            res.render('staff_dashboard', { title: 'Staff Dashboard', username: username });
        }
    });
});

// Start the server
const PORT = 65231;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
