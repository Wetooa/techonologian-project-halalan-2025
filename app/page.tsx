'use client'
import Image from "next/image";
import {useState} from "react";
import {BarChartHorizontal} from "@/components/chart-bar-horizontal";
import {DropDownMenu} from "@/components/ui/radio-group";
import { PieChartWithLabels } from "@/components/piechart-withlabels";
import SenatorCard from "@/components/ui/senator-card";


function fetchAll(){
    fetch("http://localhost:3000/api/all", {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}

function fetchByCourse(course : string){
    fetch(`http://localhost:3000/api/by-course/${course}`, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function fetchBySenator(senatorNumber : string){
    fetch(`http://localhost:3000/api/by-senator/${senatorNumber}`, {
        method: "GET",

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

        })
        .catch(error => {
            console.error('There was a problem fetching results bySenator', error);
        });
}
export default function Home() {
    fetchAll();
    const senatorNames = [
        "Bam Aquino",
        "Pangalinan Kiko",
        "De Guzman Ka Leody",
        "Espiritu Luke",
        "Ong Doc Willie",
        "Brosas Arlene",
        "Matula, Atty Sonny & Mendoza, Heidi",
        "Castro Teacher France",
        "Lacson Ping",
        "Casiño, Teddy & Marquez, Norman"
    ];
    const filters = ["All", "All Departments",  "By Department", "By Senator"];
    const filterDescriptions = {
        "All": "Displays all available data without any filtering.",
        "All Departments": "Shows data related to all departments collectively.",
        "All Voter's Detail": "Provides comprehensive details of all voters.",
        "By Department": "Filters data based on specific departments.",
        "By Senator": "Filters data based on specific senators or their associated categories."
    };
    const [filterSelected, setFilterSelected] = useState("All");
    return (
        <div
            className="bg-cover bg-center bg-[url('/graphics/background.png')] scroll-auto h-auto w-screen flex flex-col justify-center items-center gap-10 p-10">
            <Image src={'/graphics/title.png'} alt={"Halalan 2025"} width={600} height={600}
                   className="mb-10  cursor-pointer hover:animate-pulse"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <SenatorCard senatorName={"1"} position={1} votePercentage={"99"}/>
                <SenatorCard senatorName={"2"} position={2} votePercentage={"95"}/>
            </div>
            <div id="" className="w-full flex flex-col lg:flex-row justify-center  pl-5 pr-5 items-start gap-5">
                <div id='filters' className="bg-[#1A1A1A] h-auto  xl:w-1/3 2xl:w-1/3 lg:w-1/3 w-full  rounded-md ">
                    <header className='p-3 gap-2 flex flex-row'>
                        <Image src={'/graphics/filter.png'} width={25} height={10} alt={"Filter icon"}/>
                        <p className='text-white font-bold font-sans lg:text-3xl sm-text-2xl cursor-pointer'>
                            FILTERS
                        </p>
                    </header>
                    <hr/>
                    {filters.map((filter, index) => (
                        <div key={index} onClick={() => setFilterSelected(filter)}>
                            <div
                                className={`text-white p-3 cursor-pointer hover:bg-[#141414]  ${filterSelected === filter ? 'bg-[#333333]' : ''}`}>
                                <p>{filter}</p>
                            </div>
                            <hr/>
                        </div>
                    ))}
                    <div className= {`flex justify-center items-center p-10 ${filterSelected === "By Senator" ? '' : 'hidden' }`}>
                        <DropDownMenu senatorNames = {senatorNames} />
                    </div>

                </div>
                <div id='charts' className="bg-[#1A1A1A] w-full  h-full rounded-md p-5 flex flex-col gap-5 bg-opacity-50">
                    {
                        filterSelected === "All Departments"
                            ? <PieChartWithLabels />
                            : <BarChartHorizontal
                                title={filterSelected}
                                description={filterDescriptions[filterSelected]}
                            />
                    }

                </div>


            </div>
        </div>
    );
}

