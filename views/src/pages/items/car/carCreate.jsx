import FormInput from "../../component/formInput";
import { carAdd, carAll } from "../../urlApi";

const CarCreate = () => {

  return (
    <>
      <FormInput
        mode="add"
        title="طرازات السيارات"
        subTitle="إضــافــة طــراز سيــارة"
        urlApiget={carAll}
        urlApiadd={carAdd}
        urlRedirect="/store/car"
        fields={[
          {
            type: 'text', name: 'nam', label: "موديل السيارة", 
            helperText: "من فضلك أدخل اسم موديل السيارة"
          }
        ]}
      />
    </>
  );
}

export default CarCreate;