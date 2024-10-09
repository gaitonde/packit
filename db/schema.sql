-- Create Users table
CREATE TABLE PackIT_Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255)
);

-- Create Trips table
CREATE TABLE PackIT_Trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    low_weather DECIMAL(5,2) NOT NULL,
    high_weather DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES PackIT_Users(id) ON DELETE CASCADE
);

-- Create Activities table
CREATE TABLE PackIT_Activities (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES PackIT_Trips(id) ON DELETE CASCADE
);

-- Create PackingItems table
CREATE TABLE PackIT_PackingItems (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER NOT NULL,
    text VARCHAR(255) NOT NULL,
    is_packed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (activity_id) REFERENCES PackIT_Activities(id) ON DELETE CASCADE
);

-- Create indexes for foreign keys to improve query performance
CREATE INDEX idx_packit_trips_user_id ON PackIT_Trips(user_id);
CREATE INDEX idx_packit_activities_trip_id ON PackIT_Activities(trip_id);
CREATE INDEX idx_packit_packingitems_activity_id ON PackIT_PackingItems(activity_id);