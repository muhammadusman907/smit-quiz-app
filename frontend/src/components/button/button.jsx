import React from "react";

const Button = ({btnName, classAdd , ...prop }) => {

  return (
    <button className={`bg-primary text-white font-bold py-2 px-4 borde rounded ${classAdd}`} {...prop}>
      {btnName}
    </button>
  );
};

export default Button;
