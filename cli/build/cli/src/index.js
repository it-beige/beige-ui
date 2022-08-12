'use strict'
exports.__esModule = true
var commander_1 = require('commander')
var create_1 = require('../command/create')
// 创建命令对象
var cmd = new commander_1.Command()
// 注册命令、参数、以及用户传入的回调函数
cmd
  .command('create')
  .description('创建一个组件模板或者配置文件')
  .option('-t | --type <type>', '创建类型，可选值: component, lib-entry ')
  // 注册回调
  .action(create_1.onCreate)
cmd.parse()
// 执行命令行参数的解析
console.log('hello beige-ui cli!')
