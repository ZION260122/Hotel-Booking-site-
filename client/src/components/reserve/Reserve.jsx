import "./reserve.css";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data, loading, error } = useFetch(`/hotels/${hotelId}/rooms`);

  const handleSelect = (roomId) => {
    setSelectedRooms((prev) => {
      if (prev.includes(roomId)) {
        return prev.filter((id) => id !== roomId);
      } else {
        return [...prev, roomId];
      }
    });
  };

  const handleClick = () => {
    // Handle the reservation logic here
    console.log("Selected Rooms:", selectedRooms);
    setOpen(false); // Close the modal after booking
  };

  return (
    <div className="reserveContainer">
      <h1>Select Your Rooms</h1>
      {loading ? (
        "Loading..."
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div className="roomList">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((room) => (
              <div className="room" key={room._id}>
                <span className="roomName">{room.name}</span>
                <span className="roomPrice">${room.price}</span>
                <button
                  className={`selectButton ${
                    selectedRooms.includes(room._id) ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(room._id)}
                >
                  {selectedRooms.includes(room._id) ? "Deselect" : "Select"}
                </button>
              </div>
            ))
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      )}
      <button onClick={handleClick}>Reserve Now</button>
      <button onClick={() => setOpen(false)}>Cancel</button>
    </div>
  );
};

export default Reserve;
