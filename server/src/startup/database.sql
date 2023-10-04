CREATE TABLE IF NOT EXISTS stuffjotterusers (
    user_id SERIAL PRIMARY KEY,
    user_sub VARCHAR (255) NOT NULL UNIQUE,
    user_email VARCHAR (255) NOT NULL,
    user_role VARCHAR (30) NOT NULL,
    subscription BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS userplaces (
    id SERIAL PRIMARY KEY,
    user_sub VARCHAR (50) NOT NULL,
    place VARCHAR NOT NULL,
    file_path VARCHAR (255) UNIQUE,
    file_size INT
);

CREATE TABLE IF NOT EXISTS itemlist (
    item_id SERIAL PRIMARY KEY,
    user_sub VARCHAR (50) NOT NULL,
    place VARCHAR NOT NULL,
    item VARCHAR NOT NULL,
    item_quantity INT NOT NULL,
    item_purchase_price NUMERIC(15,4) NOT NULL,
    item_total_price NUMERIC(15,4) NOT NULL,
    item_purchase_date VARCHAR (50) NOT NULL,
    item_description TEXT NOT NULL,
    item_file_path VARCHAR (255) UNIQUE
);

CREATE TABLE IF NOT EXISTS stored_file_path (
    file_id SERIAL PRIMARY KEY,
    item_id INT NOT NULL UNIQUE,
    user_sub VARCHAR (50) NOT NULL,
    place VARCHAR NOT NULL,
    dashboard BOOLEAN NOT NULL,
    file_path VARCHAR,
    file_size INT,
    CONSTRAINT fk_item_id FOREIGN KEY(item_id) REFERENCES itemlist(item_id) ON DELETE CASCADE
);