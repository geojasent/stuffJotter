import { useState, useEffect } from "react";

const LocationCard = (prop: any) => {
  const [card, setCard] = useState(prop);
  return <div>The data is: {card.areas}</div>;
};

export default LocationCard;
