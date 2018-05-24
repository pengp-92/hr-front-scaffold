const chalk = require('chalk');

// 如果命令参数缺失，则显示帮助信息
if (process.argv == null || process.argv.length < 5) {
  console.log(chalk.blue('使用模拟数据自动生成CRUD代码，命令：npm run cre [--module] [--name] [--type] [--data]'));
  console.log(chalk.blue('  module  要创建的模块类型，目前支持：V，创建一个页面'));
  console.log(chalk.blue('  name  要创建的模块名称，作为src/views下的目录名称，支持生成子目录，例如：test/demo，表示在views/test目录下创建demo子目录'));
  console.log(chalk.blue('  type  模块的类型，目前支持：L分页列表，LN不分页列表，A新增页，E编辑页，D详情页'));
  console.log(chalk.blue('  data  要生成代码使用的数据结构，统一在mock目录中配置，数据格式必须遵循ProcessResult，参见README.md'));
  return;
}

// 根据模块决定代码生成方法
switch (process.argv[2].toLowerCase()) {
  case 'v':
    require('./view')(process.argv[3].toLowerCase(), process.argv[4].toLowerCase(), process.argv[5].toLowerCase());
    break;
  default:
    console.log('暂不支持该模块类型：' + process.argv[2].toLowerCase());
    break;
}
