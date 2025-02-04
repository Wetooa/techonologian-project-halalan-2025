import Image from "next/image";

interface SenatorCardProps{
    senatorName:  string,
    position: number,
    votePercentage : string,

}

export default function SenatorCard({senatorName, position, votePercentage}: SenatorCardProps){


    return(
        <>
            <div className='flex flex-row rounded-lg justify-between items-center pl-5 pr-2 pt-2 pb-2 bg-white w-full border-2 shadow-md gap-x-4'>
                <p className='font-bold text-5xl sm:text-3xl'>{position}</p>
                <Image src={`/senators/${senatorName}.png`} alt={senatorName} width={40} height={40} className='rounded-full border-accent'/>
                <p className='font-bold text-3xl sm:text-xl whitespace-nowrap mr-10'>{senatorName}</p>
                <p className='font-bold text-3xl sm:text-xl justify-self-end'>{votePercentage}%</p>
            </div>

        </>
    )


}