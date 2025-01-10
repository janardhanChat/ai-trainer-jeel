"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, ChevronDown, Check, Filter } from "lucide-react";
import { toast } from "react-hot-toast";
import Button from "../common/Button";
import CreatePersonaModal from "./CreatePersonaModal";
import CreateCategoryModal from "./CreateCategory";
import DropdownMenuCheckboxes from "../common/dropdown";
import EditPersonaModal from "./Modal/EditPersonaModal";

const ProfileImage = "/images/profile.jpg";

export default function AITrainerSection({
  handleOpenmodal,
  personaDeatils,
  loading,
}) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setDeleteAllModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPersona, setCurrentPersona] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://api.ai-trainer.rejoicehub.com/api/v1/category/getCategory`
      );
      const categoriesData = response?.data?.payload || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories.");
    } finally {
      setCategoryLoading(false);
    }
  };

  const filteredPersonas = personaDeatils?.filter((item) => {
    if (!selectedCategory || selectedCategory.value === "all") return true;
    return item.category_id === selectedCategory.value;
  });

  const deleteAllPersonas = async () => {
    try {
      await axios.delete(
        `https://api.ai-trainer.rejoicehub.com/api/v1/persona/deletePersona`
      );
      toast.success("All personas deleted successfully.");
      window.location.reload();
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting all personas:", error);
      toast.error("Failed to delete all personas.");
    } finally {
      setDeleteAllModalOpen(false);
    }
  };

  const openCreatePersonaModal = () => {
    setIsModalOpen(true);
  };

  const closeCreatePersonaModal = () => {
    setIsModalOpen(false);
  };

  const openCreateCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const closeCreateCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const openDeleteAllModal = () => {
    setDeleteAllModalOpen(true);
  };

  const closeDeleteAllModal = () => {
    setDeleteAllModalOpen(false);
  };

  const openEditPersonaModal = (persona) => {
    setCurrentPersona(persona);
    setIsEditModalOpen(true);
  };

  const closeEditPersonaModal = () => {
    setCurrentPersona(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-[80vh] p-8 rounded-[30px]">
      <DropdownMenuCheckboxes
        selectedItem={selectedCategory}
        setSelectedItem={setSelectedCategory}
        options={categories.map((cat) => ({
          label: cat.category_name,
          value: cat._id,
        }))}
        loading={categoryLoading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-4">
        <div style={{ width: "170px" }}>
          <Button
            text="Create Persona"
            handleClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500"
          />
        </div>

        <div style={{ width: "170px" }}>
          <Button
            text="Create Category"
            handleClick={() => setCategoryModalOpen(true)}
            className="bg-green-600 hover:bg-green-500"
          />
        </div>

        <div style={{ width: "170px" }}>
          <Button
            text="Delet Personas"
            handleClick={() => setDeleteAllModalOpen(true)}
            className="bg-red-600 hover:bg-red-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonas?.length > 0 &&
          !loading &&
          filteredPersonas.map((item, index) => {
            const matchingCategory = categories.find(
              (cat) => cat._id === item.category_id
            );

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-5">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-50 shadow-sm">
                      <Image
                        src={ProfileImage}
                        alt="ProfileImage"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        layout="fill"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {item.trainerTitle}
                      </h3>
                      {matchingCategory && (
                        <span className="inline-flex items-center px-4 py-1.5 mt-2 text-sm font-medium bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-full border border-blue-100/50 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow">
                          {matchingCategory.category_name}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {item.trainerDescription}
                  </p>

                  <div>
                    <Button
                      text="Digital Human"
                      handleClick={() => handleOpenmodal(item)}
                      className="bg-gray-900 hover:bg-gray-800"
                    />
                    <Button
                      text="Edit"
                      handleClick={() => openEditPersonaModal(item)}
                      className="bg-yellow-500 hover:bg-yellow-400"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {(loading || categoryLoading) && (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex items-center space-x-3">
            <Loader className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600 font-medium">
              Loading trainers...
            </span>
          </div>
        </div>
      )}

      {!loading && !categoryLoading && filteredPersonas?.length === 0 && (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              No data found in category
            </h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        </div>
      )}

      {isModalOpen && <CreatePersonaModal onClose={closeCreatePersonaModal} />}

      {isCategoryModalOpen && (
        <CreateCategoryModal
          open={isCategoryModalOpen}
          handleClose={closeCreateCategoryModal}
        />
      )}

      {isDeleteAllModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">
              Are you sure you want to delete all personas?
            </h3>
            <p className="text-gray-500 mt-2">This action cannot be undone.</p>
            <div className="mt-4 flex space-x-4">
              <Button
                text="Cancel"
                handleClick={closeDeleteAllModal}
                className="bg-gray-300 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all"
              />
              <Button
                text="Delete All"
                handleClick={deleteAllPersonas}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-medium transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <EditPersonaModal
          persona={currentPersona}
          categories={categories}
          onClose={closeEditPersonaModal}
        />
      )}
    </div>
  );
}
