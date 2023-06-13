import React, { useState } from 'react';
import { productData } from '../../../DataStatic/Data';

const BestDeals = () => {
    const [data,setData] = useState([]);
    const d = productData && productData.sort((a,b)=> b.total_sell - a.total_sell);
    const sliceData = d.slice(0,4) 
  console.log(d);
  return (
    <div>BestDeals</div>
  )
}

export default BestDeals