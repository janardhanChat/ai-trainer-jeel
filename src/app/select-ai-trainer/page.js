"use client";
import { createConversation } from "@/api/api";
import { API_BASE_URL } from "@/api/api/constantsKey";
import { getPersona } from "@/api/api/getPersona";
import { DropdownMenuCheckboxes } from "@/components/common/dropdown";
import AITrainerSection from "@/components/sections/AITrainerSection";
import ConfirmationModal from "@/components/widgets/ConfirmationModal";
import { useConversation } from "@/contexts/ConversationContext";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LogOut, Users } from "lucide-react";

export default function page() {
  const router = useRouter();
  const [isOpen, setisOpen] = useState(false);
  const { handleStart, loading, currentPersonaId, setCurrentPersonaId } =
    useConversation();
  const [personaDeatils, setPersonaDeatils] = useState([]);
  const [personaLoading, setPersonLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: "Show All",
    value: "all",
  });
  const [options, setOptions] = useState([]);
  const [categoryloading, setCategoryLoading] = useState(true);

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    localStorage.removeItem("userInformation");
    toast.success("Logged out successfully!");
    router.push("/");
  };

  const handleOpenmodal = (personaDeatils) => {
    setCurrentPersonaId(personaDeatils);
    setisOpen(true);
  };
  const handleClosemodal = () => {
    setisOpen(false);
  };

  const getPersonaDetails = async (personaCategoryID) => {
    try {
      setPersonLoading(true);
      if (personaCategoryID === "all") {
        const response = await axios.get(`${API_BASE_URL}/persona/getPersona`);
        if (!response?.data?.success) {
          setPersonaDeatils([]);
          throw new Error("Failed to fetch persona details");
        }
        setPersonaDeatils(response?.data?.payload || []);
      } else {
        const response = await getPersona(personaCategoryID);
        if (!response?.data?.success) {
          setPersonaDeatils([]);
          throw new Error("Failed to fetch persona details");
        }
        setPersonaDeatils(response?.data?.payload || []);
      }
    } catch (error) {
      console.error("Error fetching persona details:", error);
      toast.error("Error fetching persona details.");
    } finally {
      setPersonLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/getCategory`);
      const categories = response?.data?.payload || [];
      const formattedOptions = categories.map((item) => ({
        label: item.category_name,
        value: item._id,
      }));

      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories.");
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (options.length > 0) {
      getPersonaDetails("all");
    }
  }, [options]);

  const handleCategoryChange = async (selectedOption) => {
    setSelectedItem(selectedOption);
    await getPersonaDetails(selectedOption.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1780px] mx-auto px-5">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img
                  src="https://img.freepik.com/premium-photo/friendly-looking-ai-agent-as-logo-white-background-style-raw-job-id-b7b07c82b6574fb8bb64985b261a_343960-69669.jpg?w=740"
                  alt="AI Trainer"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Trainer
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1780px] mx-auto px-5 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex flex-col space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Select AI Agent
              </h1>
              <p className="text-sm text-gray-500">
                Choose an AI agent to start your conversation
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
                <Users className="w-4 h-4" />
                <span>{personaDeatils.length} Agents</span>
              </div>
              {/* <DropdownMenuCheckboxes
                selectedItem={selectedItem}
                setSelectedItem={handleCategoryChange}
                options={options}
                setOptions={setOptions}
                loading={categoryloading}
                setLoading={setCategoryLoading}
              /> */}
            </div>
          </div>
        </div>

        <AITrainerSection
          handleOpenmodal={handleOpenmodal}
          handleStart={handleStart}
          personaDeatils={personaDeatils}
          loading={personaLoading}
        />
        <ConfirmationModal
          handleClose={handleClosemodal}
          isOpen={isOpen}
          handleStart={handleStart}
          loading={loading}
        />
      </div>
    </div>
  );
}
