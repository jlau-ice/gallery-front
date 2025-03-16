<template>
  <div id="userManager">
    <div class="search-form">
      <a-form :model="searchPrams" layout="inline" @finish="doSearch" @finishFailed="searchFiled">
        <a-form-item label="用户名" name="userName">
          <a-input v-model:value="searchPrams.userName" placeholder="请输入用户名" allow-clear />
        </a-form-item>
        <a-form-item label="账号" name="userAccount">
          <a-input v-model:value="searchPrams.userAccount" placeholder="请输入账号" allow-clear />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-table :columns="columns" :data-source="dataList" :pagination="pagination" @change="onChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
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
        <template v-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="text" class="text-primary">
            <EditOutlined />编辑
          </a-button>
          <a-popconfirm title="确定要删除这个用户吗？" ok-text="确定" cancel-text="取消" placement="left"
            @confirm="deleteUser(record.id)">
            <a-button type="text" class="text-danger">
              <DeleteOutlined />删除
            </a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { reactive, ref, onMounted, computed } from 'vue'
import { deleteUserUsingPost, getUserListUsingPost } from '@/api/userController.ts'
import { message, Modal } from 'ant-design-vue'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    align: 'center',
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
    align: 'center',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
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
  sortField: 'createTime',
  sortOrder: 'descend',
  userName: '', // 添加初始值
  userAccount: '', // 添加初始值
})
const pagination = computed(() => {
  return {
    current: searchPrams.current,
    pageSize: searchPrams.pageSize,
    total: total.value,
    showSizeChanger: true,
    showTotal: () => `共 ${total.value} 条记录`,
  }
})
const onChange = (page: any) => {
  console.log(page)
  searchPrams.current = page.current
  searchPrams.pageSize = page.pageSize
  fetchData()
}
const fetchData = async () => {
  const res = await getUserListUsingPost(searchPrams)
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error(res.data.message)
  }
}
const doSearch = () => {
  searchPrams.current = 1
  fetchData()
}
const searchFiled = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const deleteUser = async (id: number | undefined) => {
  if (!id) {
    message.error('id不能为空')
    return
  }
  const res = await deleteUserUsingPost({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
    await fetchData()
  } else {
    message.error(res.data.message)
  }
}
</script>
<style scoped lang="scss">
#userManager {
  padding: 10px;

  .search-form {
    margin-bottom: 20px;
    margin-left: 10px;
  }
}
</style>
