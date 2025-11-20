import FormInput from "../../component/formInput";
import {storeSuplerAdd,storeSuplerOne,storeAll} from '../../urlApi'
function StoreSuplerCreate() {
  
  return (
    < >
      <FormInput
        mode="add"
        title="أقسام موردى المخازن"
        subTitle="إضافة قسم"
        urlApiget={storeSuplerOne}
        urlApiadd={storeSuplerAdd}
        urlRedirect="/store/storeSupler"
        fields={[
          {
            name: "codStore",
            type: "select",
            label: "اختر مخزن",
            urlget:'/stored/store',
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

export default StoreSuplerCreate;