import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/main/WelcomeBanner';
import DashboardAvatars from '../partials/main/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/main/DashboardCard01';
import DashboardCard02 from '../partials/main/DashboardCard02';
import DashboardCard03 from '../partials/main/DashboardCard03';
import DashboardCard04 from '../partials/main/DashboardCard04';
import DashboardCard05 from '../partials/main/DashboardCard05';
import DashboardCard06 from '../partials/main/DashboardCard06';
import DashboardCard07 from '../partials/main/DashboardCard07';
import DashboardCard08 from '../partials/main/DashboardCard08';
import DashboardCard09 from '../partials/main/DashboardCard09';
import DashboardCard10 from '../partials/main/DashboardCard10';
import DashboardCard11 from '../partials/main/DashboardCard11';
import DashboardCard12 from '../partials/main/DashboardCard12';
import DashboardCard13 from '../partials/main/DashboardCard13';
import Banner from '../partials/Banner';
import useAuth from '../hooks/useAuth';

function Main() {
  console.log('Main > useAuth');
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // return에 비교구문을 넣어서 로그인이 안되어 있으면 보이지 않도록 해야 한다.
  // 그렇지 않으면 메인 화면이 잠깐 보였다가 다름 프레임에 로그인 화면으로 넘어간다.
  return user ? (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
              {/* Card (Customers) */}
              <DashboardCard10 />
              {/* Card (Reasons for Refunds) */}
              <DashboardCard11 />
              {/* Card (Recent Activity) */}
              <DashboardCard12 />
              {/* Card (Income/Expenses) */}
              <DashboardCard13 />
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  ) : null;
}

export default Main;
