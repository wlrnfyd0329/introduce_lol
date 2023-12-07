
CREATE DATABASE IF NOT EXISTS lol_page CHARACTER SET utf8 COLLATE utf8_bin;
USE lol_page

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20),
    userpw VARCHAR(100),
    PRIMARY KEY(id)
) ENGINE=MYISAM CHARSET=utf8;

CREATE TABLE IF NOT EXISTS recentSearch ( 
    username VARCHAR(20), 
    searchname1 VARCHAR(100), 
    searchname2 VARCHAR(100), 
    searchname3 VARCHAR(100), 
    searchname4 VARCHAR(100), 
    searchname5 VARCHAR(100), 
    searchname6 VARCHAR(100), 
    searchname7 VARCHAR(100), 
    searchname8 VARCHAR(100), 
    searchname9 VARCHAR(100), 
    searchname10 VARCHAR(100), 
    primary key(username)
);