<template lang="pug">
    el-container(direction="vertical")
        header
            slot(name="header")
        el-main
            slot
        el-footer
            slot(name="footer")
</template>

<style scoped>
header {
    padding-bottom: 20px;
}
.el-main{
    min-height: calc(100% - 100px);
    bottom: 0;
    margin: 10px;
}
.el-footer{
    min-height: 100px;
    bottom: 0;
}
.el-main{
    display: flex;
}
.el-container{
    min-height: 100vh;
}

</style>