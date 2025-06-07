import React from "react";
import ProgressBarComponent from "./components/progressBar/progressBar";
import SkipCard from "./components/skipCard/SkipCard";
import SkipCardDetails from "./components/skipDetailsCard/SkipDetailCard";

const App = () => {
  return (
    <main>
      <ProgressBarComponent />
      <SkipCard />
      <SkipCardDetails />
    </main>
  );
};

export default App;
