<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  .download-wrap
    el-card.download-card.windows
      i.fab.fa-windows(style="font-size: 100px")
      p Windows
      el-button(type="primary" @click="navigateWindows").download-button 下载
    el-card.download-card.macos
      i.fab.fa-apple(style="font-size: 100px")
      p macOS
      el-button(type="primary" :disabled="true").download-button 敬请期待
    el-card.download-card.mobile
      i.fas.fa-mobile(style="font-size: 100px")
      p 移动设备
      el-popover(placement="bottom" title="Progressive Web App" width="200" trigger="click" content="Chrome 点击右上角的菜单 -> 安装应用")
        el-button(type="primary" slot="reference").download-button 安装 PWA
</template>

<script>
import Header from '@/layouts/Header'
import MainLayout from '@/layouts/MainLayout'
export default {
  components: {
    MainLayout,
    Header
  },
  mounted () {
    let threeScript = document.createElement('script')
    threeScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js')
    document.head.appendChild(threeScript)

    let vantaScript = document.createElement('script')
    vantaScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js')
    document.head.appendChild(vantaScript)

    window.VANTA.BIRDS({
      el: 'section.el-container.is-vertical',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00
    })
  },
  methods: {
    navigateWindows () {
      window.open('https://github.com/PovertyGroup/wenote-desktop/releases/latest')
    }
  }
}
</script>

<style scoped>
.download-wrap {
  width: 100%;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.download-wrap > * {
  margin: 20px;
}

.download-card {
  text-align: center;
  padding: 30px 100px 20px 100px;
}

.download-button {
  margin-top: 30px;
}
</style>
