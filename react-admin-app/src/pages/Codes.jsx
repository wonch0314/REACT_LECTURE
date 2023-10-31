import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import CodesCard from "../partials/codes/CodesCard";
import Banner from "../partials/Banner";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../api";
import CodeEditModal from "../partials/codes/CodeEditModal";
import CodeDeleteModal from "../partials/codes/CodeDeleteModal";
import CodeAddModal from "../partials/codes/CodeAddModal";

function Codes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 실시간으로 입력되는 키워드 데이터 (ref를 사용해서 제거 가능)
  const [inputParentKeyword, setInputParentKeyword] = useState(null);
  const [inputChildKeyword, setInputChildKeyword] = useState(null);
  // 검색 버튼 클릭 시 실제 서버로 전송될 키워드 데이터
  const [parentKeyword, setParentKeyword] = useState(null);
  const [childKeyword, setChildKeyword] = useState(null);

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

  useEffect(() => handleSearch(), [parentKeyword, childKeyword, page]);
  useEffect(() => {
    if (selectedItem) setOpenEditModal(true);
  }, [selectedItem]);

  const fetchCodes = async () => {
    // console.log('fetchCodes');
    let params = {
      parent_code: parentKeyword ? parentKeyword : null,
      code: childKeyword ? childKeyword : null,
      pageCount: pageCount,
      _page: page,
      _limit: limit,
      _sort: sort,
      _order: order,
    };
    return await useApi().api.codes.getAll(params);
  };

  const fetchCode = async (id) => {
    console.log("fetchCode");
    await useApi()
      .api.codes.get(id)
      .then((data) => {
        setSelectedItem(data);
      });
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["codes", parentKeyword, childKeyword, page],

    queryFn: () => {
      return fetchCodes();
    },

    enabled: false,
  });

  const handleSearch = () => {
    queryClient.prefetchQuery(
      ["codes", parentKeyword, childKeyword, page],
      () => fetchCodes()
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
    fetchCode(id);
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
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      id="table-search-parent"
                      className="block p-2 pl-3 rounded-lg w-50 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="상위코드"
                      onChange={(event) =>
                        setInputParentKeyword(event.target.value)
                      }
                    ></input>
                    <input
                      type="text"
                      id="table-search-child"
                      className="block ml-3 p-2 pl-3 rounded-lg w-50 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="하위코드"
                      onChange={(event) =>
                        setInputChildKeyword(event.target.value)
                      }
                    ></input>
                    <Link
                      onClick={(event) => {
                        setPage(1);
                        setParentKeyword(inputParentKeyword);
                        setChildKeyword(inputChildKeyword);
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
                      <span className="hidden xs:block ml-2">Add Code</span>
                    </button>
                  </div>
                </div>

                {/* Cards */}
                <div className="w-full ">
                  {/* Table (공통 코드 관리 테이블) */}
                  <CodesCard
                    payload={data}
                    onChangePage={onChangePage}
                    onDetailView={onDetailView}
                    onDeleteView={onDeleteView}
                  ></CodesCard>
                </div>
              </div>
            </main>

            <Banner />
          </div>
        </div>
      ) : null}
      {openAddModal ? (
        <CodeAddModal
          isOpen={openAddModal}
          onClose={closeAddModal}
        ></CodeAddModal>
      ) : null}
      {openEditModal ? (
        <CodeEditModal
          isOpen={openEditModal}
          selectedItem={selectedItem}
          onClose={closeEditModal}
        ></CodeEditModal>
      ) : null}
      {openDeleteModal ? (
        <CodeDeleteModal
          isOpen={openDeleteModal}
          selectedId={selectedId}
          onClose={closeDeleteModal}
        ></CodeDeleteModal>
      ) : null}
    </>
  );
}

export default Codes;
