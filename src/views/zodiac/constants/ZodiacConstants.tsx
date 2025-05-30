import { ZodiacAttr, ZodiacInfo, ZoidacName } from "../types/ZodiacType"

const ZODIACS_INFO: ZodiacInfo[] = [
  {
    name: ZoidacName.aries,
    birthday: "3.21 - 4.19",
    attr: ZodiacAttr.fire,
    element: '火相星座',
    planet: 'Mars',
    planetCh: '火星',
    traits: ['勇敢', '热情', '冲动']
  },
  {
    name: ZoidacName.taurus,
    birthday: "4.20 - 5.20",
    attr: ZodiacAttr.earth,
    element: '土相星座',
    planet: 'Venus',
    planetCh: '金星',
    traits: ['耐心', '可靠', '固执']
    },
    {
    name: ZoidacName.gemini,
    birthday: "5.21 - 6.21",
    attr: ZodiacAttr.air,
    element: '风相星座',
    planet: 'Mercury',
    planetCh: '水星',
    traits: ['好奇', '适应性强', '善变']
  },
  {
    name: ZoidacName.cancer,
    birthday: "6.22 - 7.22",
    attr: ZodiacAttr.water,
    element: '水相星座',
    planet: 'Moon',
    planetCh: '月亮',
    traits: ['富有同情心', '情感丰富', '保护欲强']
  },
  {
    name: ZoidacName.leo,
    birthday: "7.23 - 8.22",
    attr: ZodiacAttr.fire,
    element: '火相星座',
    planet: 'Sun',
    planetCh: '太阳',
    traits: ['自信', '慷慨', '戏剧性']
  },
  {
    name: ZoidacName.virgo,
    birthday: "8.23 - 9.22",
    attr: ZodiacAttr.earth,
    element: '土相星座',
    planet: 'Mercury',
    planetCh: '水星',
    traits: ['分析型', '实际', '挑剔']
  },
  {
    name: ZoidacName.libra,
    birthday: "9.23 - 10.23",
    attr: ZodiacAttr.air,
    element:'风相星座',
    planet: 'Venus',
    planetCh: '金星',
    traits: ['平衡', '外交', '优柔寡断']
  },
  {
    name: ZoidacName.scorpio,
    birthday: "10.24 - 11.22",
    attr: ZodiacAttr.water,
    element: '水相星座',
    planet: 'Pluto, Mars',
    planetCh: '冥王星',
    traits: ['神秘', '洞察力', '占有欲']
  },
  {
    name: ZoidacName.sagittarius,
    birthday: "11.23 - 12.21",
    attr: ZodiacAttr.fire,
    element: '火相星座',
    planet: 'Jupiter',
    planetCh: '木星',
    traits: ['乐观', '独立', '冒险']
  },
  {
    name: ZoidacName.capricorn,
    birthday: "12.22 - 1.19",
    attr: ZodiacAttr.earth,
    element: '土相星座',
    planet: 'Saturn',
    planetCh: '土星',
    traits: ['实际', '可靠', '固执']
  },
  {
    name: ZoidacName.aquarius,
    birthday: "1.20 - 2.18",
    attr: ZodiacAttr.air,
    element: '风相星座',
    planet: 'Uranus, Saturn',
    planetCh: '天王星',
    traits: ['理想主义', '独立', '博爱']
  },
  {
    name: ZoidacName.pisces,
    birthday: "2.19 - 3.20",
    attr: ZodiacAttr.water,
    element: '水相星座',
    planet: 'Neptune',
    planetCh: '海王星',
    traits: ['浪漫', '直觉', '艺术']
  },
]

export { ZODIACS_INFO }