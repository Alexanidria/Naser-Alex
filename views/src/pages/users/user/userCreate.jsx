import FormInput from '../../component/formInput'
import { userAdd, userAll,employeAll } from "../../urlApi"

function UserCreate() {

  return (
    <>
      <FormInput
 mode="add"
        title='مستخــدمين النظـــام'
        subTitle="إضافة مستخــدم"
        urlApiget={userAll}
        urlApiadd={userAdd}
        urlRedirect='/user/user'
        fields={[
          {
            name: "num_employ",
            type: "select",
            label: "اختر مخزن",
            urlget:{employeAll},
            valueField: "num",
            textField: "fullName",
          },
          {
            name: "num_employ",
            type: "select",
            label: "ا",
          },
          {
            name: "username",
            type: "text",
               label:"اسم المستخدم",
         helperText: "أدخل اسم المستخدم (2-20 حرفًا)",
          },
          {
            name: "passwd",
            type: "text",
            label: "الرقم السرى",
            helperText: "من فضل أدخل الرقم السرى"

          },
        ]}

      />

    </>
  )
}
// [,,,]
export default UserCreate;