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
    min-height: 100%;
    bottom: 0;
    padding: 10% 20%;
    margin: 10px;
}
.el-footer{
    bottom: 0;
}
.el-main{
    display: flex;
}
.el-container{
    min-height: 100vh;
}

</style>