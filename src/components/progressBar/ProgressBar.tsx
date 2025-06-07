import React from "react";
import useFetchHook from "../../hooks/useFetch";
const ProgressBarComponent = () => {
  const { data } = useFetchHook(
    "api/skips/by-location?postcode=NR32&area=Lowestoft"
  );

  console.log("---->>", data);
  return (
    <section>
      <p>hello wolrd</p>
    </section>
  );
};

export default ProgressBarComponent;
