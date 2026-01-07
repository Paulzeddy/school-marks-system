// server.js
// Backend server for School-Based Marks System
// Node.js + Express + Supabase

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_KEY } = require("./config");

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Server port
const PORT = process.env.PORT || 5000;

// ------------------- ROUTES -------------------

// 1. Test Connection
app.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("roles").select("*");
    if (error) throw error;
    res.send({ message: "Backend connected to Supabase!", roles: data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 2. Add Teacher / Staff
app.post("/add-teacher", async (req, res) => {
  const { full_name, email, password_hash, role_id } = req.body;
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ full_name, email, password_hash, role_id }])
      .select();
    if (error) throw error;
    res.send({ message: "Teacher added successfully", user: data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 3. Add Student
app.post("/add-student", async (req, res) => {
  const { registration_number, full_name, class_id } = req.body;
  try {
    const { data, error } = await supabase
      .from("students")
      .insert([{ registration_number, full_name, class_id }])
      .select();
    if (error) throw error;
    res.send({ message: "Student added successfully", student: data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 4. Add Assessment (Test / CAT / Quiz)
app.post("/add-assessment", async (req, res) => {
  const { name, type, term_id, subject_id, class_id, max_score } = req.body;
  try {
    const { data, error } = await supabase
      .from("assessments")
      .insert([{ name, type, term_id, subject_id, class_id, max_score }])
      .select();
    if (error) throw error;
    res.send({ message: "Assessment added successfully", assessment: data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 5. Enter Marks
app.post("/add-mark", async (req, res) => {
  const { student_id, assessment_id, score, entered_by } = req.body;
  try {
    const { data, error } = await supabase
      .from("marks")
      .insert([{ student_id, assessment_id, score, entered_by }])
      .select();
    if (error) throw error;
    res.send({ message: "Mark recorded successfully", mark: data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 6. Get Students by Class
app.get("/students/:class_id", async (req, res) => {
  const class_id = req.params.class_id;
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("class_id", class_id);
    if (error) throw error;
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
