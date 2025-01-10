"use client";
import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const EditPersonaModal = ({ persona, categories, onClose }) => {
  const [formData, setFormData] = useState({
    persona_name: persona.persona_name || "",
    email: persona.email || "",
    system_prompt: persona.system_prompt || "",
    context: persona.context || "",
    trainerTitle: persona.trainerTitle || "",
    trainerDescription: persona.trainerDescription || "",
    category_id: persona.category_id || "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://1fr14drk-7003.inc1.devtunnels.ms/api/v1/persona/updatePersona?id=${persona._id}`,
        formData
      );
      toast.success("Persona updated successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating persona:", error);
      toast.error("Failed to update persona.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" align="center" gutterBottom>
          Edit Persona
        </Typography>
        <TextField
          label="Persona Name"
          name="persona_name"
          fullWidth
          margin="normal"
          value={formData.persona_name}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="System Prompt"
          name="system_prompt"
          fullWidth
          margin="normal"
          value={formData.system_prompt}
          onChange={handleInputChange}
        />
        <TextField
          label="Context"
          name="context"
          fullWidth
          margin="normal"
          value={formData.context}
          onChange={handleInputChange}
        />
        <TextField
          label="Trainer Title"
          name="trainerTitle"
          fullWidth
          margin="normal"
          value={formData.trainerTitle}
          onChange={handleInputChange}
        />
        <TextField
          label="Trainer Description"
          name="trainerDescription"
          fullWidth
          margin="normal"
          value={formData.trainerDescription}
          onChange={handleInputChange}
        />
        <TextField
          label="Category"
          name="category_id"
          select
          fullWidth
          margin="normal"
          value={formData.category_id}
          onChange={handleInputChange}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.category_name}
            </option>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditPersonaModal;
