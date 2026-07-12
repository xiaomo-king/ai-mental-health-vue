<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary" @click="handleEdit({})">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%; margin-top: 25px">
      <el-table-column label="文章标题" fixed="left" width="450">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="authorName" width="150" />
      <el-table-column label="阅读量" prop="readCount" width="150" />
      <el-table-column label="发布时间" prop="updatedAt" width="150" />
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">

          <el-button @click="handleEdit(scope.row)" text type="primary">编辑</el-button>
          <el-button @click="handlePublish(scope.row)" text v-if="scope.row.status === 0 || scope.row.status === 2"
            type="success">发布</el-button>
          <el-button @click="handleUnpublish(scope.row)" text v-if="scope.row.status === 1"
            type="warning">下线</el-button>
          <el-button @click="handleDelete(scope.row)" text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 25px;" :page-size="pagination.size" layout="prev, pager, next"
      :total="pagination.total" @change="handleChange" />
    <ArticleDialog v-model:modelValue="dialogVisible" :article="currentArticle" :categories="categories"
      @success="handleSuccess" />
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { categoryTree, articlePage, getArticleDetail, createArticle, changeArticleStatus, deleteArticle } from '@/api/admin'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const formItem = [
  { comp: 'input', prop: 'title', label: '文章标题', placeholder: '请输入文章标题' },
  { comp: 'select', prop: 'categoryId', label: '分类', placeholder: '请选择分类' },
  {
    comp: 'select', prop: 'status', label: '状态', placeholder: '选择状态', options: [{
      label: '草稿',
      value: '0'
    },
    {
      label: '已发布',
      value: '1'
    },
    {
      label: '已下线',
      value: '2'
    }
    ]
  }
]

//分页参数

const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0
})

const handleSearch = async (formData) => {
  console.log(formData, '查询参数')

  const params = {
    ...pagination,
    ...formData
  }

  const { records, total } = await articlePage(params)
  tableData.value = records
  pagination.total = total
}

const handleChange = (page) => {
  pagination.currentPage = page
  handleSearch()
}

//分类映射
const categoryMap = reactive({})
//分类列表
const categories = ref([])

//列表数据
const tableData = ref([])

//新增和编辑
const dialogVisible = ref(false)
const currentArticle = ref(null)

const handleSuccess = () => {
  dialogVisible.value = false
  //刷新列表
  handleSearch()
}
const handleEdit = (row) => {
  if (!row.id) {
    //新增
    currentArticle.value = null
    dialogVisible.value = true
  } else {
    //编辑
    getArticleDetail(row.id).then(res => {
      console.log(res, '编辑详情')
      currentArticle.value = res
      //打开弹窗
      dialogVisible.value = true
    })
  }

}
//发布
const handlePublish = (row) => {
  ElMessageBox.confirm(
    `确定发布文章${row.title}吗？`,
    '确认',
    {
      confirmButtonText: '确定发布',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    changeArticleStatus(row.id, { status: 1 }).then(res => {
      ElMessage.success('发布成功')
      handleSearch()
    })
  })
}
//下线
const handleUnpublish = (row) => {
  ElMessageBox.confirm(
    `确定下线文章${row.title}吗？`,
    '确认下线',
    {
      confirmButtonText: '确定下线',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    changeArticleStatus(row.id, { status: 2 }).then(res => {
      ElMessage.success('下线成功')
      handleSearch()
    })
  })
}
//删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确认删除文章${row.title}吗？`,
    '确认删除',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'danger'
    }
  ).then(() => {
    deleteArticle(row.id).then(res => {
      ElMessage.success('删除成功')
      handleSearch()
    })
  })
}

onMounted(async () => {

  const data = await categoryTree()

  categories.value = data.map(item => {
    //将获取的id值映射成分类名称值
    categoryMap[item.id] = item.categoryName
    return {
      label: item.categoryName,
      value: item.id
    }
  })
  formItem[1].options = categories.value

  //获取列表
  handleSearch()
})


</script>