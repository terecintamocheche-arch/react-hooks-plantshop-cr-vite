
import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all plants when the page loads
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch plants");
        }
        return response.json();
      })
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  // Add a new plant to the list
  const handleAddPlant = (newPlant) => {
    setPlants((previousPlants) => [...previousPlants, newPlant]);
  };

  // Mark a plant as sold out
  const handleSoldOut = (id) => {
    setPlants((previousPlants) =>
      previousPlants.map((plant) =>
        plant.id === id ? { ...plant, soldOut: true } : plant
      )
    );
  };

  // Filter plants according to the search term
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
