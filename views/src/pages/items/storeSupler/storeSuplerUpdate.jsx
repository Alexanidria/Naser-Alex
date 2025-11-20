import FormInput from "../../component/formInput";

const StoreSuplerUpdate = () => {

  return (
    <>
      <FormInput
        mode="edit"
        urlApi="items/storeSupler"
        urlRedirect="/store/storeSupler"
        title="أقسام موردى المخازن"
        subTitle="تعديل قسم"
        fields={[
          {
            name: "codStore",
            type: "select",
            label: "اختر مخزن",
            endpoint: "stored/store",
            valueField: "cod",
            textField: "nam",
          },
          {
            name: "cod",
            type: "text",
            label: "الكود",
            helperText: "أدخل كودًا مكونًا من 4 أرقام",
          },
          {
            name: "name",
            type: "text",
            label: "اسم القسم",
            helperText: "أدخل اسم القسم (3-30 حرفًا)",
          },
        ]}
      />
    </>
  );
};

export default StoreSuplerUpdate;
