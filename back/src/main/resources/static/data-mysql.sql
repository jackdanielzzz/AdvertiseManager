insert into `category` (id, deleted, name, request_name) values (1, false, 'Music', 'music');
insert into `category` (id, deleted, name, request_name) values (2, false, 'Application', 'app');
insert into `category` (id, deleted, name, request_name) values (3, false, 'Video', 'video');
insert into `category` (id, deleted, name, request_name) values (4, false, 'Pictures', 'pic');

insert into `banner` (id, content, deleted, name, price, category_id) values (1, 'Pictures banner 100', false, 'pic_ban1', 100, 4);
insert into `banner` (id, content, deleted, name, price, category_id) values (2, 'Music banner 500', false, 'mus_ban1', 500, 1);
insert into `banner` (id, content, deleted, name, price, category_id) values (3, 'Application banner 1000', false, 'app_ban1', 1000, 2);
insert into `banner` (id, content, deleted, name, price, category_id) values (4, 'Video banner 500', false, 'video_ban1', 500, 3);
insert into `banner` (id, content, deleted, name, price, category_id) values (5, 'Music banner 250', false, 'mus_ban2', 250, 1);
insert into `banner` (id, content, deleted, name, price, category_id) values (6, 'Music banner 400', false, 'mus_ban3', 400, 1);
insert into `banner` (id, content, deleted, name, price, category_id) values (7, 'Pictures banner 200', false, 'pic_ban2', 200, 4);
insert into `banner` (id, content, deleted, name, price, category_id) values (8, 'Application banner 700', false, 'app_ban2', 700, 2);
insert into `banner` (id, content, deleted, name, price, category_id) values (9, 'Application banner 1000/1', false, 'app_ban3', 1000, 2);
insert into `banner` (id, content, deleted, name, price, category_id) values (10, 'Application banner 2000/1', false, 'app_ban4', 2000, 2);
