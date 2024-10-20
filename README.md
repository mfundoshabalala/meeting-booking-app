# Meeting Booking Application

A full-stack meeting booking application using Angular for the frontend, Express.js for the backend, and SQLite for the database.

## Description

This project is a web-based meeting room booking application that allows users to:

- View a list of scheduled meetings.
- Create new meetings.
- Edit and update meeting details.
- Delete meetings.

The application is built using Angular for the frontend, and a REST API with Express.js and TypeScript for the backend. The SQLite in-memory database is used for storing meeting information.

## Features

- List all scheduled meetings.
- Add new meetings with title, name, start and end times, status, and room.
- Edit existing meetings.
- Delete meetings.
- Validation for meeting creation and updates.

## Technologies Used

- **Frontend**: Angular, TypeScript, TailwindCSS
- **Backend**: Express.js, TypeScript
- **Database**: SQLite (In-memory)
- **Others**: Jest (for testing), CORS

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (can be installed globally with `npm install -g @angular/cli`)

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/mfundoshabalala/meeting-booking-app.git
cd meeting-booking-app
```

### Step 2: Install the backend and frontend dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Step 3: Start the backend server

```bash
cd backend
npx ts-node src/index.ts
```

### Step 4: Start the Angular frontend

```bash
cd ../frontend
ng serve
```

### Step 5: Access the application

Open your browser and navigate to: <http://localhost:4200/meetings>

## Usage

Once both the backend and frontend are running:

1. **Open the application** in your browser at: `http://localhost:4200/meetings`.

2. **Manage Meetings**:
   - View all meetings.
   - Add a new meeting using the "Add New Meeting" button.
   - Edit or delete an existing meeting.

## Testing

To run the backend unit tests:

### **Backend Tests**

```bash
cd backend
cd npm test

```

### **Fontend Tests**

```bash
cd frontend
cd npm test

```

## Feature Highlight

### Unique Feature: Meeting Room Filter

This application includes a unique feature that allows users to filter meetings by the selected meeting room. A dropdown has been added on the meeting list page to filter meetings based on room selection.

### ES5 Pure Function

The following function is an ES5 pure function that formats a JavaScript Date object into a `YYYY-MM-DD` string:

```javascript
// ES5 Pure function to format a date
function formatDateES5(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}
