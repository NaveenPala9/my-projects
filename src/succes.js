import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import image1 from './img/cp3.jpg'

const SuccessStoriesCarousel = () => {
  const stories = [
    {
      title: "Priyanka & Somonath",
      description:
        "Finding true love in today's fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways.",
      imgSrc: image1, // Replace with actual image URL
    },
    {
      title: "Shubham & Shruti",
      description:
        "Shubham and Shruti's journey from strangers to life partners is a heartwarming tale of modern love facilitated by Shaadi.com.",
      imgSrc: image1,
    },
    {
      title: "Habeeba & Alikhan",
      description:
        "I have married with Syed Habeeba from Nellore on 4.7.2024 Thursday. Thank you so much Shaadi.com owner and supporting all staff.",
      imgSrc: image1,
    },
    {
      title: "Couple 4",
      description: "Description for couple 4",
      imgSrc: image1,
    },
    {
      title: "Couple 5",
      description: "Description for couple 5",
      imgSrc: image1,
    },
    {
      title: "Couple 6",
      description: "Description for couple 6",
      imgSrc: image1,
    },
  ];

  // Split stories into groups of 3
  const groups = [];
  for (let i = 0; i < stories.length; i += 3) {
    groups.push(stories.slice(i, i + 3));
  }

  return (
    <Container fluid className="mt-4">
      <Carousel indicators={false} interval={null}>
        {groups.map((group, index) => (
          <Carousel.Item key={index}>
            <Row className="d-flex justify-content-center">
              {group.map((story, idx) => (
                <Col
                  key={idx}
                  xs={12}
                  sm={6}
                  md={4}
                  className="d-flex justify-content-center"
                  style={{ marginBottom: "15px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "white",
                      width: "100%",
                      maxWidth: "300px",
                    }}
                  >
                    <img
                      src={story.imgSrc}
                      alt={`${story.title} image`}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ padding: "10px" }}>
                      <h5 style={{ fontSize: "16px", margin: "10px 0" }}>
                        {story.title}
                      </h5>
                      <p style={{ fontSize: "14px", color: "#555" }}>
                        {story.description}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default SuccessStoriesCarousel;
