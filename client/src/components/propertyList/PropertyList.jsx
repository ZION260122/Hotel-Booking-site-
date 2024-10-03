import "./propertyList.css";
import { useFetch } from "../../hooks/useFetch";
import PropertyItem from "../propertyItem/PropertyItem"; // Assuming you have a PropertyItem component

const PropertyList = () => {
  const { data, loading, error } = useFetch("/properties");

  return (
    <div className="propertyListContainer">
      <h1>Available Properties</h1>
      {loading ? (
        "Loading..."
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div className="propertyList">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((property) => (
              <PropertyItem property={property} key={property._id} />
            ))
          ) : (
            <p>No properties available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
