<template lang="pug">
    el-container
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
</style>