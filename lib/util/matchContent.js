/* eslint-disable max-len */
const fs = require('fs');

/**
 * (?<!\w): 负向前瞻，确保 ts 前面不是字母或数字字符。
* ts\(: 匹配 ts( 这一部分。
* \s*: 匹配零个或多个空白字符。
* (['"])`: 捕获一个引号字符（单引号、双引号或反引号），并将其存储在捕获组1中。
* ((?:(?!\$\{)[^\\])*?): 非贪婪匹配引号内的内容，直到遇到 ${ 或反斜杠为止。这个部分存储在捕获组2中。
* (?:...): 非捕获组，用于组合正则表达式。
* (?!\$\{): 负向前瞻，确保后面不是 ${。
* [^\\]: 匹配除反斜杠以外的任何字符。
* *?: 非贪婪匹配前面的模式零次或多次。
* \1: 匹配前面捕获的引号字符（捕获组1）。
* \s*: 匹配零个或多个空白字符。
* (?:,|\)): 非捕获组，匹配逗号或右括号。
 */
const MatchReg = /(?<!\w)ts\(\s*(['"`])((?:(?!\$\{)[^\\])*?)\1\s*(?:,|\))/g;

const matchText = (text) => {
  const matchRes = text.match(MatchReg);
  if (matchRes && matchRes.length) {
    const keys = matchRes.map((item) =>
      item.replace(MatchReg, '$2'),
    );
    if (keys.length) {
      const res = [...new Set(keys)];
      return res;
    }
  }
  return [];
};

const matchContent = (filePath) => {
  const fileContent = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });
  return matchText(fileContent);
};

module.exports = {
  matchContent,
  matchText,
};
