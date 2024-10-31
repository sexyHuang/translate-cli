/* eslint-disable max-len */
const path = require('path');
const {glob} = require('../lib/util/glob');
const {multiSelect, confirm} = require('../lib/util/query');
const {overWrite} = require('../lib/file');
const {matchContent} = require('../lib/util/matchContent');


module.exports = async function(params) {
  const {folder, log, output = process.cwd(), useDefault} = params;

  const logInFile = log === 'true';

  let info = console.info;

  if (logInFile) {
    const {logger} = require('../lib/logger');
    info = logger.info;
  }
  console.time('task');
  let ext;
  let langs;

  if (useDefault) {
    ext = ['ts', 'tsx'];
    langs = ['zh-cn', 'en-us'];
  } else {
    ext = await multiSelect(
        '请选择您需要匹配的文件',
        ['ts', 'tsx', 'js', 'jsx'],
        ['ts', 'tsx'],
    );
    langs = await multiSelect(
        '请选择您需要的语言，按空格选择',
        [
          'zh-cn', // 简体中文(中国)
          'zh-hk', // 繁体中文(中国香港)
          'en-us', // 英语
        ],
        ['zh-cn', 'en-us'],
    );
  }

  console.log('匹配文件后缀：', ext.join('、'));
  console.log('翻译语种：', langs.join('、'));

  // 信息确认
  let confirmRes;
  if (useDefault) {
    confirmRes = true;
  } else {
    confirmRes = await confirm('请确认您的选择信息');
  }

  if (confirmRes && folder) {
    info(`匹配文件后缀：${ext.join('、')}`);
    info(`翻译语种：${langs.join('、')}`);
    info(`匹配目录：${folder}`);
    // 匹配目录文件
    // /Users/liguangxing/Feimei/dms-system/src/pages/uiMaterial
    const files = await glob(`${folder}/**/*.{${ext.join(',')}}`, {
      ignore: ['**/node_modules/**', '**/*.d.ts'],
    });
    if (files.length) {
      let allKeys = [];
      for (let i = 0; i < files.length; i++) {
        const res = matchContent(files[i]);
        if (res) {
          allKeys = [...allKeys, ...res];
        }
      }
      const res = [...new Set(allKeys)].sort();
      // 写入文件
      for (let i = 0; i < langs.length; i++) {
        const filePath = path.join(output, `${langs[i]}.json`);
        const obj = {};
        res.forEach((item) => (obj[item] = item));
        overWrite(filePath, obj, 4);
        info(`${filePath} 文件生成成功！`);
      }
    } else {
      info('目录下无匹配文件');
    }
  }
  console.timeEnd('task');
  // 关闭日志
  if (logInFile) {
    const {log4js} = require('../lib/logger');
    log4js.shutdown();
  }
};
