<template>
    <div class="q-pa-md" style="max-width: 300px">
        <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
            <q-input ref="titleRef" filled v-model="form.title" label="标题" hint="输入文章的标题" lazy-rules
                :rules="titleRules" />
            <q-input ref="summaryRef" filled v-model="form.summary" label="摘要" hint="输入文章的摘要" lazy-rules
                :rules="summaryRules" />
            <q-input v-model="form.content" filled autogrow label="内容" />

            <div>
                <q-btn label="提交" type="submit" color="primary" />
                <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </form>

        <div style="border: 1px solid #ccc">
            <WeToolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <WeEditor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" />
        </div>
    </div>
</template>

<script>
import { useQuasar } from 'quasar'
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
export default {
    async setup() {
        const $q = useQuasar()
        const form = ref({
            title: '',
            summary: '',
            content: ''

        })
        const titleRef = ref(null)
        const summaryRef = ref(null)

        const accept = ref(false)
        // 编辑器实例，必须用 shallowRef，重要！
        const editorRef = shallowRef();

        // 内容 HTML
        const valueHtml = ref('<p>hello</p>');

        // 模拟 ajax 异步获取内容
        // onMounted(() => {
        //     setTimeout(() => {
        //         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
        //     }, 1500);
        // });

        const toolbarConfig = {};
        const editorConfig = { placeholder: '请输入内容...' };

        // 组件销毁时，也及时销毁编辑器，重要！
        onBeforeUnmount(() => {
            const editor = editorRef.value;
            if (editor == null) return;

            editor.destroy();
        });

        // 编辑器回调函数
        const handleCreated = (editor) => {
            console.log('created', editor);
            editorRef.value = editor; // 记录 editor 实例，重要！
        };
        const handleChange = (editor) => {
            console.log('change:', editor.getHtml());
        };
        const handleDestroyed = (editor) => {
            console.log('destroyed', editor);
        };
        const handleFocus = (editor) => {
            console.log('focus', editor);
        };
        const handleBlur = (editor) => {
            console.log('blur', editor);
        };
        const customAlert = (info, type) => {
            alert(`【自定义提示】${type} - ${info}`);
        };
        const customPaste = (editor, event, callback) => {
            console.log('ClipboardEvent 粘贴事件对象', event);

            // 自定义插入内容
            editor.insertText('xxx');

            // 返回值（注意，vue 事件的返回值，不能用 return）
            callback(false); // 返回 false ，阻止默认粘贴行为
            // callback(true) // 返回 true ，继续默认的粘贴行为
        };

        const insertText = () => {
            const editor = editorRef.value;
            if (editor == null) return;

            editor.insertText('hello world');
        };

        const printHtml = () => {
            const editor = editorRef.value;
            if (editor == null) return;
            console.log(editor.getHtml());
        };

        const disable = () => {
            const editor = editorRef.value;
            if (editor == null) return;
            editor.disable()
        };
        return {
            editorRef,
            mode: 'default',
            valueHtml,
            toolbarConfig,
            editorConfig,
            handleCreated,
            handleChange,
            handleDestroyed,
            handleFocus,
            handleBlur,
            customAlert,
            customPaste,
            insertText,
            printHtml,
            disable,
            form,
            titleRef,
            titleRules: [
                val => (val && val.length > 0) || '请输入文章标题'
            ],
            summaryRef,
            summaryRules: [
                val => (val !== null && val !== '') || '请输入摘要'
            ],
            accept,

            async onSubmit() {
                const res = await useHttp.post('/articles', form.value)

                console.log(res, 'dataTwice');
                console.log(form.value.title, 'form');
                titleRef.value.validate()
                summaryRef.value.validate()
                if (titleRef.value.hasError || summaryRef.value.hasError) return
            },

            onReset() {
                title.value = null
                age.value = null
                titleRef.value.resetValidation()
                summaryRef.value.resetValidation()
            }
        }
    },
}


</script>
