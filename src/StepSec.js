import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FaPen, FaUserCheck, FaComments } from 'react-icons/fa';

function StepsSection() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSizeStyles = () => {
    if (screenWidth < 576) {
      return { fontSize: '19px', iconSize: '40px', circleSize: '60px', numberSize: '20px',cfont:'18px',dfont:'12px' };
    } else if (screenWidth < 800) {
      return { fontSize: '35px', iconSize: '80px', circleSize: '100px', numberSize: '24px',cfont:'24px',dfont:'16px' };
    } else  {
      return { fontSize: '35px', iconSize: '90px', circleSize: '130px', numberSize: '24px', cfont:'24px',dfont:'16px' };
    }
  };

  const { fontSize, iconSize, circleSize, numberSize ,cfont,dfont} = getSizeStyles();

  return (
    <Container className="text-center my-5">
      <h2 
        style={{ fontWeight: '500', fontSize: fontSize, color: '#ff5a60', marginBottom: '80px', fontFamily: 'Raleway, sans-serif',marginTop:'100px'}}
      >
        Find your Special Someone
      </h2>
      
      <Row className="mt-4">
        {[
          { icon: <FaPen />, title: "Sign Up", description: "Register for free & put up your Matrimony Profile", number: 1 },
          { icon: <FaUserCheck />, title: "Connect", description: "Select & Connect with Matches you like", number: 2 },
          { icon: <FaComments />, title: "Interact", description: "Become a Premium Member & Start a Conversation", number: 3 }
        ].map((step, index) => (
          <Col key={index} xs={12} md={4} className="d-flex flex-column align-items-center mb-4 mb-md-0">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div
                style={{
                  width: circleSize,
                  height: circleSize,
                  backgroundColor: '#00bcd5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: iconSize,
                  color: 'white',
                  marginBottom: '10px',
                  position: 'relative'
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: -5,
                  right: '50%',
                  transform: 'translate(50%, 0)',
                  width: numberSize,
                  height: numberSize,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff5a60',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: '1px solid #ff5a60'
                }}
              >
                {step.number}
              </div>
            </div>
            <h5 style={{ color: '#00bcd5', fontSize: cfont, marginTop: '40px' }}>
              {step.title}
            </h5>
            <p style={{ fontSize: dfont, textAlign: 'center', fontFamily: 'Roboto, sans-serif', color: '#72727d' }}>
              {step.description}
            </p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default StepsSection;
