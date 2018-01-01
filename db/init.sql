    CREATE DATABASE IF NOT EXISTS youtube;
    USE youtube;

    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT UNIQUE,
      user_email VARCHAR(150) UNIQUE,
      PRIMARY KEY (id)
    );


          CREATE TABLE IF NOT EXISTS channels (
          id VARCHAR(50) UNIQUE,
          user_id INT,
          channel_name VARCHAR(200),
          viewCount INT,
          subscriberCount INT,
          videoCount INT,
          PRIMARY KEY (id),
          FOREIGN KEY (user_id)
          REFERENCES users(id)
        );


              CREATE TABLE IF NOT EXISTS videos (
           id INT AUTO_INCREMENT UNIQUE,
          channel_id VARCHAR(100),
          category_id VARCHAR(100),
          title VARCHAR(200),
          description VARCHAR(1000),
          tags JSON,
          publishedAt VARCHAR(200),
          thumbnails JSON,
          viewCount INT,
          likeCount INT,
          dislikeCount INT,
          favoriteCount INT,
          commentCount INT,
          FOREIGN KEY (channel_id)
            REFERENCES channels(id)
        );
