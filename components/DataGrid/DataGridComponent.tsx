import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataUser } from "../../interface/dataUser.interface";
import { feature } from "@ideditor/country-coder";
import { fetchUsers, selectAllUsers } from "../../slice/usersSlice";
import { selectAllSelected, setArray } from "../../slice/selectedSlice";
import { store } from "../../store/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DataGrid.module.css";

export function transformUserData(listUser: DataUser[]): DataUser[] {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return listUser.map((user) => {
    return {
      ...user,
      id: user._id,
      age: new Date().getFullYear() - new Date(user.birthday).getFullYear(),
      birthday_date: new Date(user.birthday).toLocaleDateString(),
      month_birthday: monthNames[new Date(user.birthday).getMonth()],
      country:
        feature([user.longitude, user.latitude])?.properties.nameEn === undefined
          ? "Ubicación no encontrada"
          : feature([user.longitude, user.latitude])?.properties.nameEn,
    };
  });
}

export const DataGridComponent = () => {
  useEffect(() => {
    store.dispatch(fetchUsers());
  }, []);

  const dispatch = useDispatch();

  const selectionModel = useSelector(selectAllSelected);
  const user = useSelector(selectAllUsers);

  return (
    <div className={styles.container}>
      <DataGrid
        columns={[
          { field: "name", headerName: "Nombre", flex: 1 },
          { field: "hobbies", headerName: "Pasatiempos", flex: 1 },
          { field: "age", headerName: "Edad", flex: 1 },
          {
            field: "birthday_date",
            headerName: "Fecha cumpleaños",
            flex: 1,
          },
          {
            field: "month_birthday",
            headerName: "Mes de cumpleaños",
            flex: 1,
          },
          {
            field: "country",
            headerName: "Pais",
            flex: 1,
          },
        ]}
        rows={[...transformUserData(user)]}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          dispatch(setArray(newSelectionModel));
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
};
