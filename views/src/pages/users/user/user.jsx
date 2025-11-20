import DataGridST from "../../component/dataGridST";
import { userAll,userDelete } from "../../urlApi"

function Genral() {
 
  // Define columns
  const columns = [
    { field: "id_user", headerName: "رقم", width: 30, headerAlign: "center" },
    { field: "full_name", headerName: "الاسم كامل", width: 200, headerAlign: "center" },
    { field: "username", headerName: "اسم م.", width: 70, headerAlign: "center" },
    { field: "active", headerName: "مفعل", width: 30, headerAlign: "center" },
    { field: "dat", headerName: "ت.البداية", width: 70, headerAlign: "center" },
   ];
  return (
    <>
      <DataGridST
        urlApiget={userAll}
        urlApidelete={userDelete}
        headerData={columns}
        title='مستخــدمين النظـــام'
        urlView="/user/user"
      />
    </>
  );
}

export default Genral;
