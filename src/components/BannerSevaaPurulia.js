import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bannersevaapurulia1 from '../assets/images/banner-sevaa-purulia1.jpg';
import bannersevaapurulia2 from '../assets/images/banner-sevaa-purulia2.jpg';
import bannersevaapurulia3 from '../assets/images/banner-sevaa-purulia3.jpg';

function BannerSevaaPurulia(){

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
            <img src={bannersevaapurulia1} alt="" />
          </div>
          <div>
            <img src={bannersevaapurulia2} alt="" />
          </div>
          <div>
            <img src={bannersevaapurulia3} alt="" />
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


export default BannerSevaaPurulia;