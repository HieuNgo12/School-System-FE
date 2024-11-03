import * as React from "react";
import { Input, Table, Button } from "antd";
import { useState, useEffect } from "react";
import { ColumnProps } from "antd/lib/table";
import { render } from "react-dom";

const dataSource = [
  {
    id: "1",
    name: "Bậc",
    school: "Đh",
    graduation: "",
    status: false,
    major: ""
  },
];

const EditableTable = () => {
  const [tableData, setTableData] = useState(dataSource);

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
    console.log(tableData);

  };

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
      dataIndex: "level",
      title: "Bậc",
      render: (text, record, index) => (
        <>
          <select name="cars" id="cars">
            {levels.map((level) => {
              
              return <option value={level.value}>{level.label}</option>;
            })}
          </select>
        </>
      ),
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
  ];

  return (
    <div style={{ padding: 20 }}>
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
