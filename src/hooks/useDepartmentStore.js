import { useQuery, useQueryClient } from "react-query";
import { getAllDepartments } from "../api/departmentApi";

const useDepartmentStore = (page, size) => {
  const queryClient = useQueryClient();

  const fetchDepartments = async ({ queryKey }) => {
    const [, page, size] = queryKey; // Giải nén các tham số từ queryKey
    const res = await getAllDepartments(page, size);
    return {
      departments: res.data.data, // Dữ liệu danh sách nhân viên
      totalCount: res.data.totalCount, // Tổng số bản ghi (giả định API trả về totalCount)
    };
  };

  // const updateDepartment = async ({ itemId, updatedItem }) => {
  //   await editDepartment(itemId, updatedItem);
  // };

  // const addDepartment = async (addItem) => {
  //   await addNewDepartment(addItem);
  // };

  // const deleteDepartment = async (itemId) => {
  //   await removeDepartment(itemId);
  //   return itemId;
  // };

  const {
    data: { departments = [], totalCount = 0 } = {},
    isLoading: isFetching,
  } = useQuery(["departments", page, size], fetchDepartments, {
    retry: 3,
    retryDelay: 5000,
  });

  // const updateItemMutation = useMutation(updateDepartment, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Edit Successful",
  //       description: "Edit employee successful",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("departments");
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

  // const addItemMutation = useMutation(addDepartment, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Add Successful",
  //       description: "Add employee successful",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("departments");
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

  // const deleteItemMutation = useMutation(deleteDepartment, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Delete Successful",
  //       description: "Delete employee successful",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("departments");
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
    departments,
    fetchDepartments,
    // updateItem,
    // addItem,
    // deleteItem,
    totalCount,
    isFetching,
  };
};

export default useDepartmentStore;
