import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bannerrgvn1 from '../assets/images/banner-rgvn1.jpg';
import bannerrgvn2 from '../assets/images/banner-rgvn2.jpg';
import bannerrgvn3 from '../assets/images/banner-rgvn3.jpg';

function BannerRgvn(){

  const settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return(
    <>
      <div className="banner">
        <Slider {...settings}>
          <div>
            <img src={bannerrgvn1} alt="" />
          </div>
          <div>
            <img src={bannerrgvn2} alt="" />
          </div>
          <div>
            <img src={bannerrgvn3} alt="" />
          </div>
          {/* <div>
            <img src={banner4} alt="" />
          </div> */}
          {/* <div>
            <img src={imageData.banner1} alt="" />
          </div> */}
          {/* Add more slides here */}
        </Slider>
      </div>
    </>
  );
}


export default BannerRgvn;