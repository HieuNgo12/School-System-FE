import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./CreateNewModal.css";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SelectWithCheckBox from "./SelectWithCheckbox/SelectWithCheckbox";
import HocViTable from "./HocViTable/HocViTable";
import { Button } from "flowbite-react";
import url from "../url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileUploader } from "react-drag-drop-files";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Required at least 2 letters")
    .max(50, "Required maximum 50 letters")
    .required("First Name Is Required"),
  dob: Yup.string().required("Date Of Birth is Required"),
  idNumber: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phoneNumber: Yup.number().required("Required"),

  email: Yup.string().required("Email is Required").email("Invalid email"),
});
const dataSource = [
  {
    id: "1",

    name: "Bậc",
    school: "",
    graduation: "",
    status: "",
    major: "",
    isChecked: false,
    type: "",
  },
];
const fileTypes = ["JPG", "PNG", "GIF"];

function CreateNewModal({ teacherPositionList, open, setOpen, ...props }) {
  const [selectList, setSelectList] = useState([]);
  const [majorSelectState, setMajorSelectState] = useState({
    optionSelected: null,
  });
  const [file, setFile] = useState(null);

  const [tableData, setTableData] = useState(dataSource);
  const notify = () => toast("Wow so easy!");
  const handleFileChange = (file) => {
    setFile(file);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const degrees = tableData.map((data) => {
        console.log(data);
        if (data?.isChecked === true) {
          return {
            type: data?.type,
            school: data?.school,
            major: data?.major,
            year: data?.graduation,
            isGraduated: data?.status === "on" ? true : false,
          };
        }
      });
      const response = await axios
        .post(`${url}/teachers`, {
          name: values.name,
          address: values.address,
          dob: values.dob,
          phoneNumber: values.phoneNumber,
          email: values.email,
          teacherPositionsId: majorSelectState?.optionSelected,
          degrees: degrees,
        })
        .then((data) => {
          toast.success("Successfully created teacher", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((e) => {
          console.log(e);

          toast.error(e.message + " Duplicate Email", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      // return redirect("");

      // setSuccess(true);
    },
  });
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <form onSubmit={formik.handleSubmit}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex  items-end justify-center p-4 items-center text-center sm:items-center sm:p-0">
            <DialogPanel transition className="create-new-user-modal relative ">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="flex">
                      <div style={{ marginRight: "12px" }}>
                        <img
                          src="./profileImage.jpg"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>

                      <div>
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold text-gray-900"
                        >
                          Tạo thông tin giáo viên
                        </DialogTitle>
                        <div className="mt-2">
                          <p
                            className="text-sm text-gray-500"
                            style={{
                              fontWeight: "bold",
                              fontSize: "16px",
                              marginBottom: "16px",
                            }}
                          >
                            Thông tin cá nhân
                          </p>
                          <div className="flex">
                            <div>
                              <div>Họ và Tên</div>
                              <div>
                                <input
                                  id="name"
                                  name="name"
                                  placeholder="VD: Nguyễn Văn A"
                                  style={{
                                    marginTop: "9px",

                                    border: "1px solid grey",
                                    borderRadius: "5%",
                                    padding: "6px",
                                    marginRight: "12px",
                                  }}
                                  onChange={formik.handleChange}
                                  value={formik.values.name}
                                />
                              </div>
                              <div className="flex">
                                <div className="error-field ">
                                  {" "}
                                  {formik.errors.name && (
                                    <div>{formik.errors.name}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="ml-6">
                              <div>Ngày sinh</div>
                              <div>
                                <input
                                  id="dob"
                                  name="dob"
                                  placeholder="Chọn ngày sinh"
                                  type="date"
                                  style={{
                                    marginTop: "9px",
                                    border: "1px solid grey",
                                    borderRadius: "5%",
                                    padding: "6px",
                                    marginRight: "12px",
                                  }}
                                  onChange={formik.handleChange}
                                  value={formik.values.dob}
                                />
                              </div>
                              <div className="flex">
                                <div className="error-field ">
                                  {" "}
                                  {formik.errors.dob && (
                                    <div>{formik.errors.dob}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div>
                              <div>Số Điện Thoại</div>
                              <div>
                                <input
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  placeholder="Nhập Số Điện Thoại"
                                  style={{
                                    marginTop: "9px",

                                    border: "1px solid grey",
                                    borderRadius: "5%",
                                    padding: "6px",
                                    marginRight: "12px",
                                  }}
                                  onChange={formik.handleChange}
                                  value={formik.values.phoneNumber}
                                />
                              </div>
                              <div className="flex">
                                <div className="error-field ">
                                  {" "}
                                  {formik.errors.phoneNumber && (
                                    <div>{formik.errors.phoneNumber}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="ml-6">
                              <div>Email</div>
                              <div>
                                <input
                                  id="email"
                                  name="email"
                                  placeholder="example@school.edu.vn"
                                  type="email"
                                  style={{
                                    marginTop: "9px",
                                    border: "1px solid grey",
                                    borderRadius: "5%",
                                    padding: "6px",
                                    marginRight: "12px",
                                  }}
                                  onChange={formik.handleChange}
                                  value={formik.values.email}
                                />
                              </div>
                              <div className="flex">
                                <div className="error-field ">
                                  {" "}
                                  {formik.errors.email && (
                                    <div>{formik.errors.email}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div>
                              <div>Số CCCD</div>
                              <div>
                                <input
                                  id="idNumber"
                                  name="idNumber"
                                  placeholder="Nhập Số CCCD"
                                  style={{
                                    marginTop: "9px",

                                    border: "1px solid grey",
                                    borderRadius: "5%",
                                    padding: "6px",
                                    marginRight: "12px",
                                  }}
                                  onChange={formik.handleChange}
                                  value={formik.values.idNumber}
                                />
                              </div>
                              <div className="flex">
                                <div className="error-field ">
                                  {" "}
                                  {formik.errors.idNumber && (
                                    <div>{formik.errors.idNumber}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="ml-6">
                              <div>Address</div>
                              <div>
                                <input
                                  id="address"
                                  name="address"
                                  placeholder="Địa chỉ thường chú"
                                  style={{
                                    marginTop: "9px",
                                    border: "1px solid grey",
                                    borderRadius: "5%",
                                    padding: "6px",
                                    marginRight: "12px",
                                  }}
                                  onChange={formik.handleChange}
                                  value={formik.values.address}
                                />
                              </div>
                              <div className="flex">
                                <div className="error-field ">
                                  {" "}
                                  {formik.errors.address && (
                                    <div>{formik.errors.address}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div>Thông tin công tác</div>
                        {teacherPositionList.length ? (
                          <SelectWithCheckBox
                            list={selectList}
                            setList={setSelectList}
                            teacherPositionList={teacherPositionList}
                            state={majorSelectState}
                            setState={setMajorSelectState}
                          />
                        ) : null}{" "}
                      </div>
                      <div className="ml-6 mt-6">
                        <FileUploader
                          handleChange={handleFileChange}
                          name="file"
                          types={fileTypes}
                        />
                      </div>
                    </div>

                    <div className="ml-10">
                      <div className="flex">
                        <div className="mt-6 " style={{ fontSize: "12px" }}>
                          <b>Học vị</b>
                        </div>
                        <button
                          variant="outlined"
                          className="mr-6"
                          style={{
                            background: "white",
                            borderRadius: "5%",
                            border: "1px solid black",
                            padding: "6px",
                            marginLeft: "70%",
                            marginTop: "6px",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            setTableData([
                              ...tableData,
                              {
                                id: tableData.length + 1,

                                name: "",
                                school: "",
                                graduation: "",
                                status: "",
                                major: "",
                              },
                            ]);
                          }}
                        >
                          Thêm Học Vị
                        </button>
                      </div>
                      <HocViTable
                        tableData={tableData}
                        setTableData={setTableData}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Lưu
                </button>
                <button
                  type="submit"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
            <ToastContainer />
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default CreateNewModal;
