
import React, { useState } from "react";

function PlantCard({ plant, onSoldOut }) {
  const [soldOut, setSoldOut] = useState(false);

  function handleClick() {
    setSoldOut(true);
    onSoldOut(plant.id);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>

      {soldOut ? (
        <button disabled>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleClick}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
