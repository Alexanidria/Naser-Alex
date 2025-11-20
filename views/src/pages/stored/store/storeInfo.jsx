import Info from "../../component/formInfo";

const StoreInfo = () => {

  return (
    <>
      <Info
        urlApi="stored/store"
        urlRedirect="/store/store"
        title="المخــــازن"
        subTitel="بيانات مخــزن"
        fields={[
          { label: "المعرف:", key: "id" },
          { label: "الاسم:", key: "nam" },
          { label: "البريد الإلكتروني:", key: "cod" },
        ]}
      />
    </>
  );
};

export default StoreInfo;