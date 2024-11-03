import React from "react";
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
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("First Name Is Required"),
  des: Yup.string().required("Date Of Birth is Required"),
  code: Yup.number().required("Required"),
});
function CreateNewPositionModal({
  teacherPositionList,
  open,
  setOpen,
  ...props
}) {
  const [isActive, setIsActive] = useState(true);
  const formik = useFormik({
    initialValues: {
      name: "",
      des: "",
      code: "",
      isActive: true,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await axios.post(
        "http://localhost:8080/teachers-positions",
        {
          name: values.name,

          des: values.des,
          code: values.code,
          isActive: isActive,
        }
      );
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
            <DialogPanel transition className=" relative ">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="flex">
                      <div style={{ marginRight: "12px" }}></div>
                      <div>
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold text-gray-900"
                        >
                           Vị trí công tác
                        </DialogTitle>
                        <div className="">
                          <div>Mã</div>
                          <input
                            id="code"
                            name="code"
                            style={{
                              marginTop: "9px",

                              border: "1px solid grey",
                              borderRadius: "5%",
                              padding: "6px",
                              marginRight: "12px",
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.code}
                          />
                        </div>
                        <div>
                          <div>Tên</div>
                          <input
                            id="name"
                            name="name"
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
                        <div>
                          <div>Mô tả</div>
                          <input
                            id="des"
                            name="des"
                            style={{
                              marginTop: "9px",

                              border: "1px solid grey",
                              borderRadius: "5%",
                              padding: "6px",
                              marginRight: "12px",
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.des}
                          />
                        </div>
                        <div>
                          <div>Trạng Thái</div>
                          <div className="flex">
                            <div
                              className="  p-2 hover-button"
                              style={
                                !isActive
                                  ? { borderRadius: "6px", fontSize: "12px" }
                                  : {
                                      borderRadius: "6px",
                                      fontSize: "12px",
                                      backgroundColor: "green",
                                    }
                              }
                              onClick={() => {
                                setIsActive(true);
                              }}
                            >
                              Hoạt Động
                            </div>
                            <div
                              className="hover-button p-2"
                              style={
                                isActive
                                  ? { borderRadius: "6px", fontSize: "12px" }
                                  : {
                                      borderRadius: "6px",
                                      fontSize: "12px",
                                      backgroundColor: "green",
                                    }
                              }
                              onClick={() => {
                                setIsActive(false);
                              }}
                            >
                              Ngừng
                            </div>
                          </div>
                        </div>
                      </div>
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
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default CreateNewPositionModal;
