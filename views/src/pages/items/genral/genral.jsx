import DataGridST from "../../component/dataGridST";
import { genralAll,genralDelete } from "../../urlApi"

function Genral() {
  // Define columns
  const columns = [

    { field: "cod", headerName: "الكود", width: 60, headerAlign: "center" },
    { field: "nam", headerName: "الاســم", width: 150, headerAlign: "center" },
  ];
  return (
    <>
      <DataGridST
        urlApiget={genralAll}
        urlApidelete={genralDelete}
        headerData={columns}
        title="أقسام قطع غيار السيارات"
        urlView="/store/genral"
      />
    </>
  );
}

export default Genral;