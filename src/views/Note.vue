<template lang="pug">
  MainLayout
    template(v-slot:header)
        Header
    .note-wrap
        .note-title-wrap(v-if="!this.noSuchNote")
            .edit-wrap(v-if="!this.canEdit")
                h1.note-title {{ this.noteTitle }}
                el-button.save-title(icon="el-icon-edit" size="mini" @click="editTitle")
            .edit-wrap(v-if="this.canEdit")
                el-input.edit-title(v-model="noteTitle" size="large" placeholder="请输入标题") {{ this.noteTitle }}
                el-button.save-title(icon="el-icon-check" type="success" size="mini" @click="saveTitle()")
            .note-info-wrap
                .note-info-item
                    i.far.fa-user
                    p.note-author-name {{ this.noteAuthor.username }}
                .note-info-item
                    i.far.fa-calendar-alt
                    p.note-pudate-time {{ this.updateTime }}
        div.editor-wrap(v-if="!this.noSuchNote")
            mavon-editor(v-model="noteMd" language="zh-CN" :toolbars="toolbars" @save="saveNote")
                template(slot="left-toolbar-after")
                    el-button(type="button"  class="op-icon fa fa-mavon-floppy-o"
                            aria-hidden="true" :title="`记得保存哦`" @click="saveNote()"
                            style="width: 100px;height: 30px; background:  #8fbbfd3a") 保存更改
            //- MarkdownCard.md-card(:mdSource="this.noteMd")
        NoSuchNoteCard(v-if="this.noSuchNote").not-such-note-card
    template(v-slot:footer)
        Footer
</template>

<script>
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import MainLayout from '../layouts/MainLayout'
import MarkdownCard from '../components/MarkdownCard.vue'
import NoSuchNoteCard from '../components/NoSuchNoteCard.vue'
import Vue from 'vue'

import { format } from 'timeago.js';

export default {
    Name: 'Note',
    components: {
        MarkdownCard,
        NoSuchNoteCard,
        MainLayout,
        Header,
        Footer
    },
    data() {
        return {
            noteMd: '',
            noteTitle: '',
            noteAuthor: '',
            noSuchNote: false,
            canEdit: false,
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: false, // 展示html源码
                help: true, // 帮助
                undo: true, // 上一步
                redo: true, // 下一步
                trash: false, // 清空
                save: false, // 保存（触发events中的save事件）
                navigation: false, // 导航目录
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                subfield: false, // 单双栏模式
                preview: false, // 预览
            }
        }
    },
    mounted() {
        console.log(Vue.$jwt[0]);
        Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id)).then((res) => {
            this.noteTitle = res.data.title;
            this.noteMd = res.data.content;
            this.noteAuthor = res.data.author;
        })
        .catch(() => {
            this.noSuchNote = true;
        })
    },
    computed: {
        updateTime() {
            return format(this.noteAuthor.updatedAt, 'zh_CN');
        }
    },
    methods: {
        saveNote(value){
            Vue.$axios.put(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id), {
                "content": value,
            }, { headers: Vue.$getAuthorizedHeader() })
            .then(() => {
                this.$message({
                    message: "已保存",
                    type: "success",
                });
                setTimeout(() => {
                    location.reload();
                }, 1500);
            })
            .catch(err => {
                this.$message({
                    message: err.data.message,
                    type: "error",
                });
            })
        },
        saveTitle(){
            Vue.$axios.put(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id), {
                "title": this.noteTitle,
            }, { headers: Vue.$getAuthorizedHeader() })
            .then(() => {
                this.$message({
                    message: "已保存",
                    type: "success",
                });
            })
            .catch(err => {
                this.$message({
                    message: err.data.message,
                    type: "error",
                });
            })
            return this.canEdit = !this.canEdit
        },
        editTitle(){
            return this.canEdit = !this.canEdit
        },
    }
}
</script>

<style scoped>
.not-such-note-card{
    margin: auto;
}

.editor-wrap, .editor-wrap > * {
    margin: 0;
    width: 100%;
    height: 100%;
}

.md-card{
    margin-right: 10px;
    width: calc(50% - 30px);
}

.note-wrap{
    width: 100%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.note-title-wrap{
    line-height: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    padding-left: 10px;
}

.note-title-wrap * {
    width: fit-content;
}

.note-title{
    font-size: 45px;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    vertical-align:middle;
    display: inline-block;
}

.note-info-wrap{
    display: flex;
    padding-top: 5px;
    font-size: 18px;
    padding-top: 10px;
}

.note-info-item{
    display: flex;
    padding-left: 10px;
    font-size: 14px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.far{
    margin: 0 5px;
}

.edit-wrap {
    display: flex;
    flex-direction: row;
}

.edit-title{
    margin: auto;
    width: 250px;
    font-size: 30px;
}

.save-title{
    margin: 10px;
    vertical-align:middle;
    vertical-align:middle;
    display: inline-block;
}
</style>