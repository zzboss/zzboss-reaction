import { ZoidacName } from "@/views/zodiac/types/ZodiacType";
import { Result } from "./common";

// const url = 'http://localhost:8080/open/zodiac'
const url = 'http://8.138.245.32/api/open/zodiac'

type ZodiacDayFortuneType = {
  date: string; // 日期，格式为 YYYYMMDD
  name: string; // 星座名称
  QFriend: string; // 星座的 qualitatively friendliness 朋友
  all: string; // 综合运势
  color: string; // 颜色
  datetime: string; // 日期，格式为 YYYY年MM月DD日
  health: string; // 健康运势
  love: string; // 爱情运势
  money: string; // 财运运势
  number: string; // 幸运数字
  summary: string; // 综合运势
  work: string; // 工作运势
};

type ZodiacWeekFortuneType = {
  consName: string; // 星座名称
  date: string; // 日期，格式为 YYYY年MM月DD日-YYYY年MM月DD日
  health: string; // 健康运势
  job: string; // 工作运势
  love: string; // 爱情运势
  money: string; // 财运运势
  work: string; // 工作运势
};

type ZodiacMonthFortuneType = {
  consName: string; // 星座名称
  date: string; // 日期，格式为 YYYY年MM月
  all: string; // 综合运势
  health: string; // 健康运势
  love: string; // 爱情运势
  money: string; // 财运运势
  work: string; // 工作运势
}

type ZodiacYearFortuneType = {
  consName: string; // 星座名称
  year: string; // 年份
  mimaInfo: string; // 年度密码概述
  mimaInfoContent: string; // 年度密码内容
  career: string; // 职业运势
  love: string; // 爱情运势
  finance: string; // 财运运势
}

// 星座配对
type ZodiacCompatibilityType = {
  men: string; // 男方星座
  women: string; // 女方星座
  zhishu: string; // 综合指数
  bizhong: string; // 比重
  xiangyue: string; // 相悦指数
  tcdj: string; // 天长地久指数
  jieguo: string; // 结果
  lianai: string; // 恋爱
  zhuyi: string; // 注意事项
};

// 获取星座日运势
const getDayForturn = (consName: string, type: 'today' | 'tomorrow'): Promise<Result<ZodiacDayFortuneType>> => {
  return fetch(`${url}/day?consName=${consName}&type=${type}`).then(res => res.json())
}

// 获取星座周运势
const getWeekForturn = (consName: string): Promise<Result<ZodiacWeekFortuneType>> => {
  return fetch(`${url}/week?consName=${consName}`).then(res => res.json())
}

// 获取星座月运势
const getMonthForturn = (consName: string): Promise<Result<ZodiacWeekFortuneType>> => {
  return fetch(`${url}/month?consName=${consName}`).then(res => res.json())
}

// 获取星座年运势
const getYearForturn = (consName: string): Promise<Result<ZodiacWeekFortuneType>> => {
  return fetch(`${url}/year?consName=${consName}`).then(res => res.json())
}

// 获取星座配对
const getCompatibility = (men: ZoidacName, women: ZoidacName): Promise<Result<ZodiacCompatibilityType>> =>{
  return fetch(`${url}/match?men=${men}&women=${women}`).then(res => res.json())
}
export { getDayForturn, type ZodiacDayFortuneType, 
  getWeekForturn, type ZodiacWeekFortuneType,
  getMonthForturn, type ZodiacMonthFortuneType,
  getYearForturn, type ZodiacYearFortuneType,
  getCompatibility, type ZodiacCompatibilityType
}