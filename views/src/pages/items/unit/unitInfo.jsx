import Info from "../../component/formInfo";

const UnitInfo = () => {

  return (
    <>
      <Info
        urlApi="items/unit"
        titelForm="وحدة قياس قطع غيار"
        subTitel="بيانات وحدة"
        urlView="/store/unit"
        fields={[
          { label: "المعرف:", key: "id" },
          { label: "الاسم:", key: "nam" },
          { label: "البريد الإلكتروني:", key: "cod" },
        ]}
      />
    </>
  );
}

export default UnitInfo;