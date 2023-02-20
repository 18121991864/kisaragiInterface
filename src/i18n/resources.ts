/* eslint-disable import/prefer-default-export */
import { langCommon } from "./locales/common"

// 把所有的翻译资源集合
const resources = {
  en: {
    translation: {
      ...langCommon.en_common
    },
  },
  ja: {
    translation: {
      ...langCommon.ja_common
    },
  }
}
export { resources }