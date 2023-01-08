create database mande;

create table person (
    person_id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(100),
    phone varchar(10)
);

ALTER TABLE public.person ALTER COLUMN email SET NOT NULL;
ALTER TABLE person ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE person ALTER COLUMN phone SET NOT NULL;
ALTER TABLE person ADD CONSTRAINT unique_phone UNIQUE (phone);

CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    latitude FLOAT,
    longitude FLOAT,
    person_id INT,
    CONSTRAINT fk_addres_person
    FOREIGN KEY (person_id) 
    REFERENCES person(person_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    utility_bill VARCHAR(500),
    CONSTRAINT fk_users_person
    FOREIGN KEY (user_id) 
    REFERENCES person(person_id)
);

CREATE TABLE payment_method (
    payment_id SERIAL PRIMARY KEY,
    cvv VARCHAR(4),
    card_number VARCHAR(20),
    card_type VARCHAR(10),
    expiration_date DATE DEFAULT CURRENT_DATE,
    user_id int,
    CONSTRAINT fk_paymentmethod_user
    FOREIGN KEY (user_id) 
    REFERENCES users(user_id)
);

CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    photo_ID VARCHAR(500),
    profile_picture VARCHAR(500),
    status VARCHAR(2),
    cash INT,
    CONSTRAINT fk_employee_person
    FOREIGN KEY (employee_id) 
    REFERENCES person(person_id)
);

CREATE TABLE reviews (
    reviews_id SERIAL PRIMARY KEY,
    employee_id INT,
    total_jobs INT,
    rating FLOAT,
    CONSTRAINT fk_reviews_employee
    FOREIGN KEY (employee_id) 
    REFERENCES employee(employee_id)
);

CREATE TABLE works (
    work_id SERIAL PRIMARY KEY,
    names VARCHAR(100)
);

CREATE TABLE employees_work (
    employee_id SERIAL,
    work_id SERIAL,
    price_hour INT,
    CONSTRAINT pk_employees_work
    PRIMARY KEY (employee_id, work_id),
    CONSTRAINT pk_employeeswork_work
    FOREIGN KEY (work_id) 
    REFERENCES works(work_id),
    CONSTRAINT pk_employeeswork_employee
    FOREIGN KEY (employee_id) 
    REFERENCES employee(employee_id)
);

CREATE TABLE pay (
    pay_id SERIAL PRIMARY KEY,
    employee_pay INT,
    profit_mande INT,
    total_payment INT,
    pay_date DATE DEFAULT CURRENT_DATE,
    service_id INT
);


CREATE TABLE service (
    service_id SERIAL PRIMARY KEY,
    hours INT,
    status_rating VARCHAR(2),
    user_id INT,
    employee_id INT,
    pay_id INT,
    CONSTRAINT fk_service_employee
    FOREIGN KEY (employee_id) 
    REFERENCES employee(employee_id),
    CONSTRAINT fk_service_users
    FOREIGN KEY (user_id) 
    REFERENCES users(user_id),
    CONSTRAINT fk_service_pay
    FOREIGN KEY (pay_id) 
    REFERENCES pay(pay_id)
);

ALTER TABLE works ALTER COLUMN names SET NOT NULL;

ALTER TABLE EMPLOYEE RENAME COLUMN status to available;

ALTER TABLE PAYMENT_METHOD ADD COLUMN status VARCHAR(2);

ALTER TABLE USERS ADD COLUMN status VARCHAR(2);

ALTER TABLE SERVICE ADD COLUMN status VARCHAR(2);

ALTER TABLE PERSON ADD COLUMN status VARCHAR(2);

ALTER TABLE ADDRESS  ADD COLUMN status VARCHAR(2);

ALTER TABLE PAY ADD COLUMN status VARCHAR(2);

ALTER TABLE EMPLOYEE ADD COLUMN status VARCHAR(2);

ALTER TABLE WORKS ADD COLUMN status VARCHAR(2);