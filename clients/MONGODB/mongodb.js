// Binding for mongodb client
module.exports = {
  mapping: {
    user: { connectionOptions: { auth: 'user' } },
    password: { connectionOptions: { auth: 'password' } },
    host: 'host',
    port: 'port',
    srv: 'srv',
    type: ''
  },
  transform: (binding) => {
    let userPassword = '';
    if (binding.connectionOptions &&
        binding.connectionOptions.auth &&
        binding.connectionOptions.auth.user) {
      const encodedUser =
        encodeURIComponent(binding.connectionOptions.auth.user);
      let encodedPassword = '';
      if (binding.connectionOptions.auth.password) {
        encodedPassword =
          encodeURIComponent(binding.connectionOptions.auth.password);
      }
      userPassword = `${encodedUser}:${encodedPassword}@`;
    }
    if (binding.srv === 'true') {
      binding.url = `mongodb+srv://${userPassword}${binding.host}`;
    } else {
      let port = '';
      if (binding.port) {
        port = `:${binding.port}`;
      }
      binding.url = `mongodb://${userPassword}${binding.host}${port}`;
    }
  }
};
