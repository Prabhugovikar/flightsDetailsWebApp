import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom'
import { API_URL } from "../Service";
import { ClipLoader } from "react-spinners";

export default function Flightsdetails() {
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const flightId = location?.state;
  useEffect(() => {
    fetchFlightDetails();
  }, [flightId]);

  const fetchFlightDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${flightId}`);
      console.log('flight details', response.data);
      setFlight(response.data);
    } catch (err) {
      setError("Flight details not available.");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="container">
      <button className="back-link" onClick={() => navigate(-1)}>
        &larr; Back to Flights
      </button>
      <div className="flight-card fade-in">
        <h2>Flight {flight.flightNumber} Details</h2>
        <div className="flight-info">
          <p><strong>Airline:</strong> {flight.airline}</p>
          <p><strong>Origin:</strong> {flight.origin}</p>
          <p><strong>Destination:</strong> {flight.destination}</p>
          <p><strong>Departure Time:</strong> {formatDate(flight.departureTime)}</p>
          <p>
            <strong>Status:</strong>
            <span className={`status ${flight?.status.replace(" ", "").toLowerCase()}`}>
              {flight.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
