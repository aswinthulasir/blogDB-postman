const express = require("express");
const mongoose = require("mongoose"); 
const app = express();
const PORT = 3000;
const blogModel = require("./model");
require("./connection");

app.use(express.json());

// Create
app.post("/blogs", async (req, res) => {
  try {
    const blog = new blogModel(req.body); // Assuming req.body contains title, content, and author
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: "Error creating blog", error });
  }
});

// Get
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

// Get a single blog post by ID
app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
});

// Update a post by ID
app.put("/blogs/:id", async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return
      runValidators: true, 
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: "Error updating blog", error });
  }
});

// Delete by ID
app.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
