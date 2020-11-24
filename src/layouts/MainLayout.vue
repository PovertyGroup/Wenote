<template lang="pug">
    el-container(direction="vertical")
        header
            slot(name="header")
        el-main.main
            slot
        el-footer.footer
            slot(name="footer")
</template>




<style scoped>
header {
    padding-bottom: 20px;
}
.el-main{
    min-height: 100%;
    bottom: 0;
    padding: 10% 20%;
    margin: 10px;
}
.el-footer{
    position: absolute;
    width: 100%;
    bottom: 0;
}
</style>