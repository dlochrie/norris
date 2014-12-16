goog.provide('norris.auth.AuthService');



/**
 * The Auth service.
 * @param {!angular.$cookieStore} $cookieStore The Angular Cookie Store Service.
 * @param {!angular.$http} $http The Angular HTTP Service.
 * @param {!angular.$log} $log The Angular Logging Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.auth.AuthService = function($cookieStore, $http, $log) {
  $cookieStore.remove('user');

  this.roles_ = this.buildRoles_(norris.auth.AuthService.ROLES_);

  this.levels_ = this.buildLevels_(norris.auth.AuthService.LEVELS_,
      this.roles_);

  this.currentUser_ = {
    username: '',
    role: this.roles_.public
  };
};


/**
 * List of access levels.
 * @type {!Object}
 * @private
 * @const
 */
norris.auth.AuthService.LEVELS_ = {
  'public' : '*',
  'anon': ['public'],
  'user' : ['user', 'admin'],
  'admin': ['admin']
};


/**
 * List of user roles.
 * @type {!Array.<string>}
 * @private
 * @const
 */
norris.auth.AuthService.ROLES_ = ['public', 'user', 'admin'];


/**
 * Generate roles
 * @private
 * @return {!Object}
 */
norris.auth.AuthService.prototype.buildRoles_ = function(roles) {
  var bitMask = '01',
      rolesObj = {},
      intCode;

  roles.forEach(function(role) {
    intCode = parseInt(bitMask, 2);
    rolesObj[role] = {
      bitMask: intCode,
      title: role
    };
  });

  return rolesObj;
};


/**
 * @private
 * @return {!Object}
 */
norris.auth.AuthService.prototype.buildLevels_ = function(levels, roles) {
  var levelsObj = {},
      level,
      resultBitMask,
      role;

  for (level in levels) {
    if (typeof levels[level] === 'string') {
      if (levels[level] === '*') {
        resultBitMask = '';

        for (role in roles) {
          resultBitMask += '1';
        }

        levelsObj[level] = {
          bitMask: parseInt(resultBitMask, 2)
        };
      } else {
        console.log('Access Control Error: Could not parse "' + levels[level] +
            '" as access definition for level "' + level + '"');
      }
    } else {
      resultBitMask = 0;
      for (role in levels[level]) {
        if (userRoles.hasOwnProperty(levels[level][role])) {
          resultBitMask = resultBitMask |
              userRoles[levels[level][role]].bitMask;
        } else {
          console.log("Error: Could not find role '" + levels[level][role] +
              "' in registered roles while building access for '" +
              level + "'");
        }
      }
      levelsObj[level] = {
        bitMask: resultBitMask
      };
    }
  }

  return levelsObj;
};


norris.auth.AuthService.prototype.authorize = function(level, role) {
  if (role === undefined) {
    role = currentUser.role;
  }
  return level.bitMask & role.bitMask;
};

norris.auth.AuthService.prototype.isLoggedIn = function(user) {
  if (user === undefined) {
    user = currentUser;
  }
  return user.role.title === this.roles_.user.title ||
      user.role.title === this.roles_.admin.title;
};

norris.auth.AuthService.prototype.register = function(user) {
  $http.post('/register', user).success(function(res) {
    changeUser(res);
    success();
  }).error(error);
};

norris.auth.AuthService.prototype.login = function(user) {
  $http.post('/login', user).success(function(user) {
    changeUser(user);
    success(user);
  }).error(error);
};

norris.auth.AuthService.prototype.logout = function() {
  $http.post('/logout').success(function() {
    changeUser({username: '', role: ''});
    success();
  }).error(error);
};
