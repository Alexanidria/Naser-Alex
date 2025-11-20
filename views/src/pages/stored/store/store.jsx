import DataGridST from "../../component/dataGridST";
import { storeAll, storeDelete } from "../../urlApi";

function Store() { 
  // Define columns
  const columns = [
    { field: "cod", headerName: "الكود", width: 60, headerAlign: "center" },
    { field: "nam", headerName: "الاســم", width: 150, headerAlign: "center" },
  ];
  return(
 <>
   <DataGridST
        urlApiget={storeAll}
        urlApidelete={storeDelete}
        headerData={columns}
        title="المخــــازن"
        urlView="/store/store"
      />
  </>
  )
}

export default Store;