import DataGridST from "../../component/dataGridST";
import { storeMoveAll } from "../../urlApi";

function TranMove() {
  const columns = [
    { field: "cod_store", headerName: "مخزن", width: 70, headerAlign: "center" },
    { field: "cod_kinDoc", headerName: "ن.مستند", width: 70, headerAlign: "center" },
    { field: "numDocom", headerName: "ر.فاتورة", width: 70, headerAlign: "center" },
    { field: "dat", headerName: "تاريخ", width: 70, headerAlign: "center" },
    { field: "total", headerName: "إجمالى", width: 70, headerAlign: "center" },
  ];

  return (
    <>
      <DataGridST
        title='حــــركــــة المخـــــازن'
        urlView="/store/move"
        headerData={columns}
        urlApiget={storeMoveAll}
      />
    
    </>
  )
}
export default TranMove;
