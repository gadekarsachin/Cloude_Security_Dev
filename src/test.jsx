// import React, { useRef, useEffect } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import image1 from '../src/assets/images/image1.jpg';
// import image2 from '../src/assets/images/image2.jpg';
// import image3 from '../src/assets/images/image3.jpg';
// const MyCarousel = () => {

//   const carouselRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       carouselRef.current.next();
//     }, 100); // Rotate every 5 seconds

//     return () => {
//       clearInterval(interval); // Clear the interval when the component unmounts
//     };
//   }, []);


//   return (
//     <Carousel autoPlay={false} ref={carouselRef}>
//       <div>
//         <img src={image1} alt="Image 1" />
//         <p className="legend">Legend 1</p>
//       </div>
//       <div>
//         <img src={image2} alt="Image 2" />
//         <p className="legend">Legend 2</p>
//       </div>
//       <div>
//         <img src={image3} alt="Image 3" />
//         <p className="legend">Legend 3</p>
//       </div>
//     </Carousel>
//   );
// };

// export default MyCarousel;



import image1 from '../src/assets/images/image1.jpg';
import image2 from '../src/assets/images/image2.jpg';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyCarousel = () => {
  return (
    <Carousel autoPlay interval={200}>
      <div>
        <img src={image1} alt="Image 1" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={image2} alt="Image 2" />
        <p className="legend">Legend 2</p>
      </div>
   
    </Carousel>
  );
};

export default MyCarousel;
