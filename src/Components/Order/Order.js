import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import "animate.css";
const Order = () => {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const { user } = useAuth();
  const [place, setPlace] = useState([]);
  const url = `https://frozen-scrubland-07900.herokuapp.com/places/${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPlace(data));
  }, []);

  const onSubmit = (data) => {
    data.tourName = place.name;
    data.status = "pending";
    data.img = place.img;

    fetch("https://frozen-scrubland-07900.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          alert("we are collected your tour plan, please wait for approval");
          reset();
        }
      });
  };
  return (
    <div className="form-container animate__bounce">
      <div>
        <h1>Order {place.name}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("tourName")}
            required
            placeholder="tour name"
            defaultValue={place.name || ""}
            readOnly
          />
          <input
            {...register("name")}
            required
            placeholder="your name"
            defaultValue={user.displayName}
            readOnly
          />
          <input
            {...register("email")}
            required
            placeholder="your email"
            defaultValue={user.email}
          />
          <input
            {...register("phone")}
            required
            placeholder="your phone number"
          />
          <input
            {...register("address")}
            required
            placeholder="your parmanent address"
          />

          <input type="submit" value="place order" />
        </form>
      </div>
    </div>
  );
};

export default Order;
