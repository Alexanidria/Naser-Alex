import Info from "../../component/formInfo";

const GenralInfo = () => {

  return (
    <>
      <Info
        urlApi="items/genral"
        urlRedirect="/store/genral"
        titelForm="أقسام قطع غيار السيارات"
        subTitel="بيانات قسم"        
        fields={[
          { label: "المعرف:", key: "id" },
          { label: "الاسم:", key: "nam" },
          { label: "البريد الإلكتروني:", key: "cod" },
        ]}
      />
    </>
  );
};

export default GenralInfo;