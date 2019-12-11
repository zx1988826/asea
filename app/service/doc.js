const Service = require('egg').Service;

class DocService extends Service {
  async detail () {
    // read config
    // const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    // const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
    //   data: {
    //     orderBy: '"$key"',
    //     startAt: `"${pageSize * (page - 1)}"`,
    //     endAt: `"${pageSize * page - 1}"`,
    //   },
    //   dataType: 'json',
    // })
    return [
      { id: 1, title: 'this is news 1', url: '/news/1' },
      { id: 2, title: 'this is news 2', url: '/news/2' }
    ]
  }
}

module.exports = DocService;
