module.exports = {
    theme: 'yubisaki',
    title: 'HOME', 
    description: `vuepress blog`,
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }]
    ],
    base: '/blog/',
    repo: 'https://github.com/lewiscutey/vuepress-template',
    dest: './docs/.vuepress/dist',
    ga: '',
    serviceWorker: true,
    evergreen: true,
    themeConfig: {
        background: `/img/`,
        github: 'dkl520',
        logo: '/img/logo.png',
        background: '/img/bg.jpg',
        accentColor: '#ac3e40',
        per_page: 6,
        date_format: 'yyyy-MM-dd HH:mm:ss',
        tags: true,
        comment: {
            clientID: '',
            clientSecret: '',
            repo: '',  // blog of repo name
            owner: '',  // github of name
            admin: '', // github of name
            distractionFreeMode: false
        },
        nav: [
            {text: '博客', link: '/blog/', root: true},
            {text: '关于', link: '/about/'},
            {text: 'Github', link: 'https://github.com/lewiscutey'},
            {text: '标签', link: '/tags/', tags: true},
        ]
    },
    markdown: {
        anchor: {
            permalink: true
        },
        toc: {
            includeLevel: [1, 2]
        },
        config: md => {
            // 使用更多 markdown-it 插件！
            md.use(require('markdown-it-task-lists'))
            .use(require('markdown-it-imsize'), { autofill: true })
        }
    },
    postcss: {
        plugins: [require('autoprefixer')]
    },
}

