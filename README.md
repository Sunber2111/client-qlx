** Pape **

- nhân viên
- xe, loại xe
- khách hàng
- nhà cung cấp

next:

- tài khoản
- hdx
- hdn

[hdn]
public int? MaNcc { get; set; }
[cthdn]
public int? MaXe { get; set; }
public int SoLuong { get; set; }
public int? MaKho { get; set; }

[Xe]
public int MaXe { get; set; }
public string TenXe { get; set; }
public int? MaLoaiXe { get; set; }
public string SoKhung { get; set; }
public string SoMay { get; set; }

**Nếu đã tồn tại xe thì chỉ nhập Id **

tong nv
tong phieu xuat trong ngay hom nay
tong khach hang
tong tk

[KhachHang]
public string TenKh { get; set; }
public string DiaChi { get; set; }
public bool GioiTinh { get; set; }
public string Cmnd { get; set; }
public string Sdt { get; set; }
public DateTime NgaySinh { get; set; }

[30/5/2020]
- login / logout
- update account
- initial data



