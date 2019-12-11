// app/controller/news.js
const Controller = require('egg').Controller
const path = require('path')
const fs = require('fs')

class DocController extends Controller {
  async detail () {
    // DOC 配置
    // console.log(this.config.assistant)
    const ctx = this.ctx
    // 寻找路由列表和参数
    const routerList = [{
      name: 'home',
      children: [
        {
          name: 'home1',
          children: [{ name: 'childrenhome1' },
          { name: 'childrenhome2' }]
        },
        { name: 'home2' }
      ]
    },
    {
      name: 'about'
    }]
    const routerName = 'about'

    const docDir = path.join(__dirname, `../../../${this.config.assistant.docFolder}`)
    // console.log("TCL: DocController -> detail -> docDir", fs.stat(docDir))
    // fs.stat(docDir, function(err, stats) {
    //   console.log(stats.isDirectory());
    //   console.log(stats);
    // })
    if (!fs.existsSync(docDir)) {
      await fs.mkdir(docDir, { recursive: true }, (err) => {
        if (err) throw err;
      })
    }
    await this.ctx.helper.walk(routerList, docDir, this.config.assistant)

    const docList = await ctx.service.doc.detail()

    await ctx.render('doc/detail.tpl', { list: docList })
  }
}

module.exports = DocController;
