<template>
    <Editor api-key="gx5xpm6qlw2n4mgdtwtxvspx8frzyhlztzyuoypix1tbqivt" :init=editorInit />
</template>

 <script>
import Editor from "@tinymce/tinymce-vue";

export default {
    name: "app",
    data() {
        return{
            editorInit: {
                language_url: '/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                height: 300,
                plugins: 'link lists image code table wordcount',
                toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                // 此处为图片上传处理函数
                images_upload_handler: (blobInfo, success, failure) => {
                this.handleImgUpload(blobInfo, success, failure)
                },
                statusbar: true, // 底部的状态栏
                menubar: false, // 最上方的菜单
                branding: false // 水印“Powered by TinyMCE”
            }
        }
    },
    components: {
        editor: Editor,
    },
};
</script>
