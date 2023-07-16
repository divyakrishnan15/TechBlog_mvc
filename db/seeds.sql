describe user;

describe post;

describe comment;

-- INSERT INTO user(username,twitter,github,email,password) 
-- VALUES('james','james Twitter','jamesGit','james5@gmail.com','testt12345'),
-- ('alex','alex Twitter','alex Git','alex@gmail.com','testt12345'),
-- ('john','john Twitter','johnGit','john@gmail.com','testt12345');

INSERT INTO post(title,post_content,user_id,created_at,updated_at) 
VALUES('javascript','const add = (a,b) => {
    return a + b
}

console.log(add(1,2))',1,'2023-07-27','2023-07-28');
-- ('nodes express','bye..',1,'2023-07-27','2023-07-28'),
-- ('reactjs','hello.. import React from .react',1,'2023-07-27','2023-07-28');

-- INSERT INTO comment(user_id,post_id,comment_text,created_at,updated_at) 
-- VALUES(1,1,'this is my first blog post','2023-07-27','2023-07-28'),
-- (2,1,'this is my first blog post','2023-07-27','2023-07-28'),
-- (3,1,'this is my first blog post','2023-07-27','2023-07-28');




-- mysql -u root -p
-- password

-- npm start

-- use tech_blog_db;

-- source seeds.sql;

-- source select.sql;

