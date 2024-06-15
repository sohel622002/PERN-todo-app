CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    description VARCHAR(255),
    FOREIGN KEY(user_id) references users(id)
);
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(255),
    email varchar(255) UNIQUE,
    password varchar(255)
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO users (name, email, password)
VALUES ('sohel', 'sohel@gmail.com', '1234');