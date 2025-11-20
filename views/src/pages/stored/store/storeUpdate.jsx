import FormInput from "../../component/formInput"

function StoreUpdate() {
  return (<>
    <FormInput
      mode="edit"
      urlApi="stored/store"
      urlRedirect="/store/store"
      title="المخـــازن"
      subTitle="تعــديــل مخــزن"
      fields={[
        {
          name: "cod",
          type: "text",
          label: "الكود",
          helperText: "أدخل كودًا مكونًا من 3 أرقام",
        },
        {
          name: "name",
          type: "text",
          label: "اسم المخزن",
          helperText: "أدخل اسم القسم (3-20 حرفًا)",
        },
      ]}
    />
  </>)
}

export default StoreUpdate;