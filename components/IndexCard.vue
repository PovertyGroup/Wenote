<template lang="pug">
.main
  header
    .wrap
      .header-wrapper
        h1.site-name Wenote笔记平台
        p(style='background-color: rgba(0, 0, 0, 0.3); padding: 10px')   一个Markdown笔记社交平台，书写强大简洁，适合作为个人的笔记和知识管理工具。
        .buttons-wrapper
          a.button.button-stripe(href='/home' target='_blank') 进入Wenote
          a.button.button-stripe(href='/about' target='_blank') 查看文档
  .spanning
    .promo.clearfix
      .wrap
        .promo-wrapper.clearfix
          .promo-column
            img(src='../assets/write.svg' height='32' width='24' alt='')
            h5 便捷书写
            p Wenote 采用 Markdown 作为书写语法，专注于核心内容而非排版样式，使得笔记的书写简便且高效
          .promo-column
            img(src='../assets/read.svg' height='40px' width='36px' alt='')
            h5 沉浸编辑
            p 双栏式阅读界面，左侧大纲，右方内容，像阅读一本书籍一样阅读文档，带来非凡的阅读体验
          .promo-column
            img(src='../assets/function.svg' height='32' width='34' alt='')
            h5 引入社交
            p 让你的笔记能够被更多人看见，在学习的同时找到志同道合的朋友
          .promo-column
            img(src='../assets/manage.svg' height='36' width='336' alt='')
            h5 风格简约
            p 简约的网站设计，让用户专注笔记书写
    .discover.clearfix
      .wrap
        .discover-content.clearfix
          .opensource-title
            a(name='download') 所用技术栈
          p
            strong Wenote
            | 基于开源组件——Vue和Strapi构建开发而成，同时也将源码议托管到GitHub
          .discover-button.clearfix
            a.button.button-download(href='https://github.com/vuejs/vue' target='_blank')
              img.button-icon(src='../assets/github.svg')
              span.button-download-title 链接：
              span.common-button Vue
            a.button.button-download.android(href='https://github.com/strapi/strapi' target='_blank')
              img.button-icon(src='../assets/github.svg')
              span.button-download-title 链接：
              span.common-button Strapi
        .discover-img
          .discover-img-inside
            img(src='../assets/show.png' width='550px' alt='')
    .video.clearfix
      .wrap
        .video-title 便于部署
        .video-subtitle 整个项目基于Node.js，只需要一个环境就可以部署整个项目
        .video-block(style='text-align: center')
          img(src='../assets/icon9.svg' width='550px' alt='')
        .video-share-wrapper.clearfix
          ul.social-list.clearfix
            li.video-share-title 无论你是：
            li
              a.social-twitter(href='javascript:void(0);')
                strong Windows
            li
              a.social-facebook(href='javascript:void(0);')
                strong Linux
            li
              a.social-google(href='javascript:void(0);')
                strong macOS
    .comments.clearfix
      .wrap.tab.box.visible
        h4 Markdown 书写
        p 书写便捷、功能强大的Markdown文档编辑器，可快速创建排版优美的笔记。
    .simple.clearfix
      .wrap
        .simple-content
          h3 用来做什么？
          ul
            li.clearfix
              img(src='../assets/icon1.svg' height='32' width='32' alt='')
              span 个人知识管理
            li.clearfix
              img(src='../assets/icon3.svg' height='32' width='32' alt='')
              span 说明手册
            li.clearfix
              img(src='../assets/icon4.svg' height='32' width='32' alt='')
              span 教程书籍
            li.clearfix
              span ……
        .simple-img
          img(src='../assets/example.png' height='508' width='587' alt='')
    .newsletter.clearfix
      .wrap
        .newsletter-title 遇到问题？
        .video-share-wrapper.clearfix
          ul.social-list.clearfix
            li
              a.social-twitter(href='/about' target='_blank')
                strong DOC
    .video.clearfix
      .wrap
        .video-title 支持项目发展
        .video-subtitle
          | 球球评委给个高分叭！
        .discover-button.clearfix
          a.button.button-download(href='https://sheey.moe' target='_blank')
            img.site-icon(src='../assets/sheey.svg')
            span.common-button(style='padding-top: 15px; font-size:18px;') Sheey的杂货铺
          a.button.button-download.android(href='https://codgi.xin' target='_blank')
            img.site-icon(src='../assets/codgi.svg')
            span.common-button(style='padding-top: 15px; font-size:18px;')  Codgi的小屋

</template>

<style scoped>
ul,
ol {
  list-style: none;
}

a > img {
  vertical-align: bottom;
}

i {
  font-style: italic;
}

:focus {
  outline: none;
}

img {
  max-width: 100%;
  width: auto;
  height: auto;
}

.clearfix:after,
.wrap:after,
.spanning:after,
.content:after,
.main:after{
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}

.align-left {
  float: left !important;
}

.align-right {
  float: right !important;
}

.overflow-hidden {
  overflow: hidden;
  display: block;
}

body {
  height: 100%;
  font: 16px/28px "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #222222;
  -webkit-font-smoothing: antialiased;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

.wrap {
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1140px;
}

a {
  color: #094eb9;
  cursor: pointer;
  background: transparent;
  text-decoration: none;
}

a:hover {
  color: #40c9f4;
}

a:active {
  color: #0b97c3;
}

.disabled {
  color: #999999 !important;
  border-color: #999999 !important;
  cursor: default !important;
}

.input-text:focus,
.textarea:focus {
  border-color: #aeaeae;
}

.textarea {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.button {
  color: white;
  background: #094eb9;
  height: 58px;
  border: 2px solid #094eb9;
  font: 500 22px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 0 21px;
  border-radius: 5px;
  box-sizing: border-box;
}

.button:hover {
  background: #40c9f4;
  border-color: #40c9f4;
}

.button:active {
  background: #0b97c3;
  border-color: #0b97c3;
}

a.button {
  text-decoration: none;
  display: inline-block;
  line-height: 54px;
  color: white;
}

a.button:hover {
  color: white;
}

a.button:active {
  color: white;
}

a.button.button-stripe {
  background-color: rgba(0, 0, 0, 0.2);
  border-color: white;
}

a.button.button-stripe:hover {
  color: #222222;
  background-color: white;
  border-color: white;
}

a.button.button-stripe:active {
  color: #222222;
  background-color: #e5e5e5;
  border-color: #e5e5e5;
}

header {
  padding: 104px 0;
  background: url(../assets/header.webp) no-repeat 50% 50%;
  font: 24px/36px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: white;
  background-size: cover;
  box-sizing: border-box;
}

header h1 {
  color: #b6b6b6;
  font-size: 60px;
  line-height: 60px;
  font-weight: 500;
  margin-bottom: 38px;
}

header .buttons-wrapper {
  padding-top: 53px;
}

header .buttons-wrapper .button-stripe {
  margin-left: 14px;
}

.header-wrapper {
  padding-top: 87px;
  max-width: 655px;
}

.spanning {
  clear: both;
}
.opensource-title {
  font: bold 48px/48px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  margin-bottom: 25px;
}
.newsletter {
  background: #fafafa;
  padding: 103px 0 109px;
  text-align: center;
}

.newsletter p {
  font-size: 16px;
  line-height: 28px;
  max-width: 556px;
  margin: 0 auto;
  clear: both;
}

.newsletter-title {
  font: bold 48px/60px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 38px;
}

.newsletter-form {
  position: relative;
  display: inline-block;
  padding-right: 169px;
  max-width: 556px;
  min-width: 556px;
  height: 58px;
  margin-bottom: 32px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.newsletter-form .button {
  position: absolute;
  right: 0;
  top: 0;
  padding-left: 0;
  padding-right: 0;
  width: 149px;
}

.promo {
  padding: 114px 0 54px;
}

.promo-wrapper {
  margin: 0 -15px;
}

.promo-column {
  padding: 0 15px 60px;
  float: left;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 25%;
}

.promo-column img {
  display: block;
  margin-bottom: 23px;
}

.promo-column h5 {
  font: bold 18px/24px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.simple {
  padding: 104px 0 89px;
}

.simple-content {
  float: right;
  padding-top: 37px;
  width: 420px;
}

.simple-content h3 {
  font: 700 48px/48px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  border-bottom: solid 6px #f4f4f4;
  padding-bottom: 43px;
  margin-bottom: 43px;
}

.simple-content ul {
  margin-bottom: 5px;
}

.simple-content ul li {
  font-size: 23px;
  line-height: 32px;
  font-weight: 300;
  margin-bottom: 31px;
}

.simple-content ul li img {
  float: left;
  margin-right: 23px;
}

.simple-content ul li span {
  display: block;
  overflow: hidden;
}

.simple-img {
  float: left;
  max-width: 587px;
  width: 53%;
  padding-top: 37px;
}

.simple-img img {
  display: block;
  margin: 0 auto;
}

.comments {
  background: #094eb9;
  color: white;
  text-align: center;
  padding: 70px 0 60px;
}

.comments .box {
  display: none;
  padding: 0 195px 55px;
}

.comments .box.visible {
  display: block;
}

.comments .box h4 {
  font: 500 36px/46px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 37px;
}

.comments .box p {
  font-size: 19px;
  line-height: 32px;
  font-weight: 300;
}

.video-title {
  font: bold 48px/48px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 25px;
}

.video-subtitle {
  font-size: 19px;
  line-height: 25px;
  color: #919191;
  text-align: center;
}

.video {
  padding: 108px 0 116px;
}

.video-block {
  padding-top: 34px;
  margin: 0 auto 32px;
  max-width: 760px;
}

.video-share-wrapper {
  clear: both;
  text-align: center;
}

.social-list {
  display: inline-block;
}

.social-list li {
  font-size: 19px;
  line-height: 38px;
  float: left;
  margin: 0 9px;
}

.social-list li a {
  font-size: 15px;
  line-height: 38px;
  display: block;
  width: 160px;
  height: 38px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  background-color: #3bcbff;
  color: white;
  text-align: center;
}

.discover {
  padding: 31px 0 25px;
  background: #fafafa;
}

.discover-content {
  float: right;
  width: 50%;
  padding: 77px 97px 50px 15px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.discover-button {
  padding-top: 68px;
  margin: 0 -10px;
  clear: both;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.button-icon {
  float: left;
  padding: 10px 15px;
}

.site-icon {
  float: left;
  padding: 10px 12px;
  width: 18px;
  height: 30px;
}

.button-download {
  height: 62px;
  float: left;
  font: 500 11px/13px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding-left: 0;
  padding-right: 0;
  width: 180px;
  text-align: left;
  margin: 0 10px 20px;
  position: relative;
  box-sizing: border-box;
}

.button-download-title {
  padding: 11px 0 1px;
  display: block;
  font-size: 11px;
  line-height: 13px;
  text-align: left;
}

.common-button {
  display: block;
  font-size: 21px;
  line-height: 23px;
  text-align: left;
}

.discover-img {
  float: left;
  width: 50%;
}

.discover-img img {
  display: block;
}

.discover-img-inside {
  margin-top: 70px;
}
</style>
