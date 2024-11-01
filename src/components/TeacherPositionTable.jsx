import React, { useEffect } from "react";

function TeacherPositionTable({ teacherPositionList, ...props }) {
  useEffect(() => {
    console.log(teacherPositionList);
  }, []);
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              STT
            </th>
            <th scope="col" class="px-6 py-3">
              Mã
            </th>
            <th scope="col" class="px-6 py-3">
              Tên
            </th>
            <th scope="col" class="px-6 py-3">
              Trạng Thái
            </th>

            <th scope="col" class="px-6 py-3">
              Mô Tả
            </th>
          </tr>
        </thead>
        {teacherPositionList.map((teacherPosition, i) => {
          return (
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td class="px-6 py-4">{teacherPosition.code}</td>
                <td class="px-6 py-4">{teacherPosition.name}</td>
                <td class="px-6 py-4">
                  {teacherPosition.isActive ? "Hoạt Động" : null}
                </td>
                <td class="px-6 py-4">{teacherPosition.des}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
export default TeacherPositionTable;
