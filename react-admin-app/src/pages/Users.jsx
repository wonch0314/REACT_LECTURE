import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import UsersCard from "../partials/users/UsersCard";
import Banner from "../partials/Banner";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../api";
import UserEditModal from "../partials/users/UserEditModal";
import UserDeleteModal from "../partials/users/UserDeleteModal";
import UserAddModal from "../partials/users/UserAddModal";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 실시간으로 입력되는 키워드 데이터 (ref를 사용해서 제거 가능)
  const [inputFilterKeyword, setInputFilterKeyword] = useState(null);

  // 검색 버튼 클릭 시 실제 서버로 전송될 키워드 데이터
  const [filterKeyword, setFilterKeyword] = useState(null);
  const [filterType, setFilterType] = useState(null);

  // 모달 오픈 설정
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // 수정을 위한 선택된 코드 객체
  const [selectedItem, setSelectedItem] = useState(null);

  // 삭제를 위한 선택된 코드 아이디
  const [selectedId, setSelectedId] = useState(0);

  // useQuery를 비활성화 하고, 클라이언트를 사용해서 필요한 시점에 fetch 한다.
  const queryClient = useQueryClient();

  // 로그인 사용자 정보 (로그인 사용자 정보를 활용할 수 있다.)
  const { user } = useAuth();

  /**
   * 페이지 설정
   */
  const [pageCount, setPageCount] = useState(5); // 페이지 그룹당 보여질 번호 최대 개수
  const [page, setPage] = useState(1); // 현재 페이지
  const [limit, setLimit] = useState(6); // 한 페이지에 보여질 로우 최대 개수

  /**
   * 코드 목록 소팅 기준 설정
   */
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState("desc");

  useEffect(() => handleSearch(), [filterKeyword, page]);
  useEffect(() => {
    if (selectedItem) setOpenEditModal(true);
  }, [selectedItem]);

  const fetchUsers = async () => {
    // console.log('fetchCodes');

    let params = {
      pageCount: pageCount,
      _page: page,
      _limit: limit,
      _sort: sort,
      _order: order,
    };

    params[filterType] = filterKeyword;
    console.log(params);
    return await useApi().api.user.getAll(params);
  };

  const fetchUser = async (id) => {
    console.log("fetchCode");
    await useApi()
      .api.user.get(id)
      .then((data) => {
        setSelectedItem(data);
      });
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users", filterKeyword, page],

    queryFn: () => {
      return fetchUsers();
    },

    enabled: false,
  });

  const handleSearch = () => {
    queryClient.prefetchQuery(["users", filterKeyword, page], () =>
      fetchUsers()
    );
  };

  if (isLoading) {
    console.log("Loading...");
  }
  if (error) return "에러:" + error.message;

  const onChangePage = async (page) => {
    setPage(page);
  };

  const onDetailView = async (id) => {
    fetchUser(id);
  };

  const onDeleteView = async (id) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  };

  const closeAddModal = () => {
    setOpenAddModal(false);
    refetch();
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
    setSelectedItem(null);
    refetch();
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedId(0);
    refetch();
  };

  return (
    <>
      {user ? (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
              <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
                {/* Dashboard actions */}
                <div className="flex justify-between items-center mb-4">
                  {/* Left: Search Bar */}
                  <div className="relative flex items-center gap-4">
                    <select
                      name="languages"
                      id="lang"
                      onChange={(e) => setFilterType(e.target.value)}
                      defaultValue={filterType}
                    >
                      <option value="email_like">EMAIL</option>
                      <option value="name_like">NAME</option>
                    </select>
                    <input
                      type="text"
                      id="table-search-parent"
                      className="block p-2 pl-3 rounded-lg w-50 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="검색 키워드"
                      onChange={(event) =>
                        setInputFilterKeyword(event.target.value)
                      }
                    ></input>
                    <Link
                      onClick={(event) => {
                        setPage(1);
                        setFilterKeyword(inputFilterKeyword);
                      }}
                    >
                      <div className="cursor-pointer inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>

                  {/* Right: Actions */}
                  <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Add Code button */}
                    <button
                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                      onClick={() => setOpenAddModal(true)}
                    >
                      <svg
                        className="w-4 h-4 fill-current opacity-50 shrink-0"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                      <span className="hidden xs:block ml-2">Add User</span>
                    </button>
                  </div>
                </div>

                {/* Cards */}
                <div className="w-full ">
                  {/* Table (공통 코드 관리 테이블) */}
                  <UsersCard
                    payload={data}
                    onChangePage={onChangePage}
                    onDetailView={onDetailView}
                    onDeleteView={onDeleteView}
                  ></UsersCard>
                </div>
              </div>
            </main>

            <Banner />
          </div>
        </div>
      ) : null}
      {openAddModal ? (
        <UserAddModal
          isOpen={openAddModal}
          onClose={closeAddModal}
        ></UserAddModal>
      ) : null}
      {openEditModal ? (
        <UserEditModal
          isOpen={openEditModal}
          selectedItem={selectedItem}
          onClose={closeEditModal}
        ></UserEditModal>
      ) : null}
      {openDeleteModal ? (
        <UserDeleteModal
          isOpen={openDeleteModal}
          selectedId={selectedId}
          onClose={closeDeleteModal}
        ></UserDeleteModal>
      ) : null}
    </>
  );
}

export default Users;
