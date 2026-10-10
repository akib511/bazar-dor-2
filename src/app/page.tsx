import AllProducts from '@/component/AllProduct';
import Banner from '@/component/Banner';
import TopGainers from '@/component/TopGainers';
import TopLosers from '@/component/TopLosers';
import { Suspense } from 'react';


const page = () => {
  return (
    <div>
   <Banner />
     <Suspense> 
        <TopGainers /> 
    <TopLosers />
    <AllProducts />
        </Suspense>
    </div>
  );
};

export default page;