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
          <i class="fa fa-tag">{{ tag.name }}</i>
        </div>
      </div>
    </el-card>
    <el-card class="content">
      <MdPreview ref="previewRef" :editorId="'preview-' + note.id" v-model="note.noteInfo.noteText"
        :theme="isDark ? 'dark' : 'light'" />
    </el-card>
    <div class="directory-list" :class="{ hidden: openDirectory }">
      <el-card class="directory-card ">
        <template #header>
          <h2>目录导航</h2>
        </template>
        <ul>
          <el-scrollbar max-height="300px">
            <!-- <MdCatalog id="catalog" ref="catalogRef" :editorId="'preview-' + note.id" :scrollElement="scrollElement" /> -->
            <li class="directory hover-action" :class="{ 'active': anchor.lineIndex === activeIndex }"
              v-for="anchor in titleList" :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
              @click="anchorClick(anchor)">
              <span>{{ anchor.title }}</span>
            </li>
          </el-scrollbar>
        </ul>
      </el-card>
      <div class="arrow" @click="setCardView">
        <i class="fa fa-angle-right" :style="{ transform: openDirectory ? 'rotate(-180deg)' : 'rotate(0deg)' }"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, nextTick, onMounted, onUnmounted, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useIndexStore } from '../../../store';
import { getNoteInfoApi } from '../../../api';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const previewRef = ref();

const route = useRoute();
const router = useRouter();
const store = useIndexStore();

const { isDark, openDirectory } = toRefs(store);

const id = computed(() => route.query.id);

const titleList = ref();
const note = ref();
const getNoteInfo = async () => {
  await getNoteInfoApi(Number(id.value)).then(res => {
    const data = res.data;
    note.value = data;
    document.title = note.value.title;
    nextTick(() => {
      const anchors = previewRef.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
      const titles = Array.from(anchors).filter((title: any) => !!title.innerText.trim());
      if (!titles.length) {
        titleList.value = [];
        return;
      }

      const hTags = Array.from(new Set(titles.map((title: any) => title.tagName))).sort();
      titleList.value = titles.map((el: any) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-line'),
        indent: hTags.indexOf(el.tagName),
        offsetTop: window.innerHeight + el.offsetTop + 200
      }));
    })
  })
}
getNoteInfo();

const anchorClick = (anchor: any) => {
  const { lineIndex } = anchor;
  const heading = previewRef.value.$el.querySelector(`[data-line="${lineIndex}"]`);
  if (heading) {
    window.scrollTo({ left: 0, top: window.scrollY + heading.getBoundingClientRect().top - 100, behavior: 'smooth' })
  }
}

const setCardView = () => {
  store.setOpenDirectory(!openDirectory.value);
}

const openCategory = (id: number) => {
  router.push({ path: 'categoryNote', query: { id: id } });
}

const activeIndex = ref(-1);
const listenerScroll = () => {
  if (titleList.value && titleList.value.length > 0) {
    const currentScrollTop = window.scrollY;
    titleList.value.some((title: any, index: number) => {
      if (index < titleList.value.length - 1 && currentScrollTop >= title.offsetTop && currentScrollTop < titleList.value[index + 1].offsetTop ||
        index === titleList.value.length - 1 && currentScrollTop >= title.offsetTop) {
        console.log(currentScrollTop, title.offsetTop);

        activeIndex.value = title.lineIndex;
        return true;
      }
    })
  }
}
onMounted(() => {
  window.addEventListener('scroll', listenerScroll, false);
})

onUnmounted(() => {
  window.removeEventListener('scroll', listenerScroll, false);
})
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

          &.active {
            color: var(--ty-blue);
          }

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
      background-color: var(--el-bg-color);
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