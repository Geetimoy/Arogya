import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bannerb2h1 from '../assets/images/banner-b2h1.jpg';
import bannerb2h2 from '../assets/images/banner-b2h2.jpg';
import bannerb2h3 from '../assets/images/banner-b2h3.jpg';

function BannerB2h(){

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
            <img src={bannerb2h1} alt="" />
          </div>
          <div>
            <img src={bannerb2h2} alt="" />
          </div>
          <div>
            <img src={bannerb2h3} alt="" />
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


export default BannerB2h;