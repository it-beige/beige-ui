import { ensureDirSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
import { lightBlue, lightGreen } from 'kolorist'
import genCoreTemplate from '../template/core'
import genTypeTemplate from '../template/type'
import genStyleTemplate from '../template/style'
import genTestTemplate from '../template/test'
import genIndexTemplate from '../template/index'

export interface ComponentMeta {
  name: string
  title: string
  category: string
}

const WRITE_FILE_OPTIONS = { encoding: 'utf-8' }

export default function createComponent(meta: ComponentMeta) {
  const { name } = meta

  // 拼接组件目录
  const componentDir = resolve('../src', name)

  // 其他核心文件目录：组件源文件、类型、样式、测试
  const compSrcDir = resolve(componentDir, 'src')
  const styleDir = resolve(componentDir, 'style')
  const testDir = resolve(componentDir, 'test')

  ensureDirSync(compSrcDir)
  ensureDirSync(styleDir)
  ensureDirSync(testDir)

  // 文件内容创建

  // 组件文件
  const coreFilePath = resolve(compSrcDir, name) + '.tsx'
  writeFileSync(coreFilePath, genCoreTemplate(name), WRITE_FILE_OPTIONS)
  // 组件类型文件
  const coreTypeFilePath = resolve(compSrcDir, name + '-type') + '.ts'
  writeFileSync(coreTypeFilePath, genTypeTemplate(name), WRITE_FILE_OPTIONS)
  // 组件样式文件
  const coreStyleFilePath = resolve(styleDir, name) + '.scss'
  writeFileSync(coreStyleFilePath, genStyleTemplate(name), WRITE_FILE_OPTIONS)
  // 组件测试文件
  const coreTestFilePath = resolve(testDir, name) + '.test.ts'
  writeFileSync(coreTestFilePath, genTestTemplate(name), WRITE_FILE_OPTIONS)

  // 组件索引文件
  const indexFilePath = componentDir + '/index.ts'
  writeFileSync(indexFilePath, genIndexTemplate(name), WRITE_FILE_OPTIONS)

  // 创建成功之后的通知
  console.log(
    lightGreen(`
    组件${name}目录创建生成
  `)
  ) //sy-log

  console.log(
    lightGreen(`
    组件目录${compSrcDir}
  `)
  )
}
