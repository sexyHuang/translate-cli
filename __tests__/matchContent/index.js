/* eslint-disable max-len */
const path = require('path');
const {matchContent} = require('../../lib/util/matchContent');

test('matchContent should extract i18n keys correctly', () => {
  const testFilePath = path.join(__dirname, './../../testfile', 'target.ts');
  const expectedKeys = [
    'hello',
    'hello1',
    'hello2',
    'test12"3233',
    'test123233',
    'longlong,git@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.git',
    `sss
  sddfd
  sdgdsgd,dgsd苦上加苦规定思考角度更健康更高更广阔dd
  `,
    '多孔菌科几个快递 看电视剧看到过\n   {{key}}',
  ];

  const result = matchContent(testFilePath);
  console.log('result', result);
  expect(result).toEqual(expectedKeys);
});


