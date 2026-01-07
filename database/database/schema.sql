-- School-Based Marks Management System Database Schema
-- PostgreSQL

-- Roles (Teacher, DOS, Head Teacher)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Users (Only school staff)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Academic Terms
CREATE TABLE terms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT false
);

-- Classes (S1–S6)
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

-- Subjects
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Students (No login access)
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    class_id INTEGER REFERENCES classes(id)
);

-- Teacher Subject Assignment
CREATE TABLE teacher_subjects (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES users(id),
    subject_id INTEGER REFERENCES subjects(id),
    class_id INTEGER REFERENCES classes(id)
);

-- Assessments (Tests, CATs, Quizzes)
CREATE TABLE assessments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    term_id INTEGER REFERENCES terms(id),
    subject_id INTEGER REFERENCES subjects(id),
    class_id INTEGER REFERENCES classes(id),
    max_score INTEGER NOT NULL
);

-- Marks
CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    assessment_id INTEGER REFERENCES assessments(id),
    score INTEGER NOT NULL CHECK (score >= 0),
    entered_by INTEGER REFERENCES users(id),
    entered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
