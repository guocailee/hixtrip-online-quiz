/*
 * @Author: No1white 1072368472@qq.com
 * @Date: 2023-09-25 19:51:07
 * @LastEditors: No1white 1072368472@qq.com
 * @LastEditTime: 2023-09-25 20:29:58
 * @FilePath: \pd-design-demoe:\WorkSpace\hixtrip-online-quiz\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus).mount('#app')
