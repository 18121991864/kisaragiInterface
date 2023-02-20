import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider, DefaultTheme } from 'styled-components'
// import {
//   light as lightBase,
//   dark as darkBase
// } from 'components/uiket/index.esm'

const light: DefaultTheme = JSON.parse('{"siteWidth":1200,"breakpoints":["370px","576px","852px","968px","1080px"],"mediaQueries":{"xs":"@media screen and (min-width: 370px)","sm":"@media screen and (min-width: 576px)","md":"@media screen and (min-width: 852px)","lg":"@media screen and (min-width: 968px)","xl":"@media screen and (min-width: 1080px)","nav":"@media screen and (min-width: 968px)"},"spacing":[0,4,8,16,24,32,48,64],"shadows":{"level1":"0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)","active":"0px 0px 0px 1px #f556ab, 0px 0px 4px 8px rgba(245,86,171, 0.6)","success":"0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)","warning":"0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)","focus":"0px 0px 0px 1px #f556ab, 0px 0px 0px 4px rgba(245,86,171, 0.6)","inset":"inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"},"radii":{"small":"4px","default":"16px","card":"32px","circle":"50%"},"zIndices":{"dropdown":10,"modal":100},"isDark":false,"alert":{"background":"#FFFFFF"},"colors":{"failure":"#FF9100","primary":"#FF9100","primaryBright":"#53DEE9","primaryDark":"#0098A1","secondary":"#7645D9","success":"#31D0AA","warning":"#FFB237","binance":"#F0B90B","background":"#FAF9FA","backgroundDisabled":"#E9EAEB","backgroundAlt":"#FFFFFF","cardBorder":"#E7E3EB","contrast":"#191326","dropdown":"#F6F6F6","dropdownDeep":"#EEEEEE","invertedContrast":"#FFFFFF","input":"#FEF0F7","inputSecondary":"#d7caec","tertiary":"#FEF0F7","text":"#210216","textDisabled":"#BDC2C4","textSubtle":"#FF9100","borderColor":"#E9EAEB","gradients":{"bubblegum":"linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)","inverseBubblegum":"linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)","cardHeader":"linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)","blue":"linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)","violet":"linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)","violetAlt":"linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)"},"meta":"#BAA2B1","head":"#7E1D5E","buttonActive":"#FFC2E3","yellow":"#ECA947","cardHeading":"#520237"},"card":{"background":"#FFFFFF","boxShadow":"0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)","boxShadowActive":"0px 0px 0px 1px #f556ab, 0px 0px 4px 8px rgba(245,86,171, 0.6)","boxShadowSuccess":"0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)","boxShadowWarning":"0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)","cardHeaderBackground":{"default":"linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)","blue":"linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)","violet":"linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)"},"dropShadow":"drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))"},"toggle":{"handleBackground":"#FFFFFF"},"nav":{"hover":"#EEEAF4"},"modal":{},"pancakeToggle":{"handleBackground":"#FFFFFF","handleShadow":"#BDC2C4"},"radio":{"handleBackground":"#FFFFFF"},"tooltip":{"background":"#213A6C","text":"#E8E8E8","boxShadow":"0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)"}}')
const dark: DefaultTheme = JSON.parse('{"siteWidth":1200,"breakpoints":["370px","576px","852px","968px","1080px"],"mediaQueries":{"xs":"@media screen and (min-width: 370px)","sm":"@media screen and (min-width: 576px)","md":"@media screen and (min-width: 852px)","lg":"@media screen and (min-width: 968px)","xl":"@media screen and (min-width: 1080px)","nav":"@media screen and (min-width: 968px)"},"spacing":[0,4,8,16,24,32,48,64],"shadows":{"level1":"0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)","active":"0px 0px 0px 1px #f556ab, 0px 0px 4px 8px rgba(245,86,171, 0.6)","success":"0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)","warning":"0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)","focus":"0px 0px 0px 1px #f556ab, 0px 0px 0px 4px rgba(245,86,171, 0.6)","inset":"inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"},"radii":{"small":"4px","default":"16px","card":"32px","circle":"50%"},"zIndices":{"dropdown":10,"modal":100},"isDark":true,"alert":{"background":"#213A6C"},"colors":{"failure":"#FF9100","primary":"#FF9100","primaryBright":"#53DEE9","primaryDark":"#0098A1","secondary":"#9A6AFF","success":"#31D0AA","warning":"#FFB237","binance":"#F0B90B","background":"#100C18","backgroundDisabled":"#C2C2C2","backgroundAlt":"#213A6C","cardBorder":"#383241","contrast":"#FFFFFF","dropdown":"#1E1D20","dropdownDeep":"#100C18","invertedContrast":"#191326","input":"#483f5a","inputSecondary":"#66578D","tertiary":"#344e85","text":"#E8E8E8","textDisabled":"#fff","textSubtle":"#FF9100","borderColor":"#6d727c","card":"#213A6C","gradients":{"bubblegum":"linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)","inverseBubblegum":"linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)","cardHeader":"#213A6C","blue":"linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)","violet":"linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)","violetAlt":"linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)"},"meta":"#BAA2B1","head":"#EB6930","buttonActive":"#FF9100","yellow":"#ECA947","cardHeading":"#E8E8E8","tabButton":"#4E82D2"},"card":{"background":"#213A6C","boxShadow":"0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)","boxShadowActive":"0px 0px 0px 1px #f556ab, 0px 0px 4px 8px rgba(245,86,171, 0.6)","boxShadowSuccess":"0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)","boxShadowWarning":"0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)","cardHeaderBackground":{"blue":"linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)","violet":"linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)"},"dropShadow":"drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))"},"toggle":{"handleBackground":"#213A6C"},"nav":{"background":"#213A6C","hover":"#473d5d"},"modal":{"background":"#213A6C"},"pancakeToggle":{"handleBackground":"#213A6C","handleShadow":"#fff"},"radio":{"handleBackground":"#213A6C"},"tooltip":{"background":"#FFFFFF","text":"#210216","boxShadow":"0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)"}}')

const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = window?.localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : true
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      window?.localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }