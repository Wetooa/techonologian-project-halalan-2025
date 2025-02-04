"use client";
import Image from "next/image";
import {useState, useEffect} from "react";
import {BarChartHorizontal} from "@/components/chart-bar-horizontal";
import {DropDownMenu} from "@/components/ui/radio-group";
import {PieChartWithLabels} from "@/components/piechart-withlabels";
import {isArray} from "google-spreadsheet/src/lib/lodash";
import {redirect} from "next/navigation";

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
export default function Home() {
    const [allData, setAllData] = useState<any[]>([]);
    const [courseData, setCourseData] = useState<any>(null);
    const [senatorData, setSenatorData] = useState<any[]>([]);
    const [totalVotes, setTotalVotes] = useState(0);

    // Fetch data and set up polling
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allResponse = await fetchAll();
                const courseResponse = await fetchByCourse("BSCS");
                const senatorResponse = await fetchBySenator("2");
                setAllData(() => {
                    return allResponse;
                });
                setSenatorData(senatorResponse);
                setCourseData(courseResponse);
                setTotalVotes(allResponse.reduce((sum :number, item : isArray) => sum + item[1], 0));

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
    }, []);

    useEffect(() => {
        // console.log("Updated Data being used: ", allData);
        // console.log("The senator Selected: ", senatorData);
        console.log("THe courses: ", courseData);
    }, [allData, senatorData]);

    const filterDescriptions = {
        "All": "Displays all available data without any filtering.",
        "All Departments": "Shows data related to all departments collectively.",
        "By Department": "Filters data based on specific departments.",
        "By Senator":
            "Filters data based on specific senators or their associated categories.",
    };
    const [filterSelected, setFilterSelected] = useState("All");
    // const choiceSelected= useState("All");
    return (
        <div
            className="bg-cover bg-center bg-[url('/graphics/background.png')] scroll-auto h-auto w-screen flex flex-col justify-center items-center gap-10 p-10">
            <Image
                src={"/graphics/title.png"}
                alt={"Halalan 2025"}
                width={600}
                height={600}
                className="mb-10  cursor-pointer hover:animate-pulse"
                onClick={() => redirect('/')}
            />
            <div className="grid sm:grid-flow-col md:grid-flow-col lg:grid-flow-col   grid-rows-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">                {/*{senatorNames.map((senator, index) => (*/}
                {/*  <Image*/}
                {/*    key={index}*/}
                {/*    src={`/senators/${index + 1}.png`}*/}
                {/*    alt={`Senator ${senator}`}*/}
                {/*    width={125}*/}
                {/*    height={125}*/}
                {/*    className="self-center w-full sm:w-32 md:w-40 lg:w-44 hover:scale-105"*/}
                {/*  />*/}
                {/*))}*/}

                {
                    allData
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 12)
                        .map((senator, index) => (
                            <div key={index}
                                 className='flex items-center bg-[#FDFDFD]   drop-shadow-lg rounded-lg gap-7 justify-between p-3 hover:scale-105 cursor-pointer ' onClick={() =>redirect(`https://www.google.com/search?q=${senator[0].split('.')[1]}`)}>
                                <div className='flex flex-row items-center gap-5 '>
                                    <p className={`font-bold font-sans select-none ${index + 1 < 10 ? 'text-5xl' : 'text-3xl'}`}>{index + 1}</p>
                                    <Image src={`/senators/${senator[0].split('.')[0]}.png`}
                                           alt={senator[0].split('.')[1]} height={50} width={50}
                                           className='rounded-full  bg-gray-500 shadow-md'/>
                                    <p className={`font-bold  font-sans ${senator[0].split('.')[1].length > 30 ? 'text-sm' : 'text-lg'} sm:text-base md:text-xl lg:text-2xl select-none`}>
                                        {senator[0].split('.')[1]}
                                    </p>
                                </div>
                                <p className='justify-end font-bold text-2xl font-sans select-none'>
                                    {totalVotes ? ((senator[1] / totalVotes) * 100).toFixed(1) + "%" : "0%"}
                                </p>

                            </div>
                        ))
                }


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
                        <p className="  text-white font-bold font-sans lg:text-3xl sm-text-2xl cursor-pointer">
                            FILTERS
                        </p>
                    </header>
                    <hr/>
                    <div key={"All"} onClick={() => setFilterSelected("All")}>
                        <div
                            className={`text-white p-3 cursor-pointer hover:bg-[#141414]  ${
                                filterSelected === "All" ? "bg-[#333333]" : ""
                            }`}
                        >
                            <p>All</p>
                        </div>
                        <hr/>
                    </div>
                    <div key={"All Departments"} onClick={() => setFilterSelected("All Departments")}>
                        <div
                            className={`text-white p-3 cursor-pointer hover:bg-[#141414]  ${
                                filterSelected === "All Departments" ? "bg-[#333333]" : ""
                            }`}
                        >
                            <p>All Departments</p>
                        </div>
                        <hr/>
                    </div>
                    <div key={"By Department"} onClick={() => setFilterSelected("By Department")}>
                        <div
                            className={`text-white p-3 cursor-pointer hover:bg-[#141414]  ${
                                filterSelected === "By Department" ? "bg-[#333333]" : ""
                            }`}
                        >
                            <p>By Department</p>
                        </div>
                    </div>
                    <div
                        className={`
    overflow-hidden transition-all duration-500 ease-in-out flex items-center justify-center
    ${filterSelected === "By Department" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
  `}
                    >
                        {/* Inner container with padding */}
                        <div className="p-10">
                            <DropDownMenu senatorNames={allData}/>
                        </div>
                    </div>


                    <div key={"By Senator"} onClick={() => setFilterSelected("By Senator")}>
                        <div
                            className={`text-white p-3 cursor-pointer hover:bg-[#141414]  ${
                                filterSelected === "By Senator" ? "bg-[#333333]" : ""
                            }`}
                        >
                            <p>By Senator</p>
                        </div>
                        <hr/>
                    </div>

                    <div
                        className={`
    overflow-hidden transition-all duration-500 flex items-center  justify-center ease-in-out
    ${filterSelected === "By Senator" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
  `}
                    >
                        {/* Inner container with padding */}
                        <div className="p-10">
                            <DropDownMenu senatorNames={allData}/>
                        </div>
                    </div>
                </div>
                <div
                    id="charts"
                    className="bg-[#1A1A1A] w-full  h-full rounded-md p-5 flex flex-col gap-5 bg-opacity-50"
                >
                    {filterSelected === "All Departments" ? (
                        <PieChartWithLabels/>
                    ) : filterSelected === "By Senator" ? (
                        <BarChartHorizontal
                            title={filterSelected}
                            description={filterDescriptions[filterSelected]}
                            data={allData}
                        />
                    ) : (
                        <BarChartHorizontal
                            title={filterSelected}
                            description={filterDescriptions[filterSelected]}
                            data={allData}
                        />
                    )}
                </div>
            </div>
            <footer className='mt-10'>
                <Image
                    src={'/graphics/footer.png'}
                    onClick={() => redirect("")}
                    width={400}
                    height={300}
                    alt={"Footer"}
                />
            </footer>
        </div>
    );
}
