import React from "react";

import style from "./Reviews.module.css";

const fakeData = {
  user: {
    id: "User id",
    name: "User name",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwcG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
    country: "User country 1",
    reviews: [
      {
        product: {
          name: "Product name 1",
          image: "",
          comment: { body: "User comment", score: 3 },
        },
      },
      {
        product: {
          name: "Product name 2",
          image: "",
          comment: { body: "User comment 2", score: 6 },
        },
      },
    ],
  },
};

export default function Reviews() {
  return (
    <div className={style.reviewContainer}>
      Reviews
      <div>
        {fakeData.user.reviews.map((ct) => {
          return (
            <div key={ct.product.name}>
              <div>
                <h2>{ct.product.name}</h2>
                <img src={ct.product.image} alt={ct.product.name} />
              </div>
              <div>
                <p>{ct.product.comment.body}</p>
                <span>Score: {ct.product.comment.score}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 1 Producto
// 2 Review
//    2.1 Usuario data (foto, nombre(link to profile))
//    2.2 Comentario
//        2.2.1 Respuestas
