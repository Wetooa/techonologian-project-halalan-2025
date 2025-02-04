"use client";
import Image from "next/image";
import { useState, useEffect, createContext } from "react";
import { BarChartHorizontal } from "@/components/chart-bar-horizontal";
import { DropDownMenu } from "@/components/ui/radio-group";
import { PieChartWithLabels } from "@/components/piechart-withlabels";

function fetchAll() {
  return fetch("http://localhost:3000/api/all", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data.data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      return null;
    });
}

function fetchByCourse(course: string) {
  return fetch(`http://localhost:3000/api/by-course/${course}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function fetchBySenator(senatorNumber: string) {
  return fetch(`http://localhost:3000/api/by-senator/${senatorNumber}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data.data;
    })
    .catch((error) => {
      console.error("There was a problem fetching results bySenator", error);
    });
}

function getDataCountForSenate(data) {
  const courseCounts = {};

  data.forEach((student) => {
    const course = student.course;
    if (course) {
      courseCounts[course] = (courseCounts[course] || 0) + 1;
    }
  });

  return Object.entries(courseCounts);
}

export const ChosenSenate = createContext(null);

export default function Home() {
  const [senateSelected, setSenateSelected] = useState(null);
  const [allData, setAllData] = useState<any[]>([]);
  const [courseData, setCourseData] = useState<any>(null);
  const [senatorData, setSenatorData] = useState<any[]>([]);

  // Fetch data and set up polling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allResponse = await fetchAll();
        const courseResponse = await fetchByCourse("BSCS");
        let senatorResponse = null;
        if (senateSelected) {
          senatorResponse = await fetchBySenator(senateSelected);
        }
        setAllData(() => {
          return allResponse;
        });
        setSenatorData(senatorResponse);
        setCourseData(courseResponse);

        // console.log("All Data:", allResponse);
        console.log("Course Data:", courseResponse);
        // console.log("Senator Data:", senatorResponse);
      } catch (error) {
        console.error("There was a problem fetching data:", error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 50000000);

    return () => clearInterval(intervalId);
  }, [senateSelected]);

  useEffect(() => {
    console.log("Updated Data being used: ", allData);
    console.log("The senator Selected: ", senatorData);
    // console.log("THe courses: ", courseData);
    console.log("The senate selected: ", senateSelected);
  }, [allData, senatorData, senateSelected, courseData]);

  const filters = ["All", "All Departments", "By Department", "By Senator"];
  const filterDescriptions = {
    All: "Displays all available data without any filtering.",
    "All Departments": "Shows data related to all departments collectively.",
    "All Voter's Detail": "Provides comprehensive details of all voters.",
    "By Department": "Filters data based on specific departments.",
    "By Senator":
      "Filters data based on specific senators or their associated categories.",
  };
  const [filterSelected, setFilterSelected] = useState("All");
  // const choiceSelected= useState("All");
  return (
    <div className="bg-cover bg-center bg-[url('/graphics/background.png')] scroll-auto h-auto w-screen flex flex-col justify-center items-center gap-10 p-10">
      <Image
        src={"/graphics/title.png"}
        alt={"Halalan 2025"}
        width={600}
        height={600}
        className="mb-10  cursor-pointer hover:animate-pulse"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/*{senatorNames.map((senator, index) => (*/}
        {/*  <Image*/}
        {/*    key={index}*/}
        {/*    src={`/senators/${index + 1}.png`}*/}
        {/*    alt={`Senator ${senator}`}*/}
        {/*    width={125}*/}
        {/*    height={125}*/}
        {/*    className="self-center w-full sm:w-32 md:w-40 lg:w-44 hover:scale-105"*/}
        {/*  />*/}
        {/*))}*/}
      </div>
      <div
        id=""
        className="w-full flex flex-col lg:flex-row justify-center  pl-5 pr-5 items-start gap-5"
      >
        <div
          id="filters"
          className="bg-[#1A1A1A] h-auto  xl:w-1/3 2xl:w-1/3 lg:w-1/3 w-full  rounded-md "
        >
          <header className="p-3 gap-2 flex flex-row">
            <Image
              src={"/graphics/filter.png"}
              width={25}
              height={10}
              alt={"Filter icon"}
            />
            <p className="text-white font-bold font-sans lg:text-3xl sm-text-2xl cursor-pointer">
              FILTERS
            </p>
          </header>
          <hr />
          {filters.map((filter, index) => (
            <div key={index} onClick={() => setFilterSelected(filter)}>
              <div
                className={`text-white p-3 cursor-pointer hover:bg-[#141414]  ${
                  filterSelected === filter ? "bg-[#333333]" : ""
                }`}
              >
                <p>{filter}</p>
              </div>
              <hr />
            </div>
          ))}
          <div
            className={`flex justify-center items-center p-10 ${
              filterSelected === "By Senator" ? "" : "hidden"
            }`}
          >
            <ChosenSenate.Provider
              value={{ senateSelected, setSenateSelected }}
            >
              <DropDownMenu senatorNames={allData} />
            </ChosenSenate.Provider>
          </div>
        </div>
        <div
          id="charts"
          className="bg-[#1A1A1A] w-full  h-full rounded-md p-5 flex flex-col gap-5 bg-opacity-50"
        >
          {filterSelected === "All Departments" ? (
            <PieChartWithLabels />
          ) : filterSelected === "By Senator" ? (
            !senatorData ? (
              <p className="text-white font-bold font-sans lg:text-3xl sm-text-2xl cursor-pointer">
                Choose a senator
              </p>
            ) : (
              <BarChartHorizontal
                title={filterSelected}
                description={filterDescriptions[filterSelected]}
                data={getDataCountForSenate(senatorData)}
              />
            )
          ) : (
            <BarChartHorizontal
              title={filterSelected}
              description={filterDescriptions[filterSelected]}
              data={allData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
