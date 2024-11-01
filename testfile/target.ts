const ts = (...args: any[]) => {
  console.log(args);
};
const sddts = (...args: any[]) => {};

const map = {
  key: "value",
};

const key = "ddddd";

ts("hello", {});

ts("hello1", { a: 1 }, "ddd");

ts("hello2", ...[{ a: 1 }, "ddd"]);

ts('test12"3233');

ts(`test123233`);

ts(
  `longlong,git@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.gitgit@github.com:sexyHuang/translate-cli.git`
);

ts(`sss
  sddfd
  sdgdsgd,dgsd苦上加苦规定思考角度更健康更高更广阔dd
  `);

ts(key);

ts(`test_${key}`);

ts(`test_${map.key}`);

ts(map.key);

ts(`多孔菌科几个快递 看电视剧看到过
   {{key}}`);

ts(() => "test");

ts("hello", { a: 1 }, "ddd");

ts("hello1", {});

ts("hello2", ...[{ a: 1 }, "ddd"]);

sddts("hello2222", { a: 1 }, "ddd");

ts("只统计发布列表的；\n不包含内容库导入的");

const applyTypeName = "采购申请";

sddts("aaa", ts("审批系统-已审单据-采购类-") + "bbb");

sddts(
  "aaa",
  ts(`222多孔菌科几个快递 看电视剧看到过
  {{key}}`) + " 1223"
);
ts("1+1=2");
ts("1+—+++++++");

ts("审批系统-已审单据-采购类-" + applyTypeName);
sddts("aaa", ts("审批系统-已审单据-采购类-" + applyTypeName) + "bbb");

export {};
