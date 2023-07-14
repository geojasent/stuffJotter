CREATE TABLE stuffjotterusers (
    user_id SERIAL PRIMARY KEY,
    user_username VARCHAR (30) NOT NULL,
    user_password VARCHAR (100) NOT NULL,
    user_email VARCHAR (255) NOT NULL,
    user_role VARCHAR (30) NOT NULL
);

CREATE TABLE userplaces (
    id SERIAL PRIMARY KEY,
    user_id INT,
    place VARCHAR NOT NULL
);

CREATE TABLE itemlist (
    item_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    place VARCHAR NOT NULL,
    item VARCHAR NOT NULL,
    item_quantity INT NOT NULL,
    item_description TEXT NOT NULL,
    item_price NUMERIC(15,4) NOT NULL,
    item_purchase_date VARCHAR (50) NOT NULL,
    item_image_path VARCHAR (255) NOT NULL
);
