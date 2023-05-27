<template>
  <div class="note-wrapper" v-if="note">
    <el-card class="head">
      <div class="title">
        <h1>{{ note.title }}</h1>
      </div>
      <div class="subtitle">
        {{ note.subtitle }}
      </div>
      <div class="category hover-action" @click="openCategory(note.category.id)">
        分类：{{ note.category.name }}
      </div>
      <div class="tags">
        <div class="tag" v-for="tag in note.tags">
          <i class="fa fa-tag hover-action">{{ tag.name }}</i>
        </div>
      </div>
    </el-card>
    <el-card class="content">
      <v-md-preview ref="preview" :text="note.noteInfo.noteText"></v-md-preview>
    </el-card>
    <div class="directory-list" :class="{ hidden: cardView }">
      <el-card class="directory-card ">
        <template #header>
          <h2>目录导航</h2>
        </template>
        <ul>
          <el-scrollbar height="300px">
            <li class="directory hover-action" v-for="anchor in titleList"
              :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }" @click="anchorClick(anchor)">
              <el-text truncated>{{ anchor.title }}</el-text>
            </li>
          </el-scrollbar>
        </ul>
      </el-card>
      <div class="arrow" @click="setCardView">
        <i class="fa fa-angle-right" :style="{ transform: cardView ? 'rotate(-180deg)' : 'rotate(0deg)' }"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, nextTick, onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getNoteInfoApi } from '../../../api';

const route = useRoute();
const router = useRouter();

const id = computed(() => route.query.id);

const note = ref();
const titleList = ref([] as any);
const preview = ref();
const getNoteInfo = () => {
  getNoteInfoApi(Number(id.value)).then(res => {
    const data = res.data;
    note.value = data;
    document.title = note.value.title;

    nextTick(() => {
      const anchors = preview.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');

      const titles = Array.from(anchors).filter((title: any) => !!title.innerText.trim());

      if (!titles.length) {
        titleList.value = [];
        return;
      }

      const hTags = Array.from(new Set(titles.map((title: any) => title.tagName))).sort();

      titleList.value = titles.map((el: any) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
      }));
    })
  })
}

onActivated(() => {
  getNoteInfo();
})

const anchorClick = (anchor: any) => {
  const { lineIndex } = anchor;

  const heading = preview.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

  if (heading) {
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
  }
}

const cardView = ref(true);
const setCardView = () => {
  cardView.value = !cardView.value;
}

const openCategory = (id: number) => {
  router.push({ path: 'categoryNote', query: { id: id } });
}
</script>

<style scoped lang='scss'>
.note-wrapper {
  .head {
    margin-bottom: 20px;
    text-align: center;

    div {
      margin: 10px;
    }

    .subtitle {
      font-size: var(--subtitle-size);
      color: var(--subtitle-color);
    }

    .category {
      font-size: 20px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .directory-list {
    position: fixed;
    right: 0;
    bottom: 50%;
    transform: translateY(50%);
    transition: all 0.5s;
    z-index: 90;

    &.hidden {
      transform: translate(90%, 50%);
    }

    .directory-card {
      width: auto;
      height: auto;

      ul {
        width: 200px;

        li {
          cursor: pointer;

          ::v-deep(.el-text) {
            font-size: 16px;
            line-height: 40px;
            color: inherit;
          }
        }
      }
    }

    .arrow {
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translate(50%, -50%);
      background-color: #fff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: -1px 0px 5px gray;
      line-height: 40px;
      font-size: 26px;
      text-align: center;
      cursor: pointer;

      i {
        transition: transform 0.5s;
      }
    }
  }
}
</style>