<template lang="pug">
    div.header
        div.left
            el-link(:underline="false" href="/").sitename 📝Wenote
            
        div.right
            el-link(:underline="false" href="").doc 关于
            el-link(:underline="false" href="").regist 注册

</template>

<style scoped>
.header {
    height: 50px;
    background: #ffffff;
    box-shadow: 0 3px 2px #8b6c6c;
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

.regist{
    margin-right: 30px;
    font-size: 20px;
}
.doc{
    margin-right: 30px;
    font-size:20px;
}
.sitename{
    font-size:30px;
    margin-left: 30px;
}
 
.right {
    margin-right: 20px;
}
</style>