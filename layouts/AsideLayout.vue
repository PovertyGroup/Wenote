<template lang="pug">
    el-container().con
        el-header
            slot(name="header")
        el-container
            el-aside
                slot(name="aside")
            el-container()
                el-main
                    slot(name="main")
</template>

<style scoped>
header {
    padding-bottom: 20px;
}

.el-header{
    margin: 0;
    padding: 0;
}

.el-main{
    min-height: calc(100% - 100px);
    bottom: 0;
    margin: 10px;
    display: flex;
}
.el-footer{
    min-height: 30px;
    bottom: 0;
    background: #3e3e3e;
    color: #ffffff;
    height: fit-content !important;
}
.con{
    min-height: 100vh;
}

.el-aside{
    display: flex;
    max-width: 300px;
}
</style>
