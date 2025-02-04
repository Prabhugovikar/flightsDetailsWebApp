# Flight Status Board

## Overview

This is a fully-fledged React-based application built with TypeScript that mimics a real-time flight status board. It retrieves flight details from an API, updates the data at regular intervals, and allows users to view more detailed information about a specific flight.

## Features

1. **Flight Table**

   - Displays a list of flights in a table format.
   - Columns: Flight Number, Airline, Origin, Destination, Departure Time, Status, and Details.
   - Automatically fetches fresh data every 10 seconds.

2. **Flight Details View**

   - Clicking a flight row navigates to a detailed view.
   - Fetches comprehensive details of the selected flight.

3. **Navigation**

   - Uses React Router for smooth navigation between views.

4. **Error Handling**

   - Displays user-friendly error messages in case of network failure or unavailable flight details.

5. **Responsive and Clean UI**

   - Styled using CSS to ensure a clear and user-friendly design.
   - Mobile-friendly layout for smaller screens.

## Technologies Used

- **Language:** TypeScript
- **Framework:** React
- **State Management:** React Hooks (`useState`, `useEffect`)
- **HTTP Client:** Axios
- **Routing:** React Router
- **Testing:** Jest, React Testing Library

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/flight-status-board.git
   cd flight-status-board