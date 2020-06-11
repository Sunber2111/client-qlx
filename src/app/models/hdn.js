export const HdnSchema = {
  HDN: {
    prop: "hdn",
    type: {
      CTHDN: {
        prop: "ctHdn",
        type: {
          MaXe: {
            prop: "maXe",
            type: Number,
            required: true,
          },
          MaKho: {
            prop: "maKho",
            type: Number,
            required: true,
          },
        },
      },
    },
  },
};

// public int? MaNv { get; set; }
// public DateTime NgayNhap { get; set; }
// public bool TrangThaiDaXoa { get; set; }
// public string MoTa { get; set; }
