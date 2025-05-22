type RandomImg = {
  code: number
  msg: string
  data: string
  request_id: string
}

const urls = ['https://v2.xxapi.cn/api/yscos',
  'https://v2.xxapi.cn/api/heisi',
  'https://v2.xxapi.cn/api/baisi',
  'https://v2.xxapi.cn/api/meinvpic',
  'https://v2.xxapi.cn/api/randomAcgPic?type=pc']

const randomImgG = (index: number): Promise<RandomImg> => fetch(urls[index]).then(response => response.json())

export {
  randomImgG,
  type RandomImg
}