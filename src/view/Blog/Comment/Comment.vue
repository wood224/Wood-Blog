<template>
	<div class="comment-wrapper">
		<div class="wrapper-title">
			<h1>留言</h1>
		</div>
		<div class="container" ref="containerRef">
			<div class="ipt">
				<el-form ref="ruleFormRef" :rules="rules" :model="commentForm" label-position="left" label-width="80px">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="commentForm.username" placeholder="来将请留姓名" />
					</el-form-item>
					<el-form-item label="内容" prop="content">
						<el-input v-model="commentForm.content" placeholder="发表你的见解吧" type="textarea" :minlength="10" :maxlength="200"
							show-word-limit />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm(ruleFormRef)">
							发表
						</el-button>
						<el-button @click="resetForm(ruleFormRef)">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="box">
				<div class="plate">
					<div class="item" v-for="item in commentList" :key="item.id">
						<StickyNote :name="item.username" :content="item.content" :time="item.createTime"></StickyNote>
					</div>
				</div>
				<template v-if="noMore">
					<div class="no-more">
						没有更多了~
					</div>
				</template>
				<template v-if="loading">
					<div class="load" v-loading="loading">
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { onActivated, onDeactivated, onMounted, reactive, ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { getCommentListApi, addCommentApi } from '../../../api';

const containerRef = ref<HTMLElement>();
const ruleFormRef = ref<FormInstance>()

const count = ref(0)
const commentList = ref<any[]>([])
const pageOptions = reactive({
	limit: 12,
	offset: 0,
});
const loading = ref(false);
const noMore = ref(false)
const flag = ref(true);     //节流阀
const getCommentList = async (limit: number, offset: number) => {
	loading.value = true;
	const { data } = await getCommentListApi({ limit, offset });
	loading.value = false;
	if (data.commentList.length === 0) {
		flag.value = false;      //关闭节流阀
		noMore.value = true;
	} else {
		commentList.value.push(...data.commentList);
		flag.value = true;
	}
}

//----------提交留言--------------//
const commentForm = ref({
	username: '',
	content: ''
})
const rules = reactive<FormRules>({
	username: [
		{ required: true, message: '来将请留姓名', trigger: ['blur', 'change'] },
		{ min: 2, max: 20, message: '长度请在3-20字之间', trigger: ['blur', 'change'] },
		{ pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,20}$/, message: '名字只能由中文、大小写字母、数字组成' }
	],
	content: [
		{ required: true, message: '为何一言不发？', trigger: ['blur', 'change'] },
		{ min: 3, max: 200, message: '长度请在3-200字之间', trigger: ['blur', 'change'] }
	]
})

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			addCommentApi({ username: commentForm.value.username, content: commentForm.value.content }).then(res => {
				const data = res.data;
				ElMessage.success(data.msg);
				getCommentList(pageOptions.limit, pageOptions.offset);
				resetForm(formEl);
			}).catch(err => {
				const data = err.response.data;
				ElMessage.error(data.msg);
			})
		}
	})
}
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}

const scrollBottom = async () => {
	const scrollTop = document.documentElement.scrollTop;         //文档顶部到可视文档顶部的距离
	const clientHeight = document.documentElement.clientHeight;   //文档可视区域内容高度
	const scrollHeight = document.documentElement.scrollHeight;   //文档总区域的高度

	if (scrollTop + clientHeight >= scrollHeight && flag.value) {
		flag.value = false;
		await getCommentList(pageOptions.limit, pageOptions.offset += pageOptions.limit);
	}
}

onActivated(() => {
	getCommentList(pageOptions.limit, pageOptions.offset);
	window.addEventListener('scroll', scrollBottom)
})

onDeactivated(() => {
	window.removeEventListener('scroll', scrollBottom)
})
</script>

<style scoped lang='scss'>
.comment-wrapper {
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
		width: 100%;

		.ipt {
			width: 100%;
		}

		.box {
			padding: 20px;
			width: 100%;
			background-color: #BE9267;
			border-radius: 20px;

			.plate {
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 100%;

				.item {
					width: 300px;
					transition: all .5s;
					padding: 20px;
				}
			}

			.no-more {
				color: white;
				text-align: center;
			}

			.load {
				width: 100%;
			}
		}
	}
}
</style>