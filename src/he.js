import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import img1 from './img/cp4.jpg';

const ImageCarousel = () => {
  const data = [
    {
      imgSrc: img1,
      title: 'Priyanka & Somonath',
      description:
        "Finding true love in today's fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. M...",
    },
    {
      imgSrc: img1,
      title: 'Shubham & Shruti',
      description:
        "Shubham and Shruti's journey from strangers to life partners is a heartwarming tale of modern love facilitated by Shaadi.com. Their story is...",
    },
    {
      imgSrc: img1,
      title: 'Habeeba & Alikhan',
      description:
        "I have married with Syed Habeeba from Nellore on 4.7.2024 Thursday. Thank you so much Shaadi.com owner and supporting all staffs. Jazakallah khair...",
    },
    {
      imgSrc: img1,
      title: 'Another Couple 1',
      description: 'Sample description for another couple.',
    },
    {
      imgSrc: img1,
      title: 'Another Couple 2',
      description: 'Sample description for another couple.',
    },
    {
      imgSrc: img1,
      title: 'Another Couple 3',
      description: 'Sample description for another couple.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3;
  const totalItems = data.length;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px auto', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {currentIndex > 0 && (
          <Button
            onClick={handlePrev}
            style={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {'<'}
          </Button>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            gap: '10px',
          }}
        >
          {data.slice(currentIndex, currentIndex + itemsPerPage).map((item, idx) => (
            <div
              key={idx}
              style={{
                width: '30%',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <h5 style={{ marginTop: '10px' }}>{item.title}</h5>
              <p style={{ fontSize: '0.9em', color: '#555' }}>{item.description}</p>
            </div>
          ))}
        </div>
        {currentIndex + itemsPerPage < totalItems && (
          <Button
            onClick={handleNext}
            style={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {'>'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
