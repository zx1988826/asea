const fs = require('fs')
const path = require('path')
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();

exports.walk = async (routerList, docDir, conf) => {
  return new Promise((resolve, reject) => {
    if (routerList && routerList.length > 0) {
      routerList.forEach(element => {
        const newDocDir = path.join(docDir, element.name)
        // 如果有子 doc,新建文件夹，并且对该目录递归
        if (element.children && element.children.length > 0) {
          if (!fs.existsSync(newDocDir)) {
            fs.mkdir(newDocDir, { recursive: true }, (err) => {
              if (err) throw err;
              // fs.opendir(newDocDir, () => {
              //   this.walk(element.children, newDocDir)
              // })
            })
          }
          this.walk(element.children, newDocDir, conf)
        } else {
          // 新建 md
          // console.log(`新建${docDir}下的${element.name}.md`);
          const templateDir = path.join(__dirname, `../../../${conf.docFolder}/${conf.template}`)
          const newDoc = `${docDir}/${element.name}.md`
          if (!fs.existsSync(templateDir)) {
            // 不存在 doc 模版, 建空文档
            if (!fs.existsSync(newDoc)) {
              fs.writeFile(newDoc, "# hello girl", function (err) {
                if (err) throw err;
                console.log("The file was saved!");
              })
            }
          } else {
            if (!fs.existsSync(newDoc)) {
              const rs = fs.createReadStream(templateDir, 'utf-8');
              // rs.on('data', function (chunk) {
              //   console.log(chunk);
              // });
              var ws = fs.createWriteStream(newDoc);
              rs.pipe(ws, { end: false });
            }
          }
        }
      })
    }
    resolve(true)
  })
}