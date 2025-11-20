import Info from "../../component/formInfo";

const CarInfo = () => {

  return (
    <    >
      <Info
        urlApi="items/car"
        urlRedirect="/store/car"
        title="طرازات السيارات"
        subTitel="بيانات موديل سيارة"
        fields={[
          { label: "المعرف:", key: "id" },
          { label: "الاسم:", key: "nam" },
          { label: "البريد الإلكتروني:", key: "dat" },
        ]}
      />
    </>
  );
};

export default CarInfo;
