import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import Slider from "react-slick";
import { useRef, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cx = classNames.bind(styles);

const VALUE = [
  {
    value: 1,
  },
  {
    value: 1,
  },
  {
    value: 1,
  },
  {
    value: 1,
  },
  {
    value: 1,
  },
  {
    value: 1,
  },
];

function Pagination() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 500,
  };


  return (
    <Slider {...settings}>
      <div>
        <h3>Slide 1</h3>
      </div>
      <div>
        <h3>Slide 2</h3>
      </div>
      <div>
        <h3>Slide 3</h3>
      </div>
    </Slider>
  );
}

export default Pagination;
