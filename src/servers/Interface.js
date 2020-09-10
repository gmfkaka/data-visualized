import { httpsbaseUrl, createAPI, GUID } from './api'

/* 获取报题 */
export const getJnWorkCallReportList = (count = 10, page = 1, createtime) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallReportList?count=${count}&page=${page}&create_time=${createtime}`)

/* 获取选题 */
export const getJnWorkCallSubjectList = (count = 10, page = 1, createtime) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectList?count=${count}&page=${page}&create_time=${createtime}`)

/* 获取报题 */
export const getWorkCallReportList = (count = 10, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallReportList?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 获取选题 */
export const getWorkCallSubjectList = (count = 10, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectList?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 任务列表 */
export const getWorkCallTaskList = (count = 8, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallTaskList?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 任务数目 */
export const getWorkCallTaskNum = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallTaskNum&view_id=${currentViewId}`)

/* 线索汇聚
plateForm:类型{
  website: '网站'，
  weChat：‘微信’，
  weBo: '微博'
}
*/
export const getCluesTogether = (plateForm = 'website', count = 6, page = 1, currentViewId, source) => (source ? createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCluesTogether?plateForm=${plateForm}&count=${count}&page=${page}&source=${source}&view_id=${currentViewId}`) : createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCluesTogether?plateForm=${plateForm}&count=${count}&page=${page}&view_id=${currentViewId}`))

/* 稿件排行
desc：类型{
  click_num: '点击量',
  comment_num: '评论量'
}
*/
export const getM2OPlusRankList = (desc = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusRankList?desc=${desc}&count=${count}&page=${page}`)

export const getMicroOperationArticleList = (id = '748', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getMicroOperationArticleList?bind_id=${id}&count=${count}&page=${page}`)

/* 在线记者 */
export const getWorkCallConnectList = (currentViewId, orgid) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallConnectList&view_id=${currentViewId}&orgid=${orgid}`)

/* 记者详情 */
export const getIndexMemberDetail = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getIndexMemberDetail?user_id=${id}`)

/* 溧水运营数据 */
export const getOperateData = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getOperationalData&view_id=${currentViewId}`)

/* 成稿产出 */
export const getM2OPlusPublish = (count = 5, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusPublish?count=${count}&page=${page}&view_id=${currentViewId}`)
/* 蒙点号 */
export const getM2OPlusSubscribeIndex = (count = 5, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusSubscribeIndex?count=${count}&page=${page}&view_id=${currentViewId}`)
/* 市县热点 */
export const getM2OPlusHotPublish = (count = 4, page = 1, currentViewId, siteId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusPublish?count=${count}&page=${page}&view_id=${currentViewId}&site_id=${siteId}`)
/* 辅屏传播效果 */
export const getM2OPlusChart = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusChart&view_id=${currentViewId}`)

/* 热点话题 */
export const getHotsTopicList = (count = 4, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicList?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 热度走势 */
export const getHotsTopicTrend = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicTrend?id=${id}`)

/* 情感分析 */
export const getHotsTopicEmotion = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicEmotion?id=${id}`)

/* 关联热词 */
export const getHotsTopicHotWord = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicHotWord?id=${id}`)

/* 地域分布 */
export const getHotsTopicPubArea = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicPubArea?id=${id}`)

/* 媒体占比 */
export const getHotsTopicActiveMedia = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicActiveMedia?id=${id}`)

/* 活跃媒体来源top10 */
export const getHotsTopicMedia = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicMedia?id=${id}`)

/* 电视直播 */
export const getM2OPlusChannelList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusChannelList&view_id=${currentViewId}`)

/* 发稿统计(个人) */
export const getM2OPlusWorkRank = (count = 8, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkRank?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 部门统计 */
export const getM2OPlusWorkDepartRank = (count = 8, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkDepartRank?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 通用组件01最新稿件 */
export const getNewArticleList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusArticleList?view_id=${currentViewId}`)
/* 通用组件01最新稿件详情 */
export const getM2OPLUSArticleDetail = (id, type, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPLUSArticleDetail?article_id=${id}&type=${type}&view_id=${currentViewId}`)
/* 通用组件01发稿量排行 */
export const getPublishDataRank = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkDepartRank?view_id=${currentViewId}`)
/* 通用组件01点击量排行 */
export const getClickArticleList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusRankList?view_id=${currentViewId}`)
/* 通用组件01运营数据APP */
export const getAppStatisticalData = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getAppStatisticalData?view_id=${currentViewId}`)
/* 通用组件01运营数据微运营 */
export const getMicroOperationData = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getMicroOperationData?view_id=${currentViewId}`)
/* 通用组件01作品影响力 */
export const getM2ORankList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2ORankList?view_id=${currentViewId}`)
/* 通用组件01微博热点 */
export const getWeiboHotList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getMicroOperationData?view_id=${currentViewId}`)
/* 通用组件01部门排行 */
export const getM2OWorkDepartRank = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OWorkDepartRank?view_id=${currentViewId}`)
/* 通用组件01直播排行 */
export const getM2OLiveList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OLiveList?view_id=${currentViewId}`)
/* 通用组件01用户热力图 */
export const getM2OUserHot = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OUserHot?view_id=${currentViewId}`)
/* 通用组件01用户热力图 获取省份和城市排名 */
export const getM2OCityList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OUserCity?view_id=${currentViewId}`)
// 江宁思想与实践
export const getThoughtPractice = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getThoughtPractice`)
// 江宁新华社
export const getM2OPLUSArticleList = (count = 5, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCluesTogether?source=159664&latest_days=1&count=${count}&page=${page}`)
// 文明江宁
export const getcivilizationJN = (count) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCivilizationJN?count=${count}`)
// 选题汇总
export const getJnProject = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectPie?model=d`)
// 报题展示
export const getJnReport = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectPie?model=d&module_id=report`)
// 传播分析
export const getOperationalData = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getOperationalData?source=app,weiBo,weChat,shortVideo`)
// 稿件统计
export const getWorkCallSubjectPie = (model) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkRate?model=${model}`)

// 标准套系01
// 运营数据
export const getOperationalData01 = (source, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getOperationalData?source=${source}&view_id=${currentViewId}`)
// 消息汇总
export const getSoundBeansMessagesCount = (channelId, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getSoundBeansMessagesCount?channel_id=${channelId}&view_id=${currentViewId}`)
export const getSoundBeansAllProgramMonitor = (channelId, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getSoundBeansAllProgramMonitor?channel_id=${channelId}&view_id=${currentViewId}`)
// 内容生产
export const getM2OPlusWorkRate = (model, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkRate?model=${model}&view_id=${currentViewId}`)
export const getM2OPlusWorkChartSummary = (model, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkChartSummary?model=${model}&view_id=${currentViewId}`)
// 天气预报
export const getJiangningWeather = (city) => createAPI(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getWeather?city_name=${city}`)

// 盐城大屏  传播力数据系统
export const getPropagationForceData = (model) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getPropagationForceData?model=${model}`)

// 杭州  选题上大屏
export const getWorkCallSubjectSort = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectSort`)
export const getWorkCallSubjectSortList = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectList?sort_id=${id}&count=100`)

// 盐湖大屏
// 文明排行
export const getVolunteerRank = (page = 1, count = 3) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getVolunteerRank?page=${page}&count=${count}`)
// 排行榜详情
export const getActivity = (id, module = 'organize') => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getActivity?id=${id}&module=${module}`)
// 点单列表
export const getVolunteerHelpList = (count = 4, page = 1, status = '') => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getVolunteerHelpList?count=${count}&page=${page}&status=${status}`)
// 点单详情
export const getVolunteerHelpDetail = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getVolunteerHelpDetail?id=${id}`)
// 组织架构
export const getVolunteerOrganizeList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getVolunteerOrganizeList`)
// 组织结构（子组织）
export const getVolunteerOrganizeDetail = (id, count = '') => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getVolunteerOrganizeDetail?id=${id}&count=${count}`)
// 组织架构 成员名单
export const getVolunteerMemberList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getVolunteerMemberList`)
// 活动资讯
export const getActivityInfo = (page = 1, count = 4, status = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusPublish?type=article&page=${page}&count=${count}&status=${status}`)
// export const getJSActivityInfo = (page = 1, count = 4, columnId = 0) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusPublish?type=article&page=${page}&count=${count}&status=1&site_id=143&column_id=${columnId}`)
export const getJSActivityInfo = (config) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusPublish`, 'get', config)
// 金山全部组织接口
export const getAllOrgList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/mapAll`)
// 金山组织等级数量接口
export const getOrgNavList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/outline`)
// 金山组织列表接口
export const getOrgList = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/mapOrganizeList?id=${id}`)
// 金山组织等级数量接口
export const getOrganizeDetail = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/mapOrganizeDetail?id=${id}`)
// 金山先进典型列表接口
export const getAdvancedList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/columnList`)
// 金山数据统计图接口
export const getJSstaticList = (config) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/marketData`, 'get', config)
// 活动咨询详情
export const getActivityInfoDetail = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusPublishDetail?id=${id}`)
export const getSixPlatformInfo = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getVolunteerSixPlatForms?id=${id}`)

// 线索汇聚新闻列表
export const getCloudNewsList = (page, count, keyword = '', source = '', days = 3) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsNewsList?&page=${page}&count=${count}&k=${keyword}&source=${source}&latest_days=${days}`)
// 线索汇聚新闻详情
export const getCloudNewsDetail = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsNewsDetail?id=${id}`)
// 线索汇聚热词
export const getCloudHotword = (keyword = '', source = '') => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsKeywords?k=${keyword}&source=${source}`)

// 城市新闻
export const getCityNews = (city = '', page = 1, size = 10) => createAPI(`https://monitor-screen.cloud.hoge.cn/Apidaping/hotspot/city_news?city=${city}&page=${page}&size=${size}`)
// 全网新闻
export const getWebNews = (page = 1, size = 10) => createAPI(`https://monitor-screen.cloud.hoge.cn/Apidaping/hotspot/news?page=${page}&size=${size}`)

// 雨花台大屏
// 舆情分析
export const getYuqing = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicEventNews?id=${id}`)
// 情感分析
export const getEmotional = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicEmotion?id=${id}`)
// 关键字
export const getKeywords = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicHotWord?id=${id}`)
// 内容类型
export const getContent = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicContentType?id=${id}`)
// 媒体占比
export const getMedia = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicMedia?id=${id}`)
// 热度趋势
export const getTrend = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicTrend?id=${id}`)
// 舆情列表
export const getYuqingList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicTracker?custom_id=210&user_id=26388`)
// 线索汇聚
export const getHotsList = (plateform = 0, page, size, source = []) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsNewsList?plateForm=${plateform}&page=${page}&count=${size}&source=${source}&latest_days=7&order=publish_time&use_post=1`)
// 运营数据
export const getMicroOperationAppList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getMicroOperationAppList`)
// 运营数据列表
export const getMicroOperationYesterday = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getMicroOperationEachYesterday`)
// 视频列表
export const getM2OPlusPublishVideo = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusRankList?
column_id=16&orders=order_id,DESC`)
