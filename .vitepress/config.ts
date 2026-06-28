import { defineConfig } from 'vitepress'

const zhSidebar = {
  '/guide/': [
    {
      text: '入门',
      items: [
        { text: '快速开始', link: '/guide/' },
        { text: '安装与依赖', link: '/guide/installation' },
        { text: '命令参考', link: '/guide/commands' },
        { text: '权限节点', link: '/guide/permissions' },
      ]
    }
  ],
  '/recipe/': [
    {
      text: '配方系统',
      items: [
        { text: '概述', link: '/recipe/' },
        { text: '有序配方 Shaped', link: '/recipe/shaped' },
        { text: '无序配方 Shapeless', link: '/recipe/shapeless' },
        { text: '烧炼配方 Smelting', link: '/recipe/smelting' },
        { text: '锻造配方 Smithing', link: '/recipe/smithing' },
        { text: '切石配方 Stonecutting', link: '/recipe/stonecutting' },
        { text: '酿造配方 Brewing', link: '/recipe/brewing' },
        { text: '铁砧配方 Anvil', link: '/recipe/anvil' },
        { text: '禁用配方', link: '/recipe/disable' },
        { text: '配方书', link: '/recipe/recipe-book' },
      ]
    }
  ],
  '/trigger/': [
    {
      text: '触发器系统',
      items: [
        { text: '概述', link: '/trigger/' },
        { text: '合成触发器', link: '/trigger/craft-triggers' },
        { text: '动态事件', link: '/trigger/bukkit-events' },
        { text: '条件函数', link: '/trigger/conditions' },
        { text: '动作函数', link: '/trigger/actions' },
      ]
    }
  ],
  '/script/': [
    {
      text: '脚本引擎',
      items: [
        { text: '语法概述', link: '/script/' },
        { text: '表达式与运算符', link: '/script/expressions' },
        { text: '函数参考', link: '/script/functions' },
      ]
    }
  ],
  '/item/': [
    {
      text: '物品系统',
      items: [
        { text: '概述', link: '/item/' },
        { text: '自定义物品', link: '/item/custom-items' },
        { text: '物品Tag', link: '/item/tag' },
        { text: '物品组', link: '/item/item-packs' },
        { text: '外部插件物品', link: '/item/external-hooks' },
      ]
    }
  ],
  '/config/': [
    {
      text: '配置文件',
      items: [
        { text: '文件总览', link: '/config/' },
        { text: 'config.yml', link: '/config/config-yml' },
        { text: '自定义燃料', link: '/config/custom-fuels' },
        { text: '禁用配方列表', link: '/config/disabled-recipes' },
        { text: '多语言', link: '/config/languages' },
      ]
    }
  ],
  '/ui/': [
    {
      text: 'UI 系统',
      items: [
        { text: '概述', link: '/ui/' },
        { text: '配方创建器', link: '/ui/recipe-creator' },
        { text: '配方编辑器', link: '/ui/recipe-editor' },
        { text: '自定义菜单', link: '/ui/custom-menus' },
      ]
    }
  ],
  '/api/': [
    {
      text: '开发者文档',
      items: [
        { text: '概述', link: '/api/' },
        { text: 'Item API', link: '/api/items' },
        { text: 'Recipe API', link: '/api/recipes' },
        { text: 'Trigger API', link: '/api/triggers' },
        { text: 'Script API', link: '/api/scripts' },
        { text: 'Hook 开发', link: '/api/hooks' },
      ]
    }
  ],
}

const enSidebar = {
  '/en/guide/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Quick Start', link: '/en/guide/' },
        { text: 'Installation', link: '/en/guide/installation' },
        { text: 'Commands', link: '/en/guide/commands' },
        { text: 'Permissions', link: '/en/guide/permissions' },
      ]
    }
  ],
  '/en/recipe/': [
    {
      text: 'Recipe System',
      items: [
        { text: 'Overview', link: '/en/recipe/' },
        { text: 'Shaped Recipes', link: '/en/recipe/shaped' },
        { text: 'Shapeless Recipes', link: '/en/recipe/shapeless' },
        { text: 'Smelting Recipes', link: '/en/recipe/smelting' },
        { text: 'Smithing Recipes', link: '/en/recipe/smithing' },
        { text: 'Stonecutting Recipes', link: '/en/recipe/stonecutting' },
        { text: 'Brewing Recipes', link: '/en/recipe/brewing' },
        { text: 'Anvil Recipes', link: '/en/recipe/anvil' },
        { text: 'Disabling Recipes', link: '/en/recipe/disable' },
        { text: 'Recipe Book', link: '/en/recipe/recipe-book' },
      ]
    }
  ],
  '/en/trigger/': [
    {
      text: 'Trigger System',
      items: [
        { text: 'Overview', link: '/en/trigger/' },
        { text: 'Craft Triggers', link: '/en/trigger/craft-triggers' },
        { text: 'Event Triggers', link: '/en/trigger/bukkit-events' },
        { text: 'Conditions', link: '/en/trigger/conditions' },
        { text: 'Actions', link: '/en/trigger/actions' },
      ]
    }
  ],
  '/en/script/': [
    {
      text: 'Script Engine',
      items: [
        { text: 'Syntax Overview', link: '/en/script/' },
        { text: 'Expressions & Operators', link: '/en/script/expressions' },
        { text: 'Function Reference', link: '/en/script/functions' },
      ]
    }
  ],
  '/en/item/': [
    {
      text: 'Item System',
      items: [
        { text: 'Overview', link: '/en/item/' },
        { text: 'Custom Items', link: '/en/item/custom-items' },
        { text: 'Item Packs', link: '/en/item/item-packs' },
        { text: 'External Plugin Items', link: '/en/item/external-hooks' },
      ]
    }
  ],
  '/en/config/': [
    {
      text: 'Configuration',
      items: [
        { text: 'File Overview', link: '/en/config/' },
        { text: 'config.yml', link: '/en/config/config-yml' },
        { text: 'Custom Fuels', link: '/en/config/custom-fuels' },
        { text: 'Disabled Recipes', link: '/en/config/disabled-recipes' },
        { text: 'Languages', link: '/en/config/languages' },
      ]
    }
  ],
  '/en/ui/': [
    {
      text: 'UI System',
      items: [
        { text: 'Overview', link: '/en/ui/' },
        { text: 'Recipe Creator', link: '/en/ui/recipe-creator' },
        { text: 'Recipe Editor', link: '/en/ui/recipe-editor' },
        { text: 'Custom Menus', link: '/en/ui/custom-menus' },
      ]
    }
  ],
  '/en/api/': [
    {
      text: 'Developer Docs',
      items: [
        { text: 'Overview', link: '/en/api/' },
        { text: 'Item API', link: '/en/api/items' },
        { text: 'Recipe API', link: '/en/api/recipes' },
        { text: 'Trigger API', link: '/en/api/triggers' },
        { text: 'Script API', link: '/en/api/scripts' },
        { text: 'Hook Development', link: '/en/api/hooks' },
      ]
    }
  ],
}

export default defineConfig({
  title: 'Craftorithm',
  base: '/Craftorithm-Docs/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  markdown: {
    lineNumbers: true,
  },

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      description: 'Minecraft 合成配方管理插件文档',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/' },
          { text: '配方', link: '/recipe/' },
          { text: '触发器', link: '/trigger/' },
          { text: '脚本', link: '/script/' },
          { text: '物品', link: '/item/' },
          { text: '配置', link: '/config/' },
          { text: 'UI', link: '/ui/' },
          { text: 'API', link: '/api/' },
        ],
        sidebar: zhSidebar,
        outline: {
          level: [2, 3],
          label: '页面导航',
        },
        lastUpdated: {
          text: '最后更新于',
        },
        docFooter: {
          prev: '上一篇',
          next: '下一篇',
        },
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索',
              },
              modal: {
                noResultsText: '未找到结果',
                resetButtonTitle: '清除查询',
                footer: {
                  selectText: '选择',
                  navigateText: '导航',
                },
              },
            },
          },
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      description: 'Craftorithm Minecraft Recipe Plugin Documentation',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Recipes', link: '/en/recipe/' },
          { text: 'Triggers', link: '/en/trigger/' },
          { text: 'Script', link: '/en/script/' },
          { text: 'Items', link: '/en/item/' },
          { text: 'Config', link: '/en/config/' },
          { text: 'UI', link: '/en/ui/' },
          { text: 'API', link: '/en/api/' },
        ],
        sidebar: enSidebar,
        outline: {
          label: 'On this page',
        },
        lastUpdated: {
          text: 'Last Updated',
        },
        search: {
          provider: 'local',
        },
      },
    },
  },

  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YufiriaMazenta/Craftorithm' },
    ],
    editLink: {
      pattern: 'https://github.com/YufiriaMazenta/Craftorithm/edit/master/docs/:path',
      text: '编辑此页',
    },
    footer: {
      message: '基于 GPL-3.0 许可证发布',
      copyright: 'Copyright © YufiriaMazenta',
    },
  },
})
