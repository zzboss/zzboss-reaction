type ZodiacInfo = {
  name: ZoidacName,
  code: number, // 星座标识, 与索引一致
  birthday: string,
  attr: ZodiacAttr,
  element: string,
  planet: string,
  planetCh: string,
  traits: string[],
}

enum ZoidacName {
  aries = '白羊座',
  taurus = '金牛座',
  gemini = '双子座',
  cancer = '巨蟹座',
  leo = '狮子座',
  virgo = '处女座',
  libra = '天秤座',
  scorpio = '天蝎座',
  sagittarius = '射手座',
  capricorn = '摩羯座',
  aquarius = '水瓶座',
  pisces = '双鱼座',
}

enum ZodiacAttr {
  fire = 'fire',
  earth = 'earth',
  air = 'air',
  water = 'water',
}

export {
  type ZodiacInfo,
  ZodiacAttr,
  ZoidacName
}