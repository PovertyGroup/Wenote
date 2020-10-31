<template lang="pug">
    div.header
        div.left
            el-link(:underline="false" href="/").sitename Wenote
            el-link(:underline="false") 熊宝的笔记(镇站之宝)
            el-link(:underline="false") 其他垃圾笔记
        div.right
            el-link(:underline="false") 登陆

</template>

<style scoped>
.header {
    height: 50px;
    background: #ffffff;
    box-shadow: 0 3px 2px #eeeeee;
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
    font-size: 17px;
}

.sitename{
    font-size:20px;
    margin: auto 20px;
}

.right {
    margin-right: 20px;
}
</style>