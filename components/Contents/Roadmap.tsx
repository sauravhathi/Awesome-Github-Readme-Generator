"use client";

import { gitTechStack } from "@/atom/techStack";
import { boxLabel } from "@/lib/boxLabel";
import { Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillCompass } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

import Heading from "../Heading";
import InputField from "../InputField";

type Props = {};

function Roadmap({}: Props) {
  const [roadMapValues, setRoadMapValue] = useState({
    roadMapValue: "",
    roadMapCheck: "do",
  });
  const [listOfRoadMap, setListOfRoadMap] = useState([]);
  const [gitHubTechStack, setGitHubTechStack] = useRecoilState(gitTechStack);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoadMapValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onAddValue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const roadMapValue = roadMapValues.roadMapValue;
    const roadMapCheck = roadMapValues.roadMapCheck;

    if (roadMapValue && roadMapCheck) {
      const element = { roadMapValue, roadMapCheck };
      setListOfRoadMap((ls) => [...ls, element] as any);
      setRoadMapValue((prev) => ({
        ...prev,
        roadMapValue: "",
        roadMapCheck: "do",
      }));
    } else {
      toast.warn("Please fill your task it is complete or not");
    }
  };

  const updateState = (value: string[]) => {
    if (!value) return;

    setGitHubTechStack((prev) => ({
      ...prev,
      roadMap: value,
    }));
  };

  const removeElement = (value: string, label: string) => {
    if (value) {
      const removeCurrentState = listOfRoadMap.filter(
        (element: any) => element[label] !== value
      );

      setListOfRoadMap(removeCurrentState);

      const removeItem = gitHubTechStack.roadMap.filter(
        (element: any) => element[label] !== value
      );

      setGitHubTechStack((prev) => ({
        ...prev,
        roadMap: removeItem,
      }));
    }
  };

  useEffect(() => {
    updateState(listOfRoadMap);
  }, [listOfRoadMap]);

  return (
    <div className="py-8">
      <Heading label="Roadmap" icon={AiFillCompass} />
      <div className="flex flex-col justify-between gap-4">
        <div className="py-4 flex justify-between gap-4">
          <InputField
            onChange={onChange}
            label="Topic"
            type="text"
            name="roadMapValue"
            value={roadMapValues.roadMapValue}
          />
          <div className="flex justify-start gap-4 px-12 w-full text-center">
            <div className="flex justify-start gap-2 items-center">
              <Checkbox
                {...boxLabel}
                onChange={onChange}
                sx={{ color: "#fff" }}
                color="default"
                checked={roadMapValues.roadMapCheck === "do"}
                value="do"
                name="roadMapCheck"
              />
              <p className="text-lg font-medium">Completed</p>
            </div>
            <div className="flex justify-start gap-2 items-center">
              <Checkbox
                {...boxLabel}
                onChange={onChange}
                sx={{ color: "#fff" }}
                color="default"
                checked={roadMapValues.roadMapCheck === "undo"}
                value="undo"
                name="roadMapCheck"
              />
              <p className="text-lg font-medium">Not Yet</p>
            </div>
          </div>
          <button
            onClick={(e: any) => onAddValue(e)}
            className="bg-[#265D97] hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center gap-1"
          >
            <span>Add</span>
            <IoIosAddCircle size={15} />
          </button>
        </div>
        <div className="inline-block md:flex justify-start gap-60">
          <div className="hidden md:flex flex-col justify-between gap-2 max-h-36">
            <div className="flex gap-2">
              <p className="text-lg font-medium text-gray-300">Example</p>
            </div>
            <div className="flex justify-start gap-2 py-1 items-center">
              <Checkbox
                {...boxLabel}
                color="default"
                disabled
                checked
                sx={{ color: "#7c8691" }}
              />
              <p className="text-lg font-medium text-[#7c8691]">Todo 1</p>
            </div>
            <div className="flex justify-start gap-2 py-1 items-center">
              <Checkbox
                {...boxLabel}
                color="default"
                disabled
                sx={{ color: "#7c8691" }}
              />
              <p className="text-lg font-medium text-[#7c8691]">Todo 2</p>
            </div>
          </div>
          {gitHubTechStack.roadMap.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="flex flex-col justify-between gap-2 h-full"
            >
              <div className="flex gap-2">
                <p className="text-lg font-medium text-gray-300">
                  Your RoadMap Details
                </p>
              </div>
              {gitHubTechStack.roadMap.map((data: any, index) => (
                <div key={index}>
                  {data.roadMapValue && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      className="flex justify-start gap-2 items-center py-1"
                    >
                      {data.roadMapCheck === "do" ? (
                        <Checkbox
                          {...boxLabel}
                          color="default"
                          disabled
                          checked
                          sx={{ color: "#7c8691" }}
                        />
                      ) : (
                        <Checkbox
                          {...boxLabel}
                          color="default"
                          disabled
                          sx={{ color: "#7c8691" }}
                        />
                      )}
                      <p
                        className="text-lg font-normal cursor-pointer text-center text-[#7c8691]"
                        onClick={() =>
                          removeElement(data.roadMapValue, "roadMapValue")
                        }
                      >
                        {data.roadMapValue}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;