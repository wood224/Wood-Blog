<template>
  <div class="archive-wrapper">
    <div class="wrapper-title">
      <h1>归档</h1>
    </div>
    <div class="content">
      <el-card>
        <div class="archive-list" v-for="(item, index) in archiveList" :key="index">
          <div class="year">{{ item[0] }}</div>
          <div class="archive" v-for="archive in item[1]" :key="archive.id">
            <div class="line">
              <div class="circle"></div>
            </div>
            <div class="info">
              <el-card :body-style="{ height: '100%' }" class="card">
                <div class="container">
                  <div class="top">
                    <div class="name text-ellipsis" :title="archive.name">
                      {{ archive.name }}
                    </div>
                  </div>
                  <div class="middle">
                    <div class="source">
                      <span class="tip">来源：</span>{{ archive.source }}
                    </div>
                    <div class="update">
                      <el-tag :type="archive.action === '新增' ? '' : archive.action === '修改' ? 'success' : 'danger'">{{
                        archive.action }}</el-tag>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="time">
                      <i class="fa fa-calendar">&nbsp;{{ archive.createTime }}</i>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <div ref="targetElement">
          <Loading :more="more"></Loading>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onActivated, onDeactivated, reactive, ref } from 'vue';
import { getArchiveListApi } from '../../../api';
import { Archive } from '../../../types';

const count = ref(0);
const archiveList = ref<Map<number, Archive[]>>(new Map());
const pageOptions = reactive({
  limit: 6,
  offset: 0,
});
const targetElement = ref<HTMLElement>();
const ob = ref();
const more = ref(true);
const flag = ref(true);     //节流阀
const getArchiveList = async (limit: number, offset: number) => {
  const { data } = await getArchiveListApi({ limit, offset });
  if (data.archiveList.length === 0) {  //当没有更多数据时
    flag.value = false;      //关闭节流阀
    more.value = false;
  } else {
    count.value = data.count;

    if (archiveList.value.size !== 0) {   //当归档列表不为空时
      data.archiveList.forEach((element: any) => {
        const year = new Date(element.createTime).getFullYear();
        if (archiveList.value.has(year)) {
          archiveList.value.get(year)!.push(element);
        } else {
          archiveList.value.set(year, [element]);
        }
      })
    }
    else {
      const map = new Map();
      data.archiveList.forEach((element: any) => {
        const year = new Date(element.createTime).getFullYear();
        if (!map.has(year)) {
          map.set(year, [element]);
        } else {
          map.get(year).push(element);
        }
      })
      archiveList.value = map;
    }
    flag.value = true;
  }
}

onActivated(() => {
  getArchiveList(pageOptions.limit, pageOptions.offset);
  if (targetElement.value && more.value) {
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        flag.value = false;
        await getArchiveList(pageOptions.limit, pageOptions.offset += pageOptions.limit);
      }
    }, {
      threshold: 0.5
    });

    observer.observe(targetElement.value);
    ob.value = observer;
  }
})

onDeactivated(() => {
  if (ob.value) {
    ob.value.unobserve(targetElement.value);
    ob.value.disconnect();
  }
})
</script>

<style scoped lang='scss'>
.archive-wrapper {
  margin: 0 auto;

  .content {
    .archive-list {
      .year {
        font-size: 36px;
        font-weight: bold;
      }

      .archive {
        position: relative;
        display: flex;
        height: 150px;

        .line {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          margin: 0 20px 0 40px;
          width: 4px;
          height: 100%;
          background-color: #e4e7ed;

          .circle {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            width: 15px;
            height: 15px;
            background-color: var(--ty-blue);
            box-sizing: content-box;
            border-radius: 50%;
            border: 5px solid #e4e7ed;
          }
        }

        .info {
          flex: 1;
          padding: 10px 0;
          width: 0;
          height: 100%;

          .card {
            height: 100%;

            .container {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;

              .top {
                font-weight: bold;
              }

              .middle {
                display: flex;
                margin: 10px 0;

                .source {
                  flex-shrink: 0;
                  margin-right: 20px;
                  padding: 0 10px;
                  min-width: 52px;
                  height: 22px;
                  line-height: 22px;
                  border-radius: 5px;
                  background-color: var(--el-fill-color);
                }
              }

              .bottom {
                display: flex;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width:992px) {
  .line {
    margin-left: 20px !important;
  }

  .tip {
    display: none;
  }
}
</style>