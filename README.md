# STARSTAY PROJECT

## Overview
`STARSTAY` is a hotel booking application built using **React Native** for the frontend and **Node.js** for the backend. It features hotel booking, login functionality, and booking history for users. The project includes two main parts:

1. **hotel-backend**: A Node.js backend that handles API requests for user authentication, hotel booking, and booking history.
2. **hotelUserApp**: A React Native mobile app for users to log in, view available hotels, and book hotels.

## Technologies Used

- **Frontend**: React Native (with TypeScript)
- **Backend**: Node.js
- **Database**: MongoDB (via MongoDB Atlas)
- **API Testing**: Postman
- **App Testing**: Android Simulator

## Features

- **Login functionality**: Users can log in with their username and password.
- **Hotel Booking**: Users can view available hotels and make bookings for selected dates.
- **Booking History**: Users can view their past hotel bookings.
- **test folder**:   having test cases

## Folder Structure

The project is divided into two parts:

1. **hotel-backend**: Contains the Node.js backend code.
   - Includes the API routes for handling user authentication and hotel bookings.
   - Configurations for MongoDB Atlas and other backend services.

2. **hotelUserApp**: Contains the React Native app code.
   - Includes UI screens for login, booking, and booking history.
   - Uses TypeScript for static typing and enhanced development experience.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14 or above)
- **MongoDB Atlas** (for database)
- **React Native CLI**
- **Android Studio** (for Android simulator)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rakshita1828/STARSTAY.git
cd STARSTAY

## SET UP BACKEND
cd hotel-backend
npm install
npm run dev




# SET UP FRONTEND
 cd hotelUserApp
  npm install
 npx react-native run-android






