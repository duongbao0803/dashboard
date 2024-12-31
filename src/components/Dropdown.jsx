/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useUserStore from "@/hooks/useUserStore";
import showDeleteConfirm from "@/sections/users/DeleteModal";
import EditModal from "../sections/employee/EditModal";

const DropdownBox = ({ employeeId, employeeInfo }) => {
  const { deleteItem } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const openEditModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: (
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  onClick={openEditModal}
                >
                  <EditOutlined className="pr-2" />
                  Edit Employee
                </Link>
              ),
            },
            {
              key: "2",
              label: (
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  onClick={() => showDeleteConfirm({ employeeId, deleteItem })}
                >
                  <DeleteOutlined className="pr-2" />
                  Delete Employee
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} employeeInfo={employeeInfo} />
    </>
  );
};

Dropdown.propTypes = {
  classId: PropTypes.number,
  userInfo: PropTypes.object,
};

export default DropdownBox;
