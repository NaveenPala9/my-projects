import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="text-muted pt-4">
      <Container fluid> {/* Container fluid for full-width */}
        {/* Top Links Section */}
        <Row className="text-center mb-2">
          <Col>
            <p style={{ color: "#666", fontSize: "14px" }}>
              <a href="#" className="text-decoration-none text-primary">
                India
              </a>{" "}|{" "}
              <a href="#" className="text-decoration-none text-primary">
                USA
              </a>{" "}|{" "}
              <a href="#" className="text-decoration-none text-primary">
                Canada
              </a>{" "}|{" "}
              <a href="#" className="text-decoration-none text-primary">
                UK
              </a>{" "}|{" "}
              <a href="#" className="text-decoration-none text-primary">
                Singapore
              </a>{" "}|{" "}
              <a href="#" className="text-decoration-none text-primary">
                Australia
              </a>{" "}|{" "}
              <a href="#" className="text-decoration-none text-primary">
                UAE
              </a>{" "}|{" "}
              <a href="#" className="text-decoration-none text-primary">
                NRI Matrimonials
              </a>
            </p>
          </Col>
        </Row>

        {/* Trusted by Millions Section */}
        <Row className="text-center mb-1">
          <Col>
            <button className="btn btn-primary">Trusted by Millions</button>
          </Col>
        </Row>

        <hr
          style={{
            borderTop: "1.5px solid #4f4f4f",
            width: "70%",
            margin: "5px auto",
          }}
        />

        {/* Icons Section */}
        {/* Icons Section */}
{/* Icons Section */}
<Row className="justify-content-center align-items-center mb-3">
  <Col
    md={4}
    className="d-flex flex-row justify-content-center align-items-center"
    style={{ minHeight: "80px" }} // Ensures consistent height for all items
  >
    <i className="fas fa-heart fa-2x text-danger me-2"></i>
    <h6 className="mb-0">Best Matches</h6>
  </Col>
  <Col
    md={4}
    className="d-flex flex-row justify-content-center align-items-center"
    style={{ minHeight: "80px" }} // Ensures consistent height for all items
  >
    <i className="fas fa-check-circle fa-2x text-danger me-2"></i>
    <h6 className="mb-0">Verified Profiles</h6>
  </Col>
  <Col
    md={4}
    className="d-flex flex-row justify-content-center align-items-center"
    style={{ minHeight: "80px" }} // Ensures consistent height for all items
  >
    <i className="fas fa-lock fa-2x text-danger me-2"></i>
    <h6 className="mb-0">100% Privacy</h6>
  </Col>
</Row>




        <hr
          style={{
            borderTop: "1.5px solid #4f4f4f",
            width: "70%",
            margin: "0px auto",
          }}
        />

        {/* Footer Links Section */}
        <Row className="text-center text-md-center mt-4">
          <Col md={3} className="d-none d-md-block">
            <h6>Need Help?</h6>
            <hr />
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Member Login
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Sign Up
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Partner Search
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Premium Memberships
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  How to Use Shaadi.com
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Site Map
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} className="d-none d-md-block">
            <h6>Company</h6>
            <hr />
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Shaadi Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Awards & Recognition
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Cov-Aid
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} className="d-none d-md-block">
            <h6>Privacy & You</h6>
            <hr />
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Be Safe Online
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Report Misuse
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} className="d-none d-md-block">
            <h6>More</h6>
            <hr />
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  VIP Shaadi
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Select Shaadi
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Sangam
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Shaadi Centres
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Shaadi Live
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row
          className="mt-4"
          style={{
            backgroundColor: "whitesmoke",  // Change background to whitesmoke
            width: "100%",                // Ensure full width
            padding: "20px 0",              // Increase height by adding padding
            margin: "0",                    // Remove any default margin
          }}
        >
          <Col xs={12} md={6} lg={6} className=" text-lg-right" style={{ fontSize: "14px" }}>
            <p>
              &copy; 1996-2024 Shaadi.com - The World's Leading Matchmaking Service™
            </p>
          </Col>
          <Col xs={12} md={6} lg={6} className=" text-lg-end">
            <p style={{ marginBottom: "0", fontSize: "14px" }}>
              Passionately created by People Group➤
            </p>
          </Col>
        </Row>
      </Container> {/* Close the Container fluid here */}
    </footer>
  );
}

export default Footer;