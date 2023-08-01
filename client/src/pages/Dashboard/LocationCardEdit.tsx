import { useParams } from "react-router-dom";

export default function LocationCardEdit(prop: any) {
  const location = useParams();
  console.log(location["location"]);
  return <div>This is the {location["location"]} edit page</div>;
}
