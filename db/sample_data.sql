-- Insert a sample user
INSERT INTO PackIT_Users (id, email, name)
VALUES (1, 'john.doe@example.com', 'John Doe');

-- Insert a sample trip
INSERT INTO PackIT_Trips (id, user_id, start_date, end_date, location, low_weather, high_weather)
VALUES (1, 1, '2023-07-01', '2023-07-07', 'Beach Resort', 70.5, 85.3);

-- Insert sample activities
INSERT INTO PackIT_Activities (id, trip_id, name) VALUES
(1, 1, 'Beach Day'),
(2, 1, 'Hiking'),
(3, 1, 'City Tour');

-- Insert sample packing items for Beach Day
INSERT INTO PackIT_PackingItems (activity_id, text, is_packed) VALUES
(1, 'Swimsuit', false),
(1, 'Sunscreen', false),
(1, 'Beach Towel', false),
(1, 'Sunglasses', false);

-- Insert sample packing items for Hiking
INSERT INTO PackIT_PackingItems (activity_id, text, is_packed) VALUES
(2, 'Hiking Boots', false),
(2, 'Water Bottle', false),
(2, 'Trail Mix', false),
(2, 'First Aid Kit', false);

-- Insert sample packing items for City Tour
INSERT INTO PackIT_PackingItems (activity_id, text, is_packed) VALUES
(3, 'Comfortable Shoes', false),
(3, 'Camera', false),
(3, 'City Map', false),
(3, 'Money/Credit Cards', false);