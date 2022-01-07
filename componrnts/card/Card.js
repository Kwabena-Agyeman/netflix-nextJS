/** @format */

import React from "react";
import Image from "next/image";

const Card = ({ imgUrl, size }) => {
  return (
    <div>
      Card
      <Image src={imgUrl} alt='image' width={300} height={300} />
    </div>
  );
};

export default Card;
