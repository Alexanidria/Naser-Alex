import DataGridST from "../../component/dataGridST";
import { carAll, carDelete } from "../../urlApi"

function Car() {

  const columns = [
    { field: "nam", headerName: "الاسم", width: 200, headerAlign: "center" },
    { field: "dat", headerName: "تاريخ", width: 100, headerAlign: "center", 
     renderCell: (params) => {
    const date = new Date(params.value);
    return date.toLocaleDateString('ar-EG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  },
  },
  ];
  return (
    <>
      <DataGridST
        urlApiget={carAll}
        title="طرازات السيارات"
        headerData={columns}
        urlApidelete={carDelete}
        urlView="/store/car"
      />
    </>
  );
}

export default Car;