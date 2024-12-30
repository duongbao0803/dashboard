import React from "react";
import { useAuth } from "../../context/AuthProvider";
import { Button, Input, Space, Table, Tag } from "antd";
import { FilterOutlined, UserAddOutlined } from "@ant-design/icons";

const EmployeeList = () => {
  const { user, logout } = useAuth();

  // data table
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Chức danh",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Ngày hợp đồng",
      dataIndex: "hireDate",
      key: "hireDate",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Xóa</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phoneNumber: "0123456789",
      dateOfBirth: "1990-01-15",
      tags: ["developer", "team lead"],
      hireDate: "2015-06-01",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phoneNumber: "0987654321",
      dateOfBirth: "1992-05-20",
      tags: ["designer"],
      hireDate: "2017-09-10",
    },
    {
      key: "3",
      name: "Lê Văn C",
      email: "levanc@example.com",
      phoneNumber: "0909090909",
      dateOfBirth: "1988-11-30",
      tags: ["loser"],
      hireDate: "2020-01-25",
    },
    {
      key: "4",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phoneNumber: "0911223344",
      dateOfBirth: "1995-07-12",
      tags: ["tester", "QA"],
      hireDate: "2019-03-15",
    },
    {
      key: "5",
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      phoneNumber: "0888555666",
      dateOfBirth: "1993-02-18",
      tags: ["developer"],
      hireDate: "2016-12-05",
    },
  ];

  return (
    <>
      <div className="rounded-t-xl bg-[#fff]">
        <p className="text-2xl font-bold text-[#000000]">Quản lý nhân viên</p>
      </div>
      <div className="bg-[#fff] mt-5">
        {/* <UserList /> */}
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <Input
              placeholder="Tìm kiếm..."
              className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
            />
            <Button className="flex items-center" type="primary">
              <FilterOutlined className="align-middle" />
              Sắp xếp
            </Button>
          </div>
          <div className="flex gap-x-2">
            <div></div>
            <div>
              <Button type="primary">
                <div className="flex justify-center">
                  <UserAddOutlined className="mr-1 text-lg" /> Thêm nhân viên
                </div>
              </Button>
            </div>
          </div>
        </div>
        <Table
          className="pagination"
          id="myTable"
          columns={columns}
          dataSource={data}
          // pagination={{
          //   current: currentPage,
          //   total: totalCount || 0,
          //   pageSize: pageSize,
          // }}
          // onChange={handleTableChange}
          // loading={isFetching}
          // rowKey={(record) => record.id}
        />
      </div>
    </>
  );
};

export default EmployeeList;
