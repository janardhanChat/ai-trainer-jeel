"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../common/Button"; // Adjust the path as necessary
import { toast } from "react-hot-toast";

const CreatePersonaModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    persona_name: "",
    email: "",
    system_prompt: "",
    context: "",
    trainerDescription: "",
    apiKey: "",
    trainerTitle: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.ai-trainer.rejoicehub.com/api/v1/category/getCategory"
      );
      const categoriesData = response?.data?.payload || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.persona_name)
      newErrors.persona_name = "Persona name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.system_prompt)
      newErrors.system_prompt = "System prompt is required.";
    if (!formData.context) newErrors.context = "Context is required.";
    if (!formData.trainerDescription)
      newErrors.trainerDescription = "Trainer description is required.";
    if (!formData.apiKey) newErrors.apiKey = "API Key is required.";
    if (!formData.trainerTitle)
      newErrors.trainerTitle = "Trainer title is required.";
    if (!formData.category_id) newErrors.category_id = "Category is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://api.ai-trainer.rejoicehub.com/api/v1/persona/createPersona",
        formData
      );
      if (response.status === 200) {
        toast.success("Persona created successfully!");
        onClose();
        window.location.reload();
        await getPersona();
      }
    } catch (error) {
      console.error("Error creating persona:", error);
      toast.error("Error creating persona.");
    }
  };

  const getPersona = async () => {
    try {
      const response = await axios.get(
        "https://api.ai-trainer.rejoicehub.com/api/v1/persona/getPersona"
      );
      console.log("Fetched personas:", response.data);
    } catch (error) {
      console.error("Error fetching personas:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div
        className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 shadow-lg overflow-y-auto max-h-screen"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Create Persona
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "cursive",
                  letterSpacing: "1px",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Persona Name
              </label>
              <input
                type="text"
                name="persona_name"
                placeholder="Enter Persona Name"
                value={formData.persona_name}
                onChange={handleChange}
                required
                className={`border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.persona_name ? "border-red-500" : ""
                }`}
              />
              {errors.persona_name && (
                <p className="text-red-500 text-sm">{errors.persona_name}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "cursive",
                  letterSpacing: "1px",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-4 md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "cursive",
                  letterSpacing: "1px",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                System Prompt
              </label>
              <textarea
                name="system_prompt"
                placeholder="Enter System Prompt"
                value={formData.system_prompt}
                onChange={handleChange}
                required
                className={`border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.system_prompt ? "border-red-500" : ""
                }`}
              />
              {errors.system_prompt && (
                <p className="text-red-500 text-sm">{errors.system_prompt}</p>
              )}
            </div>

            <div className="mb-4 md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "cursive",
                  letterSpacing: "1px",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Context
              </label>
              <textarea
                name="context"
                placeholder="Enter Context"
                value={formData.context}
                onChange={handleChange}
                required
                className={`border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.context ? "border-red-500" : ""
                }`}
              />
              {errors.context && (
                <p className="text-red-500 text-sm">{errors.context}</p>
              )}
            </div>

            <div className="mb-4 md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "cursive",
                  letterSpacing: "1px",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Trainer Description
              </label>
              <textarea
                name="trainerDescription"
                placeholder="Enter Trainer Description"
                value={formData.trainerDescription}
                onChange={handleChange}
                required
                className={`border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.trainerDescription ? "border-red-500" : ""
                }`}
              />
              {errors.trainerDescription && (
                <p className="text-red-500 text-sm">
                  {errors.trainerDescription}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "cursive",
                  letterSpacing: "1px",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                API Key
              </label>
              <input
                type="text"
                name="apiKey"
                placeholder="Enter API Key"
                value={formData.apiKey}
                onChange={handleChange}
                required
                className={`border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.apiKey ? "border-red-500" : ""
                }`}
              />
              {errors.apiKey && (
                <p className="text-red-500 text-sm">{errors.apiKey}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "cursive",
                  letterSpacing: "1px",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Trainer Title
              </label>
              <input
                type="text"
                name="trainerTitle"
                placeholder="Enter Trainer Title"
                value={formData.trainerTitle}
                onChange={handleChange}
                required
                className={`border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.trainerTitle ? "border-red-500" : ""
                }`}
              />
              {errors.trainerTitle && (
                <p className="text-red-500 text-sm">{errors.trainerTitle}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "cursive",
                  letterSpacing: "1px",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Select Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className={`border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category_id ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-sm">{errors.category_id}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4">
            <Button
              text="Cancel"
              handleClick={onClose}
              style={{ fontFamily: "cursive", letterSpacing: "1px" }}
              className="bg-gray-300 hover:bg-gray-400 rounded-md p-2 w-full md:w-1/3 mb-2 md:mb-0"
            />
            <Button
              text="Create"
              handleClick={handleSubmit}
              style={{ fontFamily: "cursive", letterSpacing: "1px" }}
              className="bg-blue-600 text-white hover:bg-blue-500 rounded-md p-2 w-full md:w-1/3"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePersonaModal;
