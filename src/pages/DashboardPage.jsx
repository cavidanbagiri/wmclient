
import React, { useEffect } from 'react'


import { useSelector, useDispatch } from 'react-redux';

import CommonService from '../services/common.services';

import PageTitleComponent from '../components/dashboard/PageTitleComponent';
import MenuSideComponent from '../components/dashboard/MenuSideComponent';
import StockAnalyzComponent from '../components/dashboard/StockAnalyzComponent';
import MaterialTypeComponent from '../components/dashboard/MaterialTypeComponent';
import STFAnalyzComponent from '../components/dashboard/STFAnalyzComponent';
import GroupChartComponent from '../components/dashboard/GroupChartComponent';
import TopCompaniesListComponent from '../components/dashboard/TopCompaniesListComponent';

const DashboardPage = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.userSlice.user);

  useEffect(() => {
    // dispatch(CommonService.getTopCompanies());
    // dispatch(CommonService.getStockAnalyz(user.projectId));
    // dispatch(CommonService.getGroupChartAnalyz(user.projectId));
  }, [])

  return (
    <div style={{ fontFamily: "IBM Plex Sans" }} className='flex flex-col  bg-white ' >

      <PageTitleComponent user={user} />

      <span className='ml-16 my-5 text-[40px] font-bold'>Ana Sayfa</span>

      <MenuSideComponent />


      <div className='grid grid-cols-12 gap-1 mt-10'>

        {/* <StockAnalyzComponent /> */}

        {/* <MaterialTypeComponent /> */}

        {/* <STFAnalyzComponent /> */}

        {/* <GroupChartComponent/> */}

        {/* <TopCompaniesListComponent/> */}

      </div>

    </div>
  )
}

export default DashboardPage