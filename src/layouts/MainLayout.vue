<template lang="pug">
    el-container
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
}
.el-footer{
    position: absolute;
    width: 100%;
    bottom: 0;
}
</style>