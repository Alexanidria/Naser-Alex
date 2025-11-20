import FormInput from "../../component/formInput"
import { genralAdd, genralAll } from "../../urlApi"

const GenralCreate = () => {

  return (
    <>
      <FormInput
        mode="add"
        title="أقسام قطع غيار السيارات"
        subTitle="إضافة قسم"
        urlApiget={genralAll}
        urlApiadd={genralAdd}
        urlRedirect='/store/genral'
        fields={[
          {
            name: "cod",
            type: "text",
            label: "الكود",
            helperText: "أدخل اسم القسم (2 حرفًا)",
          },
          {
            name: "nam",
            type: "text",
            label: "أسم القسم",
            helperText: "أدخل اسم القسم (3-20 حرفًا)",
          },
        ]}

      />
    </>
  );
}

export default GenralCreate;