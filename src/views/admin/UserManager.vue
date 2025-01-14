<template>
  <div id="userManager">
    <a-table :columns="columns" :data-source="dataList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'" al="center">
          <a-avatar :src="record.userAvatar" />
        </template>
        <template v-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-if="column.dataIndex === 'createTime' || column.dataIndex === 'updateTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="text" class="text-primary">
            <EditOutlined />编辑
          </a-button>
          <a-button type="text" class="text-danger">
            <DeleteOutlined />删除
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { reactive, ref, onMounted } from 'vue'
import { getUserListUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]
onMounted(() => {
  fetchData()
})
const dataList = ref<API.UserVO[]>([])
const total = ref(0)
const searchPrams = reactive<API.UserQueryRequest>({
  current: 1,
  pageSize: 10,
})

const fetchData = async () => {
  const res = await getUserListUsingPost(searchPrams)
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error(res.data.message)
  }
}
</script>
<style scoped lang="scss">
#userManager {
  padding: 20px;
}
</style>
