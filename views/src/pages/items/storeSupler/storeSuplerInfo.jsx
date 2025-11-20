import Info from "../../component/formInfo";

function StoreSuplerInfo() {

  return (

    <>
      <Info
        urlApi="items/storeSupler"
        titelForm="أقسام موردى المخازن"
        subTitel="بيانات قسم"
        urlView="/store/storeSupler"
        fields={[
          { label: "المعرف:", key: "id" },
          { label: "الاسم:", key: "nam" },
          { label: "البريد الإلكتروني:", key: "cod" },
        ]}
      />
    </>
  );
};

export default StoreSuplerInfo;