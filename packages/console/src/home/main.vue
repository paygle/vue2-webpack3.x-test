<template>
  <main-body use-slot no-resize no-lmenu>
    <template>
      <div class="row-cell">
        <div class="col-cell-66">
          <div class="content">
            <div class="item-head"><span class="title">我的待办</span></div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="待办类别" width="120"></el-table-column>
              <el-table-column prop="name" label="分校" width="180"></el-table-column>
              <el-table-column prop="date" label="申请时间" width="120"></el-table-column>
              <el-table-column prop="address" label="申请人"></el-table-column>
              <el-table-column prop="date" label="操作" width="120"></el-table-column>
            </el-table>
            <a class="more" href="#">还有 28 条 >></a>
          </div>
        </div>
        <div class="col-cell-33">
          <div class="content">
            <div class="item-head">
              <span class="title">学生人数变化</span>
              <div class="selections">
                <el-select v-model="studentchgnum">
                  <el-option label="最近7天（按日）" :value="1"></el-option>
                </el-select>
              </div>
            </div>
            <div id="student-chart" ref="student"></div>
          </div>
        </div>
      </div>
      <div class="row-cell">
        <div class="col-cell-66">
          <div class="content">
            <div class="item-head">
              <span class="title">流水</span>
              <a href="#">详细 >></a>
              <div class="selections">
                <el-select v-model="studentchgnum">
                  <el-option label="全部校区" :value="1"></el-option>
                </el-select>
                <el-select v-model="studentchgnum">
                  <el-option label="最近1月（按日）" :value="1"></el-option>
                </el-select>
              </div>
            </div>
            <div id="iowater-chart" ref="iowater"></div>
          </div>
        </div>
        <div class="col-cell-33">
          <div class="content">
            <div class="item-head">
              <span class="title">课程人数占比</span>
              <div class="selections">
                <el-select v-model="studentchgnum">
                  <el-option label="全部校区" :value="1"></el-option>
                </el-select>
              </div>
            </div>
            <div id="peoplerate-chart" ref="peoplerate"></div>
          </div>
        </div>
      </div>
      <div class="row-cell">
        <div class="col-cell-33">
          <div class="content">
            <div class="item-head">
              <span class="title">平均课时单价</span>
              <div class="selections">
                <el-select v-model="studentchgnum">
                  <el-option label="最近7天（按日）" :value="1"></el-option>
                </el-select>
              </div>
            </div>
            <div id="avgprice-chart" ref="avgprice"></div>
          </div>
        </div>
        <div class="col-cell-33">
          <div class="content">
            <div class="item-head">
              <span class="title">预存率</span>
              <div class="selections">
                <el-select v-model="studentchgnum">
                  <el-option label="最近7天（按日）" :value="1"></el-option>
                </el-select>
              </div>
            </div>
            <div id="saverate-chart" ref="saverate"></div>
          </div>
        </div>
        <div class="col-cell-33">
          <div class="content">
            <div class="item-head">
              <span class="title">通知</span>
              <a href="#">通知中心 >></a>
            </div>
            <ul class="infomations">
              <li><a href="#">关于调整校本部教学作息时间的通知</a><span class="time">18:45</span></li>
              <li><a href="#">课程体系调整通知</a><span class="time">2017.12.24</span></li>
            </ul>
            <el-button>+ 发通知</el-button>
          </div>
        </div>
      </div>
      <div class="row-cell pd5">
        <div class="content syscont">
          <div class="item-head">
            <span class="title">蓓蕾琴行</span>
            <a href="#">基础设置  >></a>
          </div>
          <div class="sys-info">
            <div class="sys-rcode"></div>
            <div class="info-txt">
              <div class="txt"><em>系统名称</em><span>广州景诺艺术培训中心</span></div>
              <div class="txt"><em>机构编码</em><span>817064</span></div>
              <div class="txt"><em>机构类别</em><span>音乐、媒体艺术、美术、舞蹈、棋艺、体育、艺考、语言培训、高中文化课、其他</span></div>
              <el-button>+新增校区</el-button>
            </div>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="分校名称" width="100" sortable></el-table-column>
            <el-table-column prop="date" label="有效期" sortable></el-table-column>
            <el-table-column prop="num" label="课程库" sortable></el-table-column>
            <el-table-column prop="num" label="班级" sortable></el-table-column>
            <el-table-column prop="num" label="教师" sortable></el-table-column>
            <el-table-column prop="num" label="教室" sortable></el-table-column>
            <el-table-column prop="num" label="学生" sortable></el-table-column>
            <el-table-column prop="num" label="师生比" sortable></el-table-column>
            <el-table-column prop="num" label="容班量" sortable></el-table-column>
            <el-table-column prop="num" label="带班量" sortable></el-table-column>
            <el-table-column prop="num" label="微商城" sortable></el-table-column>
            <el-table-column prop="num" label="进销存" sortable></el-table-column>
            <el-table-column prop="num" label="微信公众号" width="110" sortable></el-table-column>
            <el-table-column prop="date" label="操作" width="120"></el-table-column>
          </el-table>
        </div>
      </div>
    </template>
  </main-body>
</template>
<script>
import MainBody from '@compo/public/main-body';
import {on, off} from '@utils/dom';
import {setRunTimeout} from '@utils/utilstool';
let refreshEchartHandler;

// 初始化学生人数变化
const initStudentChart = (item) => {
  // 基于准备好的dom，初始化echarts实例
  let chart = echarts.init(item.dom);

  // 指定图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      top: '15%',
      right: 0,
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2018-1-1', '2018-1-2', '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6']
      }
    ],
    yAxis: [
      {
        name: '咨询+流失',
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '邮件营销',
        type: 'bar',
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  chart.setOption(option);
  item.chart = chart;
};

// 初始化流水
const initIowaterChart = (item) => {
  // 基于准备好的dom，初始化echarts实例
  let chart = echarts.init(item.dom);

  // 指定图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      top: '15%',
      right: 0,
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2018-1-1', '2018-1-2', '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6']
      }
    ],
    yAxis: [
      {
        name: '收入+支出',
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '邮件营销',
        type: 'bar',
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  chart.setOption(option);
  item.chart = chart;
};

// 初始化课程人数占比
const initPeoplerateChart = (item) => {
  // 基于准备好的dom，初始化echarts实例
  let chart = echarts.init(item.dom);

  // 指定图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {
            value: 335,
            name: '直接访问'
          },
          {
            value: 310,
            name: '邮件营销'
          },
          {
            value: 234,
            name: '联盟广告'
          },
          {
            value: 135,
            name: '视频广告'
          },
          {
            value: 1548,
            name: '搜索引擎'
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  chart.setOption(option);
  item.chart = chart;
};

// 初始化平均课时单价
const initAvgpriceChart = (item) => {
  // 基于准备好的dom，初始化echarts实例
  let chart = echarts.init(item.dom);

  // 指定图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      top: '15%',
      right: 0,
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2018-1-1', '2018-1-2', '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6']
      }
    ],
    yAxis: [
      {
        name: '单价',
        type: 'value'
      }
    ],
    series: [
      {
        name: '均单价',
        type: 'bar',
        data: [320, 332, 301, 334, 390, 330, 320]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  chart.setOption(option);
  item.chart = chart;
};

// 初始化预存率
const initSaverateChart = (item) => {
  // 基于准备好的dom，初始化echarts实例
  let chart = echarts.init(item.dom);

  // 指定图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      top: '15%',
      right: 0,
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2018-1-1', '2018-1-2', '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6']
      }
    ],
    yAxis: [
      {
        name: '人均预存+人均实收',
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        stack: 'bar',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '邮件营销',
        type: 'bar',
        stack: 'bar',
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  chart.setOption(option);
  item.chart = chart;
};

// 设置宽度
const setWidth = (item) => {
  if (item.dom) {
    let parent = item.dom.parentNode;
    let dw = parent.getBoundingClientRect();
    item.dom.style.width = `${dw.width - 40}px`;
  }
};

export default {
  name: 'Home',
  componentName: 'Home',
  components: {
    MainBody
  },
  data() {
    return {
      echartDoms: [],
      studentchgnum: 1,      // 学生人数变化

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        num: 123,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        num: 123,
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        num: 123,
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        num: 123,
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },

  methods: {

    initEcharts() {
      let ecdom = this.echartDoms;
      if (window.echarts && ecdom.length === 5) {
        initStudentChart(ecdom[0]);
        initIowaterChart(ecdom[1]);
        initPeoplerateChart(ecdom[2]);
        initAvgpriceChart(ecdom[3]);
        initSaverateChart(ecdom[4]);
      }
    },

    resizeEcharts() {debugger
      setRunTimeout(refreshEchartHandler, (_this) => {
        let ecdom = _this.echartDoms;
        for (let i = 0; i < ecdom.length; i++) setWidth(ecdom[i]);
        for (let k = 0; k < ecdom.length; k++) ecdom[k].chart.resize();
      }, [this], 300);
    }
  },

  mounted() {
    this.$nextTick(()=>{
      let ecdom = this.echartDoms;
      ecdom.push({dom: this.$refs.student, chart: null});    // 学生人数变化
      ecdom.push({dom: this.$refs.iowater, chart: null});    // 流水
      ecdom.push({dom: this.$refs.peoplerate, chart: null});   // 课程人数占比
      ecdom.push({dom: this.$refs.avgprice, chart: null});   // 平均课时单价
      ecdom.push({dom: this.$refs.saverate, chart: null});   // 预存率
      for (let i = 0; i < ecdom.length; i++) setWidth(ecdom[i]);
      this.initEcharts();
    });
  },

  created() {
    this.$on('loaded-echart', this.initEcharts);
    on(window, 'resize', this.resizeEcharts);
  },

  beforeDestroy() {
    off(window, 'resize', this.resizeEcharts);
  }
};
</script>
