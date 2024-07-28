# Employee Time Clock

This is a Time Clock application built with Node.js, Express, MongoDB, and EJS. It allows employees to clock in, clock out, and manage their breaks and lunches. The application also provides an interface to view employee attendance and a list of employees.

## Features

- Clock In / Clock Out
- Start / End Break
- Start / End Lunch
- View Employee Attendance
- View Employee List

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account or a local MongoDB instance

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/employee-time-clock.git
cd employee-time-clock
```

2. Install dependencies:

```bash
npm install
```

3. Configure MongoDB connection:

- Replace the MongoDB connection URI in `app.js` with your MongoDB connection string:

```javascript
const uri = 'your-mongodb-connection-string';
```

4. Start the server:

```bash
npm start
```

The server will start running at `http://localhost:3000`.

### Project Structure

- `views/`: Contains the EJS templates for the application
  - `header.ejs`: Common header for navigation
  - `index.ejs`: Home page
  - `attendance.ejs`: Employee attendance page
  - `employees.ejs`: Employee list page
- `app.js`: Main application file with routes and logic
- `package.json`: Project metadata and dependencies

### Usage

- Visit the Home page at `http://localhost:3000` to clock in, clock out, and manage breaks and lunches.
- Navigate to the Employee Attendance page to view attendance records.
- Navigate to the Employee List page to view the list of employees.

### Routes

- `GET /`: Home page with forms for clocking in, starting and ending breaks/lunches, and clocking out.
- `GET /attendance`: Employee attendance page showing attendance records.
- `GET /employees`: Employee list page showing a list of employees.
- `POST /clockin`: Route to handle clocking in.
- `POST /startbreak`: Route to handle starting a break.
- `POST /endbreak`: Route to handle ending a break.
- `POST /startlunch`: Route to handle starting lunch.
- `POST /endlunch`: Route to handle ending lunch.
- `POST /clockout`: Route to handle clocking out.

### Dependencies

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment
- `body-parser`: Node.js body parsing middleware
- `ejs`: Embedded JavaScript templates
- `moment-timezone`: Parse, validate, manipulate, and display dates and times in JavaScript

### License

This project is licensed under the MIT License - see the `LICENSE` file for details.

### Author

Jordan Calvert
```

Make sure to replace placeholders like `your-username` and `your-mongodb-connection-string` with your actual information.
