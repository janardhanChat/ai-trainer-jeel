"use client";
import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const CreateCategoryModal = ({ open, handleClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://api.ai-trainer.rejoicehub.com/api/v1/category/createCategory",
        {
          category_name: categoryName,
        }
      );

      if (response.status === 200) {
        toast.success("Category created successfully!");
        setCategoryName("");
        handleClose();
        window.location.reload();
        await getCategory();
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "https://api.ai-trainer.rejoicehub.com/api/v1/category/getCategory"
      );
      console.log("Fetched categories:", response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          gutterBottom
          style={{ fontFamily: "cursive", letterSpacing: "1px" }}
        >
          Create New Category
        </Typography>
        <TextField
          label="Category Name"
          fullWidth
          margin="normal"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          disabled={loading}
          variant="outlined"
          InputProps={{
            style: {
              borderRadius: "8px",
            },
          }}
          error={!!error}
          helperText={error}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCategory}
          disabled={loading}
          fullWidth
          sx={{
            marginTop: 2,
            borderRadius: "8px",
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
          fullWidth
          sx={{
            marginTop: 1,
            borderRadius: "8px",
          }}
          style={{ fontFamily: "cursive", letterSpacing: "1px" }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateCategoryModal;
