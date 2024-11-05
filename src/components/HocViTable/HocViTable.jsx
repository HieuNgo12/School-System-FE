import * as React from "react";
import { Input, Table, Button } from "antd";
import { useState, useEffect } from "react";
import { ColumnProps } from "antd/lib/table";
import { render } from "react-dom";
import "antd/dist/antd.css";
import Select from "react-select";

const EditableTable = ({ tableData, setTableData, ...props }) => {
  useEffect(() => {
    // Set totals on initial render
    const newData = [...tableData];
    for (let index = 0; index < tableData.length; index++) {
      setTotal(newData, index);
    }
    setTableData(newData);
  }, []);

  const onInputChange = (key, index) => (e) => {
    const newData = [...tableData];

    newData[index][key] = e.target.value;
    setTotal(newData, index);
    setTableData(newData);
  };
  const onDeleteRow = (e, indexRow) => {
    console.log(indexRow + 1);

    const newData = tableData.filter((data, index) => {
      return Number(index) !== Number(indexRow);
    });
    setTableData(newData);
  };
  const onCheckRow = (e, indexRow) => {
    const newData = tableData.map((data, index) => {
      if (Number(index) === Number(indexRow)) {
        data["isChecked"] =true;
      }
      return data;
    });
    setTableData(newData);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const setTotal = (data, index) => {
    // Set total
    data[index]["totalCount"] = Number(
      data[index]["goals"] + data[index]["assists"]
    );
  };

  const onConfirm = () => {
    console.log(tableData);
  };
  const levels = [
    { value: "trungHoc", label: "Trung Học" },
    { value: "caoDang", label: "Cao Đẳng" },

    { value: "cuNhan", label: "Cử Nhân" },

    { value: "thacSi", label: "Thạc Sĩ" },
    { value: "tienSi", label: "Tiến Sĩ" },
    { value: "hauTienSi", label: "Hậu Tiến Sĩ" },
  ];

  const columns = [
    {
      dataIndex: "name",
      title: "",
      render: (text, record, index) => (
        <>
          <input
            type="checkbox"
            onChange={(e) => {
              onCheckRow(e, index);
            }}
          />
        </>
      ),
    },
    {
      dataIndex: "type",
      title: "Bậc",
      render: (text, record, index) => {
        return (
          <select name="type" id="type" onChange={onInputChange("type", index)}>
            {levels.map((level) => {
              return <option value={level.label}>{level.label}</option>;
            })}
          </select>
        );
      },
    },
    {
      dataIndex: "school",
      title: "Trường",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("school", index)} />
      ),
    },
    {
      dataIndex: "major",
      title: "Chuyên Ngành",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("major", index)} />
      ),
    },
    {
      dataIndex: "status",
      title: "Trạng Thái",
      render: (text, record, index) => (
        <div className="flex">
          <input type="checkbox" onChange={onInputChange("status", index)} />

          <div>Hoàn Thành</div>
        </div>
      ),
    },
    {
      dataIndex: "graduation",
      title: "Tốt Nghiệp",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("graduation", index)} />
      ),
    },
    {
      dataIndex: "delete",
      title: "delete",
      render: (text, record, index) => (
        <button
          style={{
            border: "1px solid black",
            padding: "8px",
            height: "50%",
            marginTop: "auto",
            borderRadius: "5%",
          }}
          onClick={(e) => {
            e.preventDefault();
            onDeleteRow(e, index);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="flex" style={{ padding: 20 }}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />

      <div className="action-btn"></div>
    </div>
  );
};

export default EditableTable;
