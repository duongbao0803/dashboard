import { getAllEmployees } from "@/api/employeeApi";
import { useQuery, useQueryClient } from "react-query";

const useEmployeeStore = (page, size) => {
  const queryClient = useQueryClient();

  const fetchEmployees = async ({ queryKey }) => {
    const [, page, size] = queryKey; // Giải nén các tham số từ queryKey
    const res = await getAllEmployees(page, size);
    return {
      employees: res.data.data, // Dữ liệu danh sách nhân viên
      totalCount: res.data.totalCount, // Tổng số bản ghi (giả định API trả về totalCount)
    };
  };

  // const updateEmployee = async ({ itemId, updatedItem }) => {
  //   await editEmployee(itemId, updatedItem);
  // };

  // const addEmployee = async (addItem) => {
  //   await addNewEmployee(addItem);
  // };

  // const deleteEmployee = async (itemId) => {
  //   await removeEmployee(itemId);
  //   return itemId;
  // };

  const {
    data: { employees = [], totalCount = 0 } = {},
    isLoading: isFetching,
  } = useQuery(["employees", page, size], fetchEmployees, {
    retry: 3,
    retryDelay: 5000,
  });

  // const updateItemMutation = useMutation(updateEmployee, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Edit Successful",
  //       description: "Edit employee successful",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("employees");
  //   },
  //   onError: (err) => {
  //     console.error("Error update", err);
  //     notification.error({
  //       message: "Edit Failed",
  //       description: "Edit employee failed",
  //       duration: 2,
  //     });
  //   },
  // });

  // const addItemMutation = useMutation(addEmployee, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Add Successful",
  //       description: "Add employee successful",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("employees");
  //   },
  //   onError: (err) => {
  //     console.error("Error add", err);
  //     notification.error({
  //       message: "Add Failed",
  //       description: "Add employee failed",
  //       duration: 2,
  //     });
  //   },
  // });

  // const deleteItemMutation = useMutation(deleteEmployee, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Delete Successful",
  //       description: "Delete employee successful",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("employees");
  //   },
  //   onError: (err) => {
  //     console.error("Error delete", err);
  //     notification.error({
  //       message: "Delete Failed",
  //       description: "Delete employee failed",
  //       duration: 2,
  //     });
  //   },
  // });

  // const updateItem = async (itemId, updatedItem) => {
  //   await updateItemMutation.mutateAsync({ itemId, updatedItem });
  // };

  // const addItem = async (addItem) => {
  //   await addItemMutation.mutateAsync(addItem);
  // };

  // const deleteItem = async (itemId) => {
  //   await deleteItemMutation.mutateAsync(itemId);
  // };

  return {
    employees,
    fetchEmployees,
    // updateItem,
    // addItem,
    // deleteItem,
    totalCount,
    isFetching,
  };
};

export default useEmployeeStore;
