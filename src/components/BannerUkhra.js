import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bannerukhra1 from '../assets/images/banner-ukhra1.jpg';
import bannerukhra2 from '../assets/images/banner-ukhra2.jpg';
import bannerukhra3 from '../assets/images/banner-ukhra3.jpg';

function BannerUkhra(){

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
            <img src={bannerukhra1} alt="" />
          </div>
          <div>
            <img src={bannerukhra2} alt="" />
          </div>
          <div>
            <img src={bannerukhra3} alt="" />
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


export default BannerUkhra;