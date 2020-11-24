<template lang="pug">
    div.header
        div.left
            el-link(:underline="false" href="/index").sitename Wenote 📝
            el-link(:underline="false") 熊宝的笔记(镇站之宝)
            el-link(:underline="false") 其他垃圾笔记
        div.right
            el-link(:underline="false" href="").doc 关于
            el-link(:underline="false" href="/login").regist 登录

</template>

<style scoped>
.header {
    height: 50px;
    background: #ffffff;
    box-shadow: 0 3px 2px #6ba9f0c0;
    display: flex;
}

.header * {
    margin: auto;
}

.left {
    margin-left: 0;
}

.left * {
    margin: auto 10px;
    font-size: 15px;
}

.regist{
    margin-right: 30px;
    font-size: 17px;
}
.doc{
    margin-right: 30px;
    font-size:17px;
}
.sitename{
    font-size:30px;
    margin-left: 30px;
}
.right {
    margin-right: 20px;
}
</style>