import React, { useEffect, useState } from "react";

function UsersCard({ payload, onChangePage, onDetailView, onDeleteView }) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowCount, setRowCount] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [pageNumbers, setPageNumbers] = useState([]);
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(0);

  useEffect(() => {
    if (!payload?.data) return;
    setPagination();
  }, [payload]);

  const setPagination = () => {
    const currentPage = payload?.currentPage; // 현재 페이지
    const totalCount = payload?.totalCount; // 디비에 있는 전체 로우 건수

    const rowCount = payload?.rowCount; // 한 페이지에 보여줄 데이터 로우 개수
    let pageCount = payload?.pageCount; // 그룹당 보여줄 페이지 버튼 개수

    const totalPage = Math.ceil(totalCount / rowCount); // 전체 페이지 개수
    const pageGroup = Math.ceil(currentPage / pageCount); // 현재 페이지 기준으로 페이지 버튼 그룹
    console.log("currentPage:", currentPage);
    console.log("pageCount:", pageCount);
    console.log("pageGroup:", pageGroup);

    // 그룹 내 마지막 페이지
    let endPage = pageGroup * pageCount;
    if (endPage > totalPage) {
      endPage = totalPage;
    }

    // 그룹 내 첫번째 페이지
    let startPage = endPage - (pageCount - 1);
    if (startPage < 1) startPage = 1;

    let nextPage = endPage + 1; // 그룹의 다음 페이지
    if (nextPage > totalPage) {
      nextPage = totalPage;
    }

    let prevPage = startPage - 1; // 그룹의 이전 페이지
    if (prevPage < 1) {
      prevPage = 1;
    }

    console.log("totalPage:", totalPage);
    console.log("startPage:", startPage);
    console.log("endPage:", endPage);
    console.log("prevPage:", prevPage);
    console.log("nextPage:", nextPage);

    /**
     * 테이블에 표시할 데이터
     */
    setData(payload?.data);

    /**
     * 페이징 설정 값을 사용하여 화면에 표시하기 위한 용도
     */
    setCurrentPage(currentPage);
    setRowCount(rowCount);
    setTotalCount(totalCount);
    setTotalPage(totalPage);

    /**
     * 페이징 링크 버튼들
     */
    setPrevPage(prevPage);
    generatePageNumbers(currentPage, startPage, endPage);
    setNextPage(nextPage);
    setStartPage(startPage);
    setEndPage(endPage);
  };
  /**
   * 그룹에 해당하는 페이지 번호 링크를 생성한다.
   */
  const generatePageNumbers = (currentPage, startPage, endPage) => {
    const numbers = [];
    let bgColor = "";
    for (let i = startPage; i <= endPage; i++) {
      if (i === currentPage) {
        console.log("generatePageNumbers::currentPage:", currentPage);
        bgColor = "bg-blue-400";
      } else {
        bgColor = "bg-white";
      }
      numbers.push(
        <li key={i}>
          <a
            href="#"
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${bgColor}  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => onChangePage(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    setPageNumbers(numbers);
  };

  return (
    <div className="w-full col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          공통코드 관리
        </h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  아이디
                </th>
                <th scope="col" className="px-6 py-3">
                  이메일
                </th>
                <th scope="col" className="px-6 py-3">
                  이름
                </th>
                <th scope="col" className="px-6 py-3">
                  패스워드
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      ></input>
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4">
                    <a
                      className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={(event) => {
                        event.preventDefault();
                        onDetailView(item.id);
                      }}
                    >
                      {item.email}
                    </a>
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.password}</td>
                  <td className="px-6 py-4">
                    <a
                      className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteView(item.id);
                      }}
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav
            className="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {/* 현재 페이징 데이터 정보 */}
              {"총 "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalCount}
              </span>{" "}
              중에{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentPage * rowCount - rowCount + 1}-
                {currentPage * rowCount > totalCount
                  ? totalCount
                  : currentPage * rowCount}
              </span>
            </span>
            <ul className="inline-flex -space-x-px text-sm h-8">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => {
                    onChangePage(1);
                  }}
                >
                  처음
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => {
                    onChangePage(prevPage);
                  }}
                >
                  이전
                </a>
              </li>
              {startPage > 1 ? (
                <span className="text-slate-600">{`...`}</span>
              ) : null}
              {pageNumbers}
              {endPage < totalPage ? (
                <span className="text-slate-600">{`...`}</span>
              ) : null}
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => {
                    onChangePage(nextPage);
                  }}
                >
                  다음
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => {
                    onChangePage(totalPage);
                  }}
                >
                  마지막
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default UsersCard;
