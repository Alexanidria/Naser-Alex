import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

// 🧩 أجزاء
export const fetchPartByCode = (code) => axios.get(`/api/parts/${code}`);
export const searchParts = (term) => axios.get(`/api/parts?search=${term}`);
export const addPart = (part) => axios.post(`/api/parts`, part);

// 🧾 أنواع المستندات
export const fetchInvoiceType = (code) => axios.get(`/api/invoiceTypes/${code}`);
export const addInvoiceType = (data) => axios.post(`/api/invoiceTypes`, data);

// 🧮 فواتير
export const fetchInvoice = (id) => axios.get(`/api/invoices/${id}`);
export const saveInvoice = (data) => axios.post(`/api/invoices`, data);
export const updateInvoice = (id, data) => axios.put(`/api/invoices/${id}`, data);

{/*** Employees ***/}
// employe
const employe='/employees/employe'
export const employeAll = () => axios.get(`${employe}`);
export const employeOne = (id) => axios.get(`${employe}/${id}`);
export const employeAdd = (data) => axios.post(`${employe}`,data);
export const employeUpdate = (id,data) => axios.put(`${employe}/${id}`,data);
export const employeDelete = (id) => axios.delete(`${employe}/${id}`);

{/*** Items ***/}
// car
export const carAll = () => axios.get(`/items/car`);
export const carOne = (id) => axios.get(`/items/car/${id}`);
export const carAdd = (data) => axios.post(`/items/car`,data);
export const carUpdate = (id,data) => axios.put(`/items/car/${id}`,data);
export const carDelete = (id) => axios.delete(`/items/car/${id}`);
// genral
export const genralAll = () => axios.get(`/items/genral`);
export const genralOne = (id) => axios.get(`/items/genral/${id}`);
export const genralAdd = (data) => axios.post(`/items/genral`,data);
export const genralUpdate = (id,data) => axios.put(`/items/genral/${id}`,data);
export const genralDelete = (id) => axios.delete(`/items/genral/${id}`);
// item
const item='/items/item'
export const itemAll = () => axios.get(`${item}`);
export const itemOne = (id) => axios.get(`${item}/${id}`);
export const itemAdd = (data) => axios.post(`${item}`,data);
export const itemUpdate = (id,data) => axios.put(`${item}/${id}`,data);
export const itemDelete = (id) => axios.delete(`${item}/${id}`);
// storeSupler
export const storeSuplerAll = () => axios.get(`/items/storeSupler`);
export const storeSuplerOne = (id) => axios.get(`/items/storeSupler/${id}`);
export const storeSuplerAdd = (data) => axios.post(`/items/storeSupler`,data);
export const storeSuplerUpdate = (id,data) => axios.put(`/items/storeSupler/${id}`,data);
export const storeSuplerDelete = (id) => axios.delete(`/items/storeSupler/${id}`);
// unit
export const unitAll = () => axios.get(`/items/unit`);
export const unitOne = (id) => axios.get(`/items/unit/${id}`);
export const unitAdd = (data) => axios.post(`/items/unit`,data);
export const unitUpdate = (id,data) => axios.put(`/items/unit/${id}`,data);
export const unitDelete = (id) => axios.delete(`/items/unit/${id}`);

{/*** Stored ***/}
// store
export const storeAll = () => axios.get(`/stored/store`);
export const storeOne = (id) => axios.get(`/stored/store/${id}`);
export const storeAdd = (data) => axios.post(`/stored/store`,data);
export const storeUpdate = (id,data) => axios.put(`/stored/store/${id}`,data);
export const storeDelete = (id) => axios.delete(`/stored/store/${id}`);
// tran move store
const tranStore="/stored/move"
export const storeMoveAll = () => axios.get(`/stored/store`);
export const storeMoveOne = (id) => axios.get(`/stored/store/${id}`);
export const storeMoveAdd = (data) => axios.post(`/stored/store`,data);
export const storeMoveUpdate = (id,data) => axios.put(`/stored/store/${id}`,data);
export const storeMoveDelete = (id) => axios.delete(`/stored/store/${id}`);

{/*** Users ***/}
// user
export const userAll = () => axios.get(`/users/user`);
export const userOne = (id) => axios.get(`/users/user/${id}`);
export const userAdd = (data) => axios.post(`/users/user`,data);
export const userUpdate = (id,data) => axios.put(`/users/user/${id}`,data);
export const userUpdateActive = (id,data) => axios.put(`/users/user/active/${id}`,data);
export const userUpdatePasswd = (id,data) => axios.put(`/users/user/passwd/${id}`,data);
export const userDelete = (id) => axios.delete(`/users/user/${id}`);
