CREATE DATABASE pixeo;

USE pixeo;

CREATE TABLE photo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    filename VARCHAR(255) NOT NULL,
    filetype VARCHAR(255) NOT NULL,
    data LONGBLOB NOT NULL
) ENGINE=InnoDB;

CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    UNIQUE KEY (name)
) ENGINE=InnoDB;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)) STORED,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo_id INT DEFAULT NULL,
    bio VARCHAR(255),
    location VARCHAR(255),
    UNIQUE KEY (email),
    FOREIGN KEY (photo_id) REFERENCES photo(id)
) ENGINE=InnoDB;

CREATE TABLE follow (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES user(id),
    FOREIGN KEY (following_id) REFERENCES user(id)
) ENGINE=InnoDB;

CREATE TABLE interest (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
) ENGINE=InnoDB;

CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    photo_id INT NOT NULL,
    user_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (photo_id) REFERENCES photo(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
) ENGINE=InnoDB;

CREATE TABLE interaction (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    type ENUM('like') NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT unique_interaction UNIQUE (post_id, user_id, type)
) ENGINE=InnoDB;

INSERT INTO tag (name) VALUES ('nature'), ('landscape'), ('city'), ('people'), ('animals'), ('food'), ('travel'), ('art'), ('fashion'), ('music'), ('sports'), ('cars'), ('architecture'), ('technology'), ('business'), ('health'), ('fitness'), ('family'), ('home'), ('garden'), ('diy'), ('crafts'), ('weddings'), ('design'), ('books'), ('film'), ('tv'), ('theater'), ('dance'), ('science'), ('history'), ('religion'), ('politics'), ('news'), ('humor'), ('quotes'), ('other');