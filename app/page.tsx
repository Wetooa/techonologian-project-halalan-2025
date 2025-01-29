'use client'
import Image from "next/image";
import {useState} from "react";
export default function Home() {
    // const response = await fetch("http://localhost:3000/api/all", {
    //   method: "GET",
    // });
    // const data = await response.json();
    // console.log(data);
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
    const filters = ["All", "All Departments", "All Voter's Detail", "By Department", "By Senator"];
    const [filterSelected, setFilterSelected] = useState(0);
    // const choiceSelected= useState("All");

    return (
        <div
            className="bg-cover bg-center bg-[url('/graphics/background.png')] scroll-auto h-auto w-screen flex flex-col justify-center items-center gap-10 p-10">
            <Image src={'/graphics/title.png'} alt={"Halalan 2025"} width={600} height={600}
                   className="mb-10  cursor-pointer hover:animate-pulse"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {senatorNames.map((senator, index) => (
                    <Image
                        key={index}
                        src={`/senators/${index + 1}.png`}
                        alt={`Senator ${senator}`}
                        width={125}
                        height={125}
                        className="self-center w-full sm:w-32 md:w-40 lg:w-44 hover:scale-105"
                    />
                ))}
            </div>
            <div id="" className='w-full flex flex-row justify-center pl-5 pr-5 items-start gap-5 '>
                <div id='filters' className="bg-[#1A1A1A] h-auto w-1/3 rounded-md ">
                    <header className='p-3 gap-2 flex flex-row'>
                        <Image src={'/graphics/filter.png'} width={25} height={10} alt={"Filter icon"}/>
                        <p className='text-white font-bold font-sans lg:text-3xl sm-text-2xl cursor-pointer'>
                            FILTERS
                        </p>
                    </header>
                    <hr/>
                    {filters.map((filter, index) => (
                        <div key={index} onClick={() => setFilterSelected(index)}>
                            <div
                                className={`text-white p-3 cursor-pointer hover:bg-[#141414] ${filterSelected === index ? 'bg-[#333333]' : ''}`}>
                                <p>{filter}</p>
                            </div>
                            <hr/>
                        </div>


                    ))}
                    <div
                        className={`h-32 flex flex-col gap-3 text-white ${filters[filterSelected] === "By Senator" ? '' : "hidden"}`}>
                        <p>Senator Name</p>

                        <div className="relative inline-block text-left">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                                Menu
                            </button>

                            <div
                                className="dropdown-content absolute hidden bg-white text-black shadow-lg rounded-md mt-2 w-48 group-hover:block">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 1</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 2</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 3</a>
                            </div>
                        </div>

                    </div>
                </div>
                <div id='charts' className="bg-[#1A1A1A] w-full h-full rounded-md p-5">
                    <header className='flex flex-row gap-2'>
                        <Image src={'/graphics/graph.png'} width={30} height={10} alt={"Chart icon"}
                        />
                        <p className='text-white font-bold font-sans lg:text-3xl sm-text-2xl'>
                            {filters[filterSelected]}
                        </p>
                    </header>
                </div>


            </div>
        </div>
    );
}

