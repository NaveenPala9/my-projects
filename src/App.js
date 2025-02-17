import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FiHelpCircle } from 'react-icons/fi';
import backgroundImage from './img/cp5.jpg';
import logo from './img/lg.png';
import Banner from './Box';
import StepsSection from './StepSec';
import StoryCarousel from './carousel';
import Footer from './Footer';
import StudentsTable from './details';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false); // Track help popup state
  const [showDetails, setShowDetails] = useState(false); // Track details state

  const [loginCredentials, setLoginCredentials] = useState({ mobileOrEmail: '', password: '' });
  
  // Function to toggle the Help popup
  const toggleHelpPopup = () => setIsHelpPopupOpen(!isHelpPopupOpen);

  // Handle Login - Check credentials with the backend
  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:3000/login', {
        params: {
          mobileOrEmail: loginCredentials.mobileOrEmail,
          password: loginCredentials.password,
        },
      });

      if (response.data.success) {
        setIsLoggedIn(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

 

  return (
    <>
      {!isLoggedIn ? (
        // Login Modal displayed if the user is not logged in
        <Modal show centered>
          <Modal.Header>
            <Modal.Title>Welcome back! Please Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Mobile No. / Email ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile no. / Email ID"
                  value={loginCredentials.mobileOrEmail}
                  onChange={(e) =>
                    setLoginCredentials({ ...loginCredentials, mobileOrEmail: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={loginCredentials.password}
                  onChange={(e) =>
                    setLoginCredentials({ ...loginCredentials, password: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                className="w-100 mt-3"
                onClick={handleLogin} // Log in the user
              >
                Login
              </Button>
              <p className="text-center mt-3">OR</p>
              <Button variant="outline-primary" type="button" className="w-100">
                Login with OTP
              </Button>
              <p className="text-center mt-4">
                New to Shaadi?{' '}
                <a>
                  Sign Up Free
                </a>
              </p>
            </Form>
          </Modal.Body>
        </Modal>
      ) : showDetails ? (
        <StudentsTable />
      ) : (
        // Main Content displayed after logging in
        <>
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '91vh',
              position: 'relative',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backgroundBlendMode: 'overlay',
            }}
          >
            <Container
              fluid
              className="h-100 d-flex flex-column justify-content-center align-items-center text-center"
            >
              {/* Logo */}
              <div
                className="position-absolute"
                style={{ top: '30px', left: '20px' }}
              >
                <img
                  src={logo}
                  alt="shaadi.com logo"
                  className="img-fluid"
                  style={{ width: '100px', maxWidth: '25vw' }}
                />
              </div>

              {/* Main Heading */}
              <div style={{ marginTop: '400px' }}>
                <h1 className="display-4 mt-5" style={{ fontSize: '32px' }}>
                  The World's No.1 Matchmaking Service
                </h1>
                <p className="lead mb-4">Search by City, Profession & Community</p>
              </div>

              {/* Search Form */}
              <Row
                className="p-3 rounded mx-1"
                style={{ width: '80%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <Col xs={12} sm={6} md={2} className="mb-2">
                  <Form.Select aria-label="Looking for">
                    <option>I'm looking for a</option>
                    <option value="1">Woman</option>
                    <option value="2">Man</option>
                  </Form.Select>
                </Col>
                <Col xs={6} sm={3} md={2} className="mb-2">
                  <Form.Control type="number" placeholder="Aged" />
                </Col>
                <Col xs={6} sm={3} md={2} className="mb-2">
                  <Form.Control type="number" placeholder="to" />
                </Col>
                <Col xs={12} sm={6} md={2} className="mb-2">
                  <Form.Select aria-label="Religion">
                    <option>of religion</option>
                    <option value="1">Religion 1</option>
                    <option value="2">Religion 2</option>
                  </Form.Select>
                </Col>
                <Col xs={12} sm={6} md={3} className="mb-2">
                  <Form.Select aria-label="Mother tongue">
                    <option>and mother tongue</option>
                    <option value="1">Language 1</option>
                    <option value="2">Language 2</option>
                  </Form.Select>
                </Col>
                <Col xs={12} className="text-center mt-3">
                  <Button variant="primary" size="lg">
                    Let's Begin
                  </Button>
                </Col>
              </Row>

              {/* Login, Help, and Details Buttons */}
              <div
                className="position-absolute d-flex align-items-center"
                style={{ top: '20px', right: '20px', zIndex: 2, gap: '15px' }}
              >
                <Button variant="link" className="text-white fs-4 px-3">
                  Login
                </Button>

                {/* Help Button */}
                <Button
                  variant="link"
                  onClick={toggleHelpPopup}
                  className="text-white fs-4 px-3"
                >
                  <FiHelpCircle /> Help
                </Button>

                {/* Details Button */}
                <Button
                  variant="link"
                  className="text-white fs-4 px-3"
                  onClick={() => setShowDetails(true)}
                >
                  Details
                </Button>
              </div>
            </Container>
          </div>

          {/* Content below the hero section */}
          <div style={{ backgroundColor: 'whitesmoke' }}>
            <Banner />
            <StepsSection />
          </div>
          <StoryCarousel />
          <div style={{ marginTop: '100px' }}>
            <Footer />
          </div>
        </>
      )}


      {/* Help Popup */}
      <Modal show={isHelpPopupOpen} onHide={toggleHelpPopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Need Help?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We're here to assist you with any questions or concerns!</p>
          <Button variant="secondary" onClick={toggleHelpPopup}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
