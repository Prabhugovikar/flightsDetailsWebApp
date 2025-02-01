import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Service";
import { ClipLoader } from "react-spinners";


export default function AllFlights() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const path = (id) => {
    navigate('/flightsDetails', {
      state: id
    })
  }
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(API_URL);
        setFlights(response.data);
      } catch (err) {
        setError("Failed to fetch flight data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 50000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (error) return <p className="error">{error}</p>;
  if (loading) return <ClipLoader color="#007bff" size={50} />;
  return (
    <div className="flight-container">
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flights?.map((flight) => (
            <tr key={flight?.id} onClick={() => path(flight?.id)} className="fade-in">
              <td>{flight?.flightNumber}</td>
              <td>{flight?.airline}</td>
              <td>{flight?.origin}</td>
              <td>{flight?.destination}</td>
              <td>{formatDate(flight?.departureTime)}</td>
              <td>
                <p>
                  <span className={`status ${flight?.status.replace(" ", "").toLowerCase()}`}>
                    {flight?.status}
                  </span>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
