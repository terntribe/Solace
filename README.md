
# Solace App API

This repository contains the API for the **Solace App**, a mental well-being application designed to help users manage their moods, assessments, reminders, and access personalized insights for their mental health.

## Table of Contents

- [API Overview](#api-overview)
- [Authentication](#authentication)
  - [Guest Login](#guest-login)
  - [User Signup](#user-signup)
  - [User Login](#user-login)
  - [User Logout](#user-logout)
- [Mood Management](#mood-management)
  - [Record Mood](#record-mood)
  - [Get Moods](#get-moods)
- [Assessment Management](#assessment-management)
  - [Submit Assessment](#submit-assessment)
  - [Get Assessments](#get-assessments)
- [Dashboard](#dashboard)
  - [Get Dashboard Data](#get-dashboard-data)
- [Reminder Management](#reminder-management)
  - [Create Reminder](#create-reminder)
  - [Get Reminders](#get-reminders)

## API Overview

The **Solace App API** exposes various endpoints that allow users to manage their moods, submit mental health assessments, set reminders, and access personalized dashboard insights.

The backend is built using **Node.js** with **Express.js** and **MongoDB** for data storage. All requests are handled via RESTful APIs, and user authentication is managed using JWT.

### Base URL

The base URL for the API is:

```
http://localhost:5000
```

## Authentication

### Guest Login

Allows a user to access the app temporarily as a guest. No personal data is required.

**Endpoint**: `/auth/guest-login`  
**Method**: `POST`

**Request Body**: (No input required)

**Example Response**:
```json
{
  "message": "Guest user created successfully",
  "guestId": "12345",
  "token": "your_jwt_token"
}
```

### User Signup

Creates a new user account with name, email, and password.

**Endpoint**: `/auth/signup`  
**Method**: `POST`

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Example Response**:
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "123456",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

### User Login

Authenticates a registered user using email and password.

**Endpoint**: `/auth/login`  
**Method**: `POST`

**Request Body**:
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Example Response**:
```json
{
  "message": "Login successful",
  "user": {
    "_id": "123456",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "token": "your_jwt_token"
}
```

### User Logout

Ends the user session by clearing tokens.

**Endpoint**: `/auth/logout`  
**Method**: `POST`

**Example Response**:
```json
{
  "message": "User logged out successfully"
}
```

## Mood Management

### Record Mood

Saves a user's current mood.

**Endpoint**: `/moods`  
**Method**: `POST`

**Request Body**:
```json
{
  "mood": "happy"
}
```

**Example Response**:
```json
{
  "message": "Mood recorded successfully"
}
```

### Get Moods

Retrieves all recorded moods for the user.

**Endpoint**: `/moods`  
**Method**: `GET`

**Example Response**:
```json
[
  {
    "_id": "1",
    "mood": "happy",
    "date": "2025-04-01T10:00:00Z"
  },
  {
    "_id": "2",
    "mood": "sad",
    "date": "2025-04-02T10:00:00Z"
  }
]
```

## Assessment Management

### Submit Assessment

Allows a user to submit a mental health assessment.

**Endpoint**: `/assessments`  
**Method**: `POST`

**Request Body**:
```json
{
  "answers": ["yes", "no", "yes"]
}
```

**Example Response**:
```json
{
  "message": "Assessment submitted successfully"
}
```

### Get Assessments

Retrieves previous assessments for the authenticated user.

**Endpoint**: `/assessments`  
**Method**: `GET`

**Example Response**:
```json
[
  {
    "_id": "1",
    "score": 85,
    "date": "2025-04-01T10:00:00Z"
  },
  {
    "_id": "2",
    "score": 90,
    "date": "2025-04-02T10:00:00Z"
  }
]
```

## Dashboard

### Get Dashboard Data

Provides personalized dashboard metrics and insights.

**Endpoint**: `/dashboard`  
**Method**: `GET`

**Example Response**:
```json
{
  "moodSummary": {
    "averageMood": "happy",
    "moodTrends": ["happy", "sad", "neutral"]
  },
  "assessmentInsights": {
    "averageScore": 87,
    "recentAssessment": {
      "score": 90,
      "date": "2025-04-02"
    }
  }
}
```

## Reminder Management

### Create Reminder

Adds a new reminder for the user.

**Endpoint**: `/reminders`  
**Method**: `POST`

**Request Body**:
```json
{
  "title": "Check-in with therapist",
  "time": "2025-04-05T10:00:00Z"
}
```

**Example Response**:
```json
{
  "message": "Reminder created successfully"
}
```

### Get Reminders

Fetch all reminders set by the user.

**Endpoint**: `/reminders`  
**Method**: `GET`

**Example Response**:
```json
[
  {
    "_id": "1",
    "title": "Check-in with therapist",
    "time": "2025-04-05T10:00:00Z"
  },
  {
    "_id": "2",
    "title": "Take a break",
    "time": "2025-04-06T14:00:00Z"
  }
]
```

## Contributing

If you'd like to contribute to the development of this API, please fork this repository, make your changes, and create a pull request. We welcome any contributions that improve the functionality or documentation of this project.
