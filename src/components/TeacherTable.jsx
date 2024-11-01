import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";

function TeacherTable({ teacherList, ...props }) {


  useEffect(() => {
    console.log(teacherList);
  }, []);
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-12 py-3 w-16">
              Mã
            </th>
            <th scope="col" class="px-12 py-3">
              Giáo Viên
            </th>
            <th scope="col" class="px-12 py-3">
              Trình Độ {"(Cao Nhất)"}
            </th>
            <th scope="col" class="px-12 py-3">
              Bộ môn
            </th>
            <th scope="col" class="px-12 py-3">
              TT Công việc
            </th>
            <th scope="col" class="px-6 py-3">
              Địa Chỉ
            </th>
            <th scope="col" class="px-6 py-3">
              Trạng Thái
            </th>
            <th scope="col" class="px-6 py-3">
              Hành Động
            </th>
          </tr>
        </thead>
        {teacherList.map((teacher) => {
          return (
            <tbody>
              {" "}
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {teacher.code}
                </th>
                <td class="px-6 py-4">{teacher.userId.name}</td>
                <td class="px-6 py-4">{teacher.degrees[0].major}</td>
                <td class="px-6 py-4">
                  <div>
                    <b>Bậc:</b> {teacher.degrees[0].school}
                  </div>
                  <div>
                    <b>Chuyên Ngành: </b>
                    {teacher.degrees[0].major}
                  </div>
                </td>

                <td class="px-6 py-4">N/A</td>
                <td class="px-6 py-4">{teacher.teacherPositionsId[0].name}</td>
                <td class="px-6 py-4">{teacher.userId.address}</td>

                <td class="px-6 py-4">
                  {teacher.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                </td>
                <td class="px-6 py-4">
                  <button>Chi tiết</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      ;
    </div>
  );
}

export default TeacherTable;
