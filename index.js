
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const pool = require('./db'); // Import database connection
const app = express();


const multer = require('multer');
const path = require('path');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder where PDFs will be stored
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create `uploads` folder if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}


// Sample route to check server status
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});



// Route to handle login
app.get('/login', async (req, res) => {
  const { mobileOrEmail, password } = req.query; // Extract data from query parameters

  try {
    const query = `
      SELECT * FROM users WHERE (email = $1 OR mobile = $1) AND password = $2
    `;
    const result = await pool.query(query, [mobileOrEmail, password]);

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to handle signup
app.post('/signup', async (req, res) => {
  const { mobile, username, email, password } = req.body;

  // Validate input
  if (!mobile || !username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const checkQuery = `
      SELECT * FROM users WHERE email = $1 OR mobile = $2
    `;
    const existingUser = await pool.query(checkQuery, [email, mobile]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or mobile already exists',
      });
    }

    // Insert new user
    const insertQuery = `
      INSERT INTO users (mobile, username, email, password) VALUES ($1, $2, $3, $4)
    `;
    await pool.query(insertQuery, [mobile, username, email, password]);

    res.json({
      success: true,
      message: 'Signup successful! You can now log in.',
    });
  } catch (err) {
    console.error('Error in signup route:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


//GET API to fetch students with pagination and search functionality
app.get('/api/students', async (req, res) => {
  const { page = 1, limit = 5, search = '' } = req.query; // Default: page 1, 5 items per page, empty search query
  const offset = (page - 1) * limit; // Calculate the offset for the query

  try {
    // Fetch students with LIMIT, OFFSET, and optional search query
    const studentsQuery = `
      SELECT id, name, TO_CHAR(date, 'YYYY-DD-MM') AS date, address, pdf
      FROM students
      WHERE name ILIKE $1
      ORDER BY id ASC
      LIMIT $2 OFFSET $3
    `;
    const studentsResult = await pool.query(studentsQuery, [`%${search}%`, limit, offset]);

    // Get the total number of students matching the search query
    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM students
      WHERE name ILIKE $1
    `;
    const countResult = await pool.query(countQuery, [`%${search}%`]);

    const totalItems = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      students: studentsResult.rows, // Students for the current page
      totalItems,                   // Total number of matching students
      totalPages,                   // Total pages for matching students
      currentPage: parseInt(page),  // Current page number
    });
  } catch (err) {
    console.error('Error fetching students with pagination and search:', err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
}); 


// Insert a new student
app.post('/api/students', upload.single('pdf'), async (req, res) => {
  const { name, date, address } = req.body;
  const pdf = req.file ? req.file.filename : null;

  try {
      const result = await pool.query(
          'INSERT INTO students (name, date, address, pdf) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, date, address, pdf]
      );
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert student' });
  }
});

// Update an existing student
app.put('/api/students/:id', upload.single('pdf'), async (req, res) => {
  const { id } = req.params;
  const { name, date, address } = req.body;
  const pdf = req.file ? req.file.filename : null;

  try {
      // If a new PDF is uploaded, update it; otherwise, keep the old one
      const currentStudent = await pool.query('SELECT pdf FROM students WHERE id = $1', [id]);
      const updatedPdf = pdf || currentStudent.rows[0].pdf;

      const result = await pool.query(
          'UPDATE students SET name = $1, date = $2, address = $3, pdf = $4 WHERE id = $5 RETURNING *',
          [name, date, address, updatedPdf, id]
      );
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update student' });
  }
});

// Delete a student
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
      // Delete the student's associated PDF file if it exists
      const currentStudent = await pool.query('SELECT pdf FROM students WHERE id = $1', [id]);
      const pdfPath = currentStudent.rows[0].pdf;

      if (pdfPath) {
          fs.unlinkSync(path.join(__dirname, 'uploads', pdfPath));
      }

      await pool.query('DELETE FROM students WHERE id = $1', [id]);
      res.status(204).send(); // No content
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete student' });
  }
});


// Route to handle PDF download
app.get('/api/students/:id/download', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await pool.query('SELECT pdf FROM students WHERE id = $1', [id]);

        if (student.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const filePath = path.join(__dirname, 'uploads', student.rows[0].pdf);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.download(filePath);
    } catch (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ error: 'Failed to download file' });
    }
});




// Database connection check
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully:', res.rows[0].now);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 






