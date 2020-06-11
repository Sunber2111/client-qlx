import axios from "axios";

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("x-auth");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const errorBody = (res) => {
  throw res.response.data;
};

const request = {
  get: async (url) => await axios.get(url).then(responseBody).catch(errorBody),
  post: async (url, body) =>
    await axios.post(url, body).then(responseBody).catch(errorBody),
  put: async (url, body) =>
    await axios.put(url, body).then(responseBody).catch(errorBody),
  delete: async (url) =>
    await axios.delete(url).then(responseBody).catch(errorBody),
};

const Product = {
  getAllCategory: async () => await request.get("/loaixe"),
  addCategory: async (category) => await request.post("/loaixe", category),
  updateCategory: async (category) => await request.put("/loaixe", category),
  deleteCategory: async (id) => await request.delete(`/loaixe/${id}`),
  getAll: async () => await request.get("/xe"),
  deleteCar: async (id) => await request.delete(`/xe/${id}`),
  addCar: async (car) => await request.post("/xe", car),
  updateCar: async (car) => await request.put("/xe", car),
  getByCategory: async (id) => await request.get(`/xe/category/${id}`),
};

const Employee = {
  getAll: async () => await request.get("/nhanvien"),
  deleteEmp: async (id) => await request.delete(`/nhanvien/${id}`),
  addEmp: async (nv) => await request.post("/nhanvien", nv),
  updateEmp: async (nv) => await request.put("/nhanvien", nv),
  getById: async (id) => await request.get(`/nhanvien/${id}`),
};

const Customer = {
  getAll: async () => await request.get("/khachhang"),
  deleteCus: async (id) => await request.delete(`/khachhang/${id}`),
  addCus: async (kh) => await request.post("/khachhang", kh),
  updateCus: async (kh) => await request.put("/khachhang", kh),
  getOrder: async (id) => await request.get(`/khachhang/hoadon/${id}`),
  getByPhone: async (sdt) => await request.get(`/khachhang/sdt/${sdt}`),
  getByCMND: async (cmnd) => await request.get(`/khachhang/cmnd/${cmnd}`),
};

const Store = {
  getAll: async () => await request.get("/kho"),
  deleteStore: async (id) => await request.delete(`/kho/${id}`),
  addStore: async (st) => await request.post("/kho", st),
  updateStore: async (st) => await request.put("/kho", st),
  addDetailStore: async (ctKho) => await request.post("/kho/ctkho", ctKho),
  deleteDetailStore: async (id) => await request.get(`/kho/ctkho/${id}`),
};

const Phieu = {
  getAllPhieuXuat: async () => await request.get("/hdx"),
  deletePhieuXuat: async (id) => await request.delete(`/hdx/${id}`),
  addPhieuXuat: async (data) => await request.post("/hdx", data),

  getAllPhieuNhap: async () => await request.get("/hdn"),
  deletePhieuNhap: async (id) => await request.delete(`/hdn/${id}`),
  addDsPhieuNhap: async (list) => await request.post("/hdn/addlist", list),
};

const Account = {
  login: async (data) => await request.post("/user/login", data),
  getCurrent: async () => await request.get("/user/current"),
  updateActive: async (id) => await request.put(`/user/active/${id}`),
  getAll: async () => await request.get("/user"),
  deleteAcc: async (id) => await request.delete(`/user/${id}`),
  regis: async (acc) => await request.post("/user/regis", acc),
  resetPassword: async (username) =>
    await request.get(`/user/sendmess/email/${username}`),
};

const Supplier = {
  getAll: async () => await request.get("/ncc"),
  deleteSup: async (id) => await request.delete(`/ncc/${id}`),
  addSup: async (st) => await request.post("/ncc", st),
  updateSup: async (st) => await request.put("/ncc", st),
  gethdn: async (id) => await request.get(`/ncc/pur/${id}`),
};

const DoanhThu = {
  getTop5: async () => await request.get("/doanhthu/top5"),
  get12Month: async () => await request.get("/doanhthu"),
  getFastNew: async () => await request.get("/doanhthu/fastnews"),
  getTop3Car: async () => await request.get("/doanhthu/top3"),
};

const Photo = {
  addPhoto: async (pic) => {
    const formData = new FormData();
    formData.append("files", pic);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post("/photo", formData, config);
    return res.data;
  },
};

export default {
  Product,
  Employee,
  Customer,
  Store,
  Phieu,
  Account,
  Photo,
  Supplier,
  DoanhThu,
};
