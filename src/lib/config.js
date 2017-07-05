const config = {
  // @if PLATFORM='H5'
  platform: "h5",
  clickEvt: window.ontouchstart !== undefined ? 'tap' : 'click',
  isWxBrowser: (/micromessenger/i).test(navigator.userAgent),
  // @endif

  // @if PLATFORM='ANDROID'
  platform: "android",
  clickEvt: 'tap',
  isWxBrowser: false,
  // @endif

  // @if PLATFORM='IOS'
  platform: "ios",
  clickEvt: 'tap',
  isWxBrowser: false,
  // @endif

  // @if ENV='DEV'
  api: "http://www.pig-2.com",
  imgPrefix: "http://116.62.222.82:8082",
  // @endif

  // @if ENV='PROD'
  api: "http://www.pig-2.com",
  imgPrefix: "http://116.62.222.82:8082",
  // @endif
  //    title: "海星商城",
  //    shareTitle : "海星商城，免费定制你的微商城",
  //    shareDesc : "海星商城，定制你的微商城",
  //    kfPhone: '13185033769'
  title: "二爷商城",
  kfPhone: '400-101-4550'
};
export { config }
