module.exports = {
    apps: [
        {
            name: 'Learner',
            port: '2014',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
        },
    ],
}
