const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/webreview',
    
  oauth: {
    google: {
      clientID: '185189707578-c9cj84i6p7cjnhgpglik4nda5f6r45eh.apps.googleusercontent.com',
      clientSecret: 'r9xosB6GZANmP4cpXnDPWgH-'
    }
  }
}

module.exports=config;
