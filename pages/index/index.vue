<script setup lang="ts">
import type {VideoItem} from "@/types/video";

//频道列表
const {data: channelList} = await useFetch('/api/channel')
//热门列表
const {data: videoList} = await useFetch('/api/hot')

//显示列表
const loadingList = ref<VideoItem[]>([])
//加载状态
const loading = ref(false)
//是否加载完成
const finished = ref(false)
//页码
let page = 1;
let pageSize = 20;

//滚动触底触发
const onLoad = () => {
  //加载中
  loading.value = false
  //根据页码提取数据
  const data = videoList.value?.slice((page - 1) * pageSize, page * pageSize)
  //加载列表
  loadingList.value.push(...data)
  // console.log('已经触底')
  //页码累加
  page++;
  if (videoList.value?.length === loadingList.value.length) {
    //加载结束
    finished.value = true
  }
}

//主动请求前20条数据， 用于首屏渲染，方便SEO抓取数据
onLoad()
</script>

<template>
  <!-- 公共头部 -->
  <AppHeader/>
  <!-- 频道模块 -->
  <van-tabs>
    <van-tab v-for="item in channelList" :key="item.id" :title="item.name"/>
  </van-tabs>


  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <!-- 视频列表 -->
    <div class="video-list">
      <AppVideo v-for="item in loadingList" :key="item.aid" :item="item"/>
      <!--      <NuxtLink class="v-card" v-for="item in loadingList" :key="item.aid" :to="`/video/${item.bvid}`">-->
      <!--        <div class="card">-->
      <!--          <div class="card-img">-->
      <!--            <img-->
      <!--                class="pic"-->
      <!--                :src="item.pic"-->
      <!--                :alt="item.title"-->
      <!--            />-->
      <!--          </div>-->
      <!--          <div class="count">-->
      <!--          <span>-->
      <!--            <i class="iconfont icon_shipin_bofangshu"></i>-->
      <!--            {{ item.stat.view }}-->
      <!--          </span>-->
      <!--            <span>-->
      <!--            <i class="iconfont icon_shipin_danmushu"></i>-->
      <!--            {{ item.stat.danmushu }}-->
      <!--          </span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <p class="title">{{ item.title }}</p>-->
      <!--      </NuxtLink>-->
    </div>
  </van-list>


</template>

<style lang="scss">
// 公共头部
.app-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #fff;

  .logo {
    flex: 1;

    .Navbar_logo {
      color: #fb7299;
      font-size: 28px;
    }
  }

  .search {
    padding: 0 8px;

    .ic_search_tab {
      color: #ccc;
      font-size: 22px;
    }
  }

  .face {
    padding: 0 15px;

    img {
      width: 24px;
      height: 24px;
    }
  }

  .down-app {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fb7299;
    color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
  }
}

// 视频列表
.video-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
}

// 视频卡片
.v-card {
  width: 50%;
  padding: 0 5px 10px;

  .card {
    position: relative;
    background: #f3f3f3 url(@/assets/images/default.png) center no-repeat;
    background-size: 36%;
    border-radius: 2px;
    overflow: hidden;

    .card-img {
      .pic {
        height: 100px;
        width: 100%;
        object-fit: cover;
      }
    }

    .count {
      background-image: linear-gradient(0deg, #000000d9, #0000);
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 6px;

      span {
        .iconfont {
          font-size: 12px;
        }
      }
    }
  }

  .title {
    margin-top: 5px;
    font-size: 12px;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>