
import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleSoldOut = (id) => {
    // We'll implement this in the next step.
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <PlantList
        plants={filteredPlants}
        onSoldOut={handleSoldOut}
      />
    </main>
  );
}

export default PlantPage;
