// Binding for ioredis
module.exports = {
  mapping: {
    host: 'host',
    username: 'username',
    password: 'password',
    type: '',
    clusterIP: ''
  },
  transform: (binding) => {
    binding.url = `mongodb://${binding.username}:${binding.password}@${binding.host}`;
  }
};
