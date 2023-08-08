CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo BLOB,
    bio VARCHAR,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    photo BLOB NOT NULL,
    user_id INT NOT NULL,
    KEY user_id_idx (user_id) REFERENCES user(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
) ENGINE=InnoDB;

CREATE TABLE follow (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY follower_id_idx (follower_id) REFERENCES user(id) ON DELETE CASCADE,
    KEY following_id_idx (following_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE interest (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY post_id_idx (post_id) REFERENCES post(id) ON DELETE CASCADE,
    KEY user_id_idx (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB;
