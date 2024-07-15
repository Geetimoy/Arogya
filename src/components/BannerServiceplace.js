import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bannerserviceplace1 from '../assets/images/banner-serviceplace1.jpg';
import bannerserviceplace2 from '../assets/images/banner-serviceplace2.jpg';
import bannerserviceplace3 from '../assets/images/banner-serviceplace3.jpg';

function BannerServiceplace(){

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
            <img src={bannerserviceplace1} alt="" />
          </div>
          <div>
            <img src={bannerserviceplace2} alt="" />
          </div>
          <div>
            <img src={bannerserviceplace3} alt="" />
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


export default BannerServiceplace;