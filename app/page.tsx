"use client";

import Loading from "@/app/loading";
import { BarChartHorizontal } from "@/components/chart-bar-horizontal";
import { groupByField } from "@/lib/utils";
import { Department, FormData, Senator, SENATOR_LIST } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

async function fetchAll() {
  return await fetchByLink(`api/all/`);
}

async function fetchAllSenators() {
  return await fetchByLink(`api/all/by-senator`);
}

async function fetchTopSenators() {
  return await fetchByLink(`api/all/by-senator/top12`);
}

async function fetchTotalVoteCount() {
  return await fetchByLink(`api/total-votes/`);
}

async function fetchByDepartment(department: string) {
  return await fetchByLink(`api/by-department/${department}`);
}

async function fetchBySenator(senatorNumber: string) {
  return await fetchByLink(`api/by-senator/${senatorNumber}`);
}

async function fetchAnsweredDepartments() {
  return await fetchByLink(`api/answered-departments`);
}

async function fetchByLink(link: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${link}`, {
    method: "GET",
  });
  const result = await response.json();
  return result.data;
}

export default function Home() {
  const FILTER_DESCRIPTIONS = {
    All: "Displays all available data without any filtering.",
    "All Departments": "Shows data related to all departments collectively.",
    "By Department": "Filters data based on specific departments.",
    "By Senator":
      "Filters data based on specific senators or their associated categories.",
  } as const;

  const [allData, setAllData] = useState<FormData[]>([]);
  const [allSenators, setAllSenators] = useState<[Senator, number][]>([]);
  const [topSenators, setTopSenators] = useState<[Senator, number][]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [allAnsweredDepartments, setAllAnsweredDepartments] = useState<
    Department[]
  >([]);

  const [senatorSelected, setSenatorSelected] = useState("");
  const [senatorData, setSenatorData] = useState<[Department, number][]>([]);

  const [departmentSelected, setDepartmentSelected] = useState("");
  const [departmentData, setDepartmentData] = useState<[Senator, number][]>([]);

  const [filterSelected, setFilterSelected] =
    useState<keyof typeof FILTER_DESCRIPTIONS>("All");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAllData(await fetchAll());
        setAllSenators(await fetchAllSenators());
        setTotalVotes(await fetchTotalVoteCount());
        setTopSenators(await fetchTopSenators());
        setAllAnsweredDepartments(await fetchAnsweredDepartments());
      } catch (error) {
        console.error("There was a problem fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (senatorSelected) {
          const senatorResponse = await fetchBySenator(senatorSelected);
          setSenatorData(senatorResponse);
        }
      } catch (error) {
        console.error("There was a problem fetching data:", error);
      }
    };
    fetchData();
  }, [senatorSelected]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (departmentSelected) {
          const departmentResponse =
            await fetchByDepartment(departmentSelected);
          setDepartmentData(departmentResponse);
        }
      } catch (error) {
        console.error("There was a problem fetching data:", error);
      }
    };
    fetchData();
  }, [departmentSelected]);

  return (
    <div className="bg-cover h-auto bg-center bg-[url('/graphics/background.png')] scroll-auto w-screen flex flex-col justify-center items-center gap-10 p-10">
      <Image
        src={"/graphics/title.png"}
        alt={"Halalan 2025"}
        width={600}
        height={600}
        className="mb-10  cursor-pointer hover:animate-pulse"
      />

      {allData.length === 0 && <Loading />}

      <div className="grid grid-cols-1 sm:grid-flow-col sm:grid-rows-6   sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 min-h-96">
        {topSenators.map(([senator, numberOfVotes], index) => {
          const [senatorNumber, senatorName] = senator.split(". ");

          return (
            <div
              key={index}
              className="flex items-center bg-[#FDFDFD]  drop-shadow-lg rounded-lg gap-7 justify-between p-3 hover:scale-105 cursor-pointer transition-all"
              onClick={() =>
                router.push(
                  "http://google.com/search?q=" + senatorName + " senator",
                )
              }
            >
              <div className="flex flex-row items-center gap-5">
                <p
                  className={`font-bold text ${
                    index + 1 < 10 ? "text-5xl" : "text-3xl"
                  }`}
                >
                  {index + 1}
                </p>
                <Image
                  src={`/senators/${senatorNumber}.png`}
                  alt={senatorName}
                  height={50}
                  width={50}
                  className="rounded-full bg-gray-500 shadow-md"
                />
                <p
                  className={`font-bold ${
                    senatorName.length > 30 ? "text-md" : "text-xl"
                  }`}
                >
                  {senatorName}
                </p>
              </div>
              <p className="justify-end font-bold text-2xl">
                {totalVotes
                  ? ((numberOfVotes / totalVotes) * 100).toFixed(1) + "%"
                  : "0%"}
              </p>
            </div>
          );
        })}
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
          <div key={"All"} onClick={() => setFilterSelected("All")}>
            <div
              className={`text-white p-3 cursor-pointer hover:bg-[#141414] ${
                filterSelected === "All" ? "bg-[#333333]" : ""
              }`}
            >
              <p>All</p>
            </div>
          </div>

          <hr />
          <div
            key={"All Departments"}
            onClick={() => setFilterSelected("All Departments")}
          >
            <div
              className={`text-white p-3 cursor-pointer hover:bg-[#141414] ${
                filterSelected === "All Departments" ? "bg-[#333333]" : ""
              }`}
            >
              <p>All Departments</p>
            </div>
          </div>

          <hr />
          <div
            key={"By Department"}
            onClick={() => setFilterSelected("By Department")}
          >
            <div
              className={`text-white p-3 cursor-pointer hover:bg-[#141414]  ${
                filterSelected === "By Department" ? "bg-[#333333]" : ""
              }`}
            >
              <p>By Department</p>
            </div>
          </div>

          <div
            className={` overflow-hidden transition-all duration-500 ease-in-out flex items-center justify-center ${filterSelected === "By Department" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"} `}
          >
            <div className="p-10">
              <Select onValueChange={setDepartmentSelected}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {allAnsweredDepartments.map((department) => (
                    <SelectItem value={department} key={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div
            key={"By Senator"}
            onClick={() => setFilterSelected("By Senator")}
          >
            <div
              className={`text-white p-3 cursor-pointer hover:bg-[#141414]  ${
                filterSelected === "By Senator" ? "bg-[#333333]" : ""
              }`}
            >
              <p>By Senator</p>
            </div>
            <hr />
          </div>

          <div
            className={` overflow-hidden transition-all duration-500 flex items-center  justify-center ease-in-out ${filterSelected === "By Senator" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"} `}
          >
            <div className="p-10">
              <Select onValueChange={setSenatorSelected}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Senator" />
                </SelectTrigger>
                <SelectContent>
                  {SENATOR_LIST.map((senator) => (
                    <SelectItem value={senator.split(". ")[0]} key={senator}>
                      {senator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div
          id="charts"
          className="bg-[#1A1A1A] w-full  h-full rounded-md p-5 flex flex-col gap-5 bg-opacity-50"
        >
          {filterSelected === "All Departments" ? (
            <BarChartHorizontal
              title={filterSelected}
              description={FILTER_DESCRIPTIONS[filterSelected]}
              data={groupByField(allData, "department")}
            />
          ) : filterSelected === "By Department" ? (
            !departmentSelected ? (
              <p className="text-white font-bold font-sans lg:text-3xl sm-text-2xl cursor-pointer">
                Choose a Department
              </p>
            ) : (
              <BarChartHorizontal
                title={filterSelected}
                description={FILTER_DESCRIPTIONS[filterSelected]}
                data={departmentData}
              />
            )
          ) : filterSelected === "By Senator" ? (
            !senatorSelected ? (
              <p className="text-white font-bold font-sans lg:text-3xl sm-text-2xl cursor-pointer">
                Choose a senator
              </p>
            ) : (
              <BarChartHorizontal
                title={filterSelected}
                description={FILTER_DESCRIPTIONS[filterSelected]}
                data={senatorData}
              />
            )
          ) : (
            <BarChartHorizontal
              title={filterSelected}
              description={FILTER_DESCRIPTIONS[filterSelected]}
              data={allSenators}
            />
          )}
        </div>
      </div>

      <Image
        src={"/graphics/footer.png"}
        alt={"Footer"}
        width={400}
        height={400}
      />
    </div>
  );
}
