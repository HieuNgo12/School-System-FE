import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Button } from "@mui/material";
import TeacherTable from "./components/TeacherTable";
import TeacherPositionTable from "./components/TeacherPositionTable";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CreateNewModal from "./components/CreateNewModal";

function App() {
  const [count, setCount] = useState(0);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherPositionList, setTeacherPositionList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [orgList, setOrgList] = useState([]);
  const itemsPerPage = 10;
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const getTeacher = async () => {
      const originalList = await axios.get(`http://localhost:8080/teachers`);

      const teacher = await axios.get(
        `http://localhost:8080/teachers?limit=${itemsPerPage}&page=${currentPage}`
      );
      setPageCount(Math.ceil(originalList.data.data.length / itemsPerPage));
      setOrgList(originalList.data.data);

      setTeacherList(teacher.data.data);
    };
    const getTeacherPosition = async () => {
      const teacherPosition = await axios.get(
        "http://localhost:8080/teachers-positions"
      );

      setTeacherPositionList(teacherPosition.data.data);
    };

    getTeacher();
    getTeacherPosition();
  }, []);
  useEffect(() => {
    const getTeacherByPage = async () => {
      const teacher = await axios.get(
        `http://localhost:8080/teachers?limit=${itemsPerPage}&page=${currentPage}`
      );
      setTeacherList(teacher.data.data);
    };
    getTeacherByPage();
  }, [currentPage]);
  const handlePageClick = ({ selected }) => {
    // setLoading(true);
    setCurrentPage(selected);
  };
  return (
    <>
      <div className="text-left">
        <Navbar />
        <CreateNewModal open={openModal} setOpen={setOpenModal} />
        <div className="flex" style={{ marginLeft: "75%" }}>
          <input
            placeholder="Tìm kiếm thông tin"
            style={{
              border: "1px solid black",
              borderRadius: "5%",
              padding: "6px",
              marginRight: "12px",
            }}
          />
          <button
            style={{
              border: "1px solid black",
              borderRadius: "5%",
              padding: "6px",
              marginRight: "12px",
            }}
          >
            Tải lại
          </button>
          <button
            style={{
              border: "1px solid black",
              borderRadius: "5%",
              padding: "6px",
              marginRight: "12px",
            }}
            onClick={()=>{
              setOpenModal(true)
            }}
          >
            Tạo mới
          </button>
        </div>

        {teacherList.length ? <TeacherTable teacherList={teacherList} /> : null}
        <div className="flex">
          <div style={{ marginLeft: "70%" }}>Total: {orgList.length}</div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
        {teacherPositionList.length ? (
          <TeacherPositionTable teacherPositionList={teacherPositionList} />
        ) : null}
      </div>
    </>
  );
}

export default App;
