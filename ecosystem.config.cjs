module.exports = {
    apps: [
        {
            name: 'Learner',
            port: '3014',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
        },
    ],
}
