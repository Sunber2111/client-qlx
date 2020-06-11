export const convertDate = (date) => {
  const day = new Date(date);
  return `${day.getUTCDate() + 1}-${
    day.getUTCMonth() <= 8
      ? "0" + (day.getUTCMonth() + 1)
      : day.getUTCMonth() + 1
  }-${day.getUTCFullYear()}`;
};

export const convertToPrice = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const mappingStore = (table) => {
  return new Promise((res, rej) => {
    try {
      let dsNcc = {},
        dsXe = [],
        dsHDN = {};

      table.forEach((val) => {
        if (!dsNcc[val.maNcc]) {
          dsNcc[val.maNcc] = 1;
          dsHDN[val.maNcc] = [];
        }
        const xe = {
          maXe: val.maXe,
          maLoaiXe: val.maLoaiXe,
          maNcc: val.maNcc,
          soKhung: val.soKhung+"",
          soMay: val.soMay,
          tenXe: val.tenXe,
        };
        dsXe.push(xe);

        dsHDN[val.maNcc].push({
          maXe: xe.maXe,
          maKho: val.maKho,
          giaNhap: val.giaNhap,
        });
      });
      console.log(dsHDN);
      let dsHdn = [];
      for (let x in dsHDN) {
        dsHdn.push({
          maNcc: parseInt(x),
          ctHdn: dsHDN[x],
        });
      }
      const data = {
        dsXe,
        dsHdn,
      };
      res(data)
    } catch (error) {
      console.log(error);

      throw error;
    }
  });
};

export function isRealValue(obj)
{
 return obj && obj !== 'null' && obj !== 'undefined';
}