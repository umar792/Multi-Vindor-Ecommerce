import React from 'react'
import { brandingData } from '../../../DataStatic/Data';
import "./UnderHero.css"

const UnderHero = () => {
  return (
    <div className='underHero'>
     {
        brandingData && brandingData.map((item,index)=>{
            return(
                <div className='underHero_map_child' key={index}>
                <div className='underHero_map_child_icon'>
                    {item.icon}
                    </div>
                <div className='underHero_map_child_icon'>
                    <h3>
                        {item.title}
                    </h3>
                        <p>{item.Description}</p>
                    </div>
                </div>
            )
        })
     }
    </div>
  )
}

export default UnderHero