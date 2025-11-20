import Info from "../../component/formInfo";

const CarInfo = () => {
  return (
    <>
      <Info
        urlApi="items/car"
        titelForm="طرازات السيارات"
        subTitel="بيانات موديل سيارة"
        urlView="/store/car"
        fields={[
          { label: "المعرف:", key: "id" },
          { label: "الاسم:", key: "nam" },
          { label: "البريد الإلكتروني:", key: "cod" },
        ]}
      />
    </>
  );
};

export default CarInfo;
