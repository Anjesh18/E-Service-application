import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

export default function FilterServices() {
    const filterData=[
        {
            filterType:"Location",
            array:['Pune','Delhi','Noida','Mumbai','Bengaluru']
        },
        {
            filterType:"Service",
            array:["Carpenter","Plumber","Washer"]
        }
    ]
  return (
    <div className='  '>
      <div className='flex flex-col'>
        <h1 className='my-5 font-extrabold underline text-2xl'>Filter Services</h1>
        <ul className='p-2 '>
        <RadioGroup>
           {filterData.map((item,idx)=>(
            <div key={idx}>
                <h1 className='text-lg my-2 font-bold'>{item.filterType}</h1>
                <div>{item.array.map((data,idx)=>(
                    <div><RadioGroupItem value={data} key={idx}/>
                    <Label>{data}</Label></div>
                ))}</div>
            </div>
           ))}
            </RadioGroup>
        </ul>
      </div>
    </div>
  )
}
