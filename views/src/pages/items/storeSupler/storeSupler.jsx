import DataGridST from "../../component/dataGridST";
import {storeSuplerAll,storeSuplerDelete} from '../../urlApi'

function StoreSupler() {

  // Define columns
  const columns = [
    { field: "cod", headerName: "الكود", width: 60, headerAlign: "center" },
    { field: "nam", headerName: "الاســم", width: 150, headerAlign: "center" },
    {
      field: "cod_store",
      headerName: "كود مخزن",
      width: 100,
      headerAlign: "center",
    }
  ];
  return (
    <>
      <DataGridST
        urlApiget={storeSuplerAll}
        urlApidelete={storeSuplerDelete}
        headerData={columns}
        title="أقسام موردى المخازن"
        urlView="/store/storeSupler"
      />
    </>
  );
}

export default StoreSupler;
