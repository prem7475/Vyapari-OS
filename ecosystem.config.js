module.exports = {
  apps: [
    {
      name: 'vyapari-server',
      script: './src/server.js',
      cwd: './server',
      instances: 'max',
      exec_mode: 'cluster',
      interpreter: 'tsx',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
    {
      name: 'vyapari-web',
      script: 'npm',
      args: 'start',
      cwd: './apps/web',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
