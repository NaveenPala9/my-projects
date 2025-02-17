import React ,{useEffect,useState}from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image1 from './img/A1.jpeg';
import image2 from './img/cp4.jpg';

const stories = [
  {
    image: image1,
    title: "Priyanka & Somonath",
    description:
      "Finding true love in today's fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways.",
  },
  {
    image: image1,
    title: "Shubham & Shruti",
    description:
      "Shubham and Shruti’s journey from strangers to life partners is a heartwarming tale of modern love facilitated by Shaadi.com. ",
  },
  {
    image: image1,
    title: "Habeeba & Alikhan",
    description:
      "I have married with Syed Habeeba from Nellore on 4.7.2024 Thursday. Thank you so much Shaadi.com owner and supporting all staffs",
  },
  {
    image: image2,
    title: "laila & majnu",
    description: "Finding true love in today's fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. ",
  },
  {
    image: image2,
    title: "chaitanya & shobitha",
    description: "Finding true love in today's fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. ",
  },
  {
    image: image2,
    title: "Naveen & DeepikaPadukone",
    description: "Finding true love in today's fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways.",
  },
];

//const StoryCarousel = () => {
  const StoryCarousel = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const getSizeStyles = () => {
      if (screenWidth < 576) {
        return { fontSize: '19px' };
      } else if (screenWidth < 800) {
        return { fontSize: '35px' };
      } else {
        return { fontSize: '35px' };
      }
    };
  
    const { fontSize } = getSizeStyles();
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1025 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div
      style={{
        padding: "0 50px", // Adds space to the left and right
        maxWidth: "1200px", // Ensures it doesn't stretch too wide on large screens
        margin: "0 auto", // Centers the entire carousel container
      }}
    >
        {/* Heading */}
        <h2 style={{ fontWeight:'500',fontFamily:'Raleway, sans-serif',fontSize: fontSize, color: "#ff5a60", margin: "60px 60px",textAlign:'center' }}>
         6 Million Success Stories & Counting
      </h2>
      <Carousel
        responsive={responsive}
        infinite={false}
        keyBoardControl={true}
        containerClass="carousel-container"
        showDots={true}
        removeArrowOnDeviceType={[]}
      >
        {stories.map((story, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              height: "350px", // Larger height for clearer display
              width: "95%",
              margin: "auto",
            }}
          >
            <img
              src={story.image}
              alt={story.title}
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h5 style={{ fontSize: "18px", margin: "10px 0" }}>{story.title}</h5>
            <p style={{ fontSize: "14px", textAlign: "center" }}>{story.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

//export default StoryCarousel;

export default StoryCarousel; 