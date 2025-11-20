import DataGridST from "../../component/dataGridST";
import { unitAll } from "../../urlApi";

function Unit() {

  const columns = [
    { field: "cod", headerName: "الكود", width: 60, headerAlign: "center" },
    { field: "nam", headerName: "الاســم", width: 150, headerAlign: "center" },
    {
      field: "id_user",
      headerName: "id user",
      width: 60,
      headerAlign: "center",
    }
  ];
  return (
    <>
      <DataGridST
        title="وحدة قياس قطع غيار"
        urlApiget={unitAll}
        headerData={columns}
        urlView="/store/unit"
      />
    </>
  );
}

export default Unit;
