import DataGridST from "../../component/dataGridST";
import { itemAll, } from '../../urlApi'

function Car() {

  // Define columns
  const columns = [
    { field: "num", headerName: "رقم الجزء", width: 100, headerAlign: "center" },
    { field: "nam", headerName: "أسم الجزء", width: 150, headerAlign: "center" },
    {
      field: "dateAdd", headerName: "تاريخ", width: 100, headerAlign: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('ar-EG', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }
    }
  ];
  return (
    <>
      <DataGridST
        urlApiget={itemAll}
        headerData={columns}
        title="قطـــع الغيــار"
        urlView="/store/item"
      />
    </>
  );
}

export default Car;
