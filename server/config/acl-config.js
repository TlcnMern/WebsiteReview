const Acl=require('acl');
const aclStore =require( '../helpers/acl-store');
const MongodbBackend = Acl.mongodbBackend;

const dbConnection=(dbConnection) => {
  const backend = new MongodbBackend(dbConnection, 'acl_');
  const acl = new Acl(backend);

  // Set roles
  acl.allow([
    {
      roles: 'user',
      allows: [
        {resources:'/users/editProfile',permissions:'put'},
        {resources:'/post/deleteComment',permissions:'*'}
      ]
    },
    {
      roles: 'admin',
      allows: [
        {resources:'/users/editProfile',permissions:'put'},
        {resources:'/post/deleteComment',permissions:'*'}
      ]
    }
  ]);

  aclStore.aclStore.acl = acl;
};


const checkPermissions=(req, res, next)=> {
  const aclStore=require('../helpers/acl-store');
  const acl=aclStore.aclStore.acl;
  if (req.profile) {
    acl.isAllowed(
      req.profile._id.toString(),'/users/editProfile/', req.method.toLowerCase(), (error, allowed) => {
        if (error) {
          console.log(error);
        }
        console.log(allowed);
        if (allowed) {
          console.log('Authorization passed');
          next();
        } else {
          console.log('Authorization failed');
          res.send({ message: 'Insufficient permissions to access resource' });
        }
      });
  } else {
    console.log('checkpermissions2');
    res.send({ message: 'User not authenticated' })
  }
}

module.exports={
  dbConnection,
  checkPermissions:checkPermissions
}