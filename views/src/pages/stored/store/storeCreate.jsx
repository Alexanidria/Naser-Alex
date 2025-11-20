import FormInput from "../../component/formInput";
import { storeAdd, storeAll } from "../../urlApi";

function StoreCreate() {

  return (
    <>
  
      <FormInput
        mode="add"
        urlApiget={storeAll}
        urlApiadd={storeAdd}
        urlRedirect="/store/store"
        title="المخــــازن"
        subTitle="إضــافة مخــزن"
        fields={[
          {
            name: "cod",
            type: "text",
            label: "الكود",
            helperText: "أدخل كودًا مكونًا من 3 أرقام",
          },
          {
            name: "nam",
            type: "text",
            label: "اسم المخزن",
            helperText: "أدخل اسم القسم (3-20 حرفًا)",
          },
        ]}
      />
    
    </>
  )
}
export default StoreCreate;