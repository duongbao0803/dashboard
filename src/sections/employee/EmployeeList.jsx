/* eslint-disable no-unused-vars */
import { Table } from "antd";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Input, Button, Tag } from "antd";
import { FilterOutlined } from "@ant-design/icons";
// import AddModal from "./AddModal";
import useEmployeeStore from "@/hooks/useEmployeeStore";
import DropdownBox from "@/components/Dropdown";
import { formatDate } from "@/utils/dateUtils";

const EmployeeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { employees, totalCount, isFetching } = useEmployeeStore(
    currentPage,
    pageSize
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      width: "20%",
      className: "first-column",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      width: "15%",
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      width: "15%",
    },
    {
      title: "Job title",
      dataIndex: "jobTitle",
      width: "13%",
      filters: [
        { text: "DEVE", value: "DEVE" },
        { text: "AIENG", value: "AIENG" },
        { text: "TESTER", value: "TESTER" },
        { text: "BA", value: "BA" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color;
        switch (role) {
          case "DEVE":
            color = "blue";
            break;
          case "AIENG":
            color = "green";
            break;
          case "TESTER":
            color = "red";
            break;
          case "BA":
            color = "orange";
            break;
          default:
            color = "default";
        }
        return (
          <Tag color={color} key={role}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Hire date",
      dataIndex: "hireDate",
      width: "12%",
    },
    {
      title: "",
      dataIndex: "",
      render: () => <DropdownBox employeeId={employeeId} employeeInfo={employeeInfo} />,
    },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [searchValue, setSearchValue] = useState("");
  const [employeeId, setEmployeeId] = useState();
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [filterData, setFilterData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const deferredSearchValue = useDeferredValue(searchValue, {
    timeoutMs: 1000,
  });

  useEffect(() => {
    if (!employees || employees.length === 0) {
      return;
    }
    handleSearch(deferredSearchValue);
    console.log("check emp", employees);
    
  }, [deferredSearchValue, employees]);

  const handleSearch = useMemo(() => {
    return (value) => {
      if (!employees.content) {
        console.error("Employee data is undefined or empty");
        return;
      }
      const searchData = employees.content.filter((employee) => {
        return employee?.fullName.toLowerCase().includes(value.toLowerCase());
      });
      setFilterData(searchData.length > 0 ? searchData : []);
    };
  }, [employees]);

  const handleSort = () => {
    let sortedData = [...filterData];

    if (sortedData.length > 0) {
      sortedData = sortedData.sort((a, b) =>
        sortOrder.includes("asc")
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName)
      );

      setSortOrder(sortOrder.includes("asc") ? "desc" : "asc");
      setFilterData(sortedData);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleRowClick = (value) => {
    setEmployeeId(value.id);
    setEmployeeInfo(value);
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <Input
              placeholder="Search by..."
              className="sm:mb-5 max-w-lg sm:w-[300px] h-8 rounded-lg"
              onChange={(e) => setSearchValue(e.target.value)}
              data-testid="inputSearch"
            />
            <Button
              className="flex items-center"
              onClick={handleSort}
              type="primary"
            >
              <FilterOutlined className="align-middle" />
              Sort
            </Button>
          </div>
          <div className="flex gap-x-2">
            <div>
              {/* <ExportButton /> */}
            </div>
            <div>
              <Button type="primary" onClick={() => setIsOpen(true)}>
                + Add Employee
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Table
        id="myTable"
        columns={columns}
        dataSource={
          filterData
            ? filterData.map((record) => ({
                ...record,
                key: record.id,
                dob: formatDate(record.dob),
              }))
            : employees.map((record) => ({
                ...record,
                key: record.id,
                dob: formatDate(record.dob),
              }))
        }
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: pageSize,
        }}
        loading={isFetching}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      {/* <AddModal setIsOpen={setIsOpen} isOpen={isOpen} /> */}
    </>
  );
};

export default EmployeeList;
