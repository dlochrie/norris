goog.provide('norris.auth.Access');

goog.require('goog.array');
goog.require('goog.object');


/**
 * List of access levels.
 * @type {!Object.<string,string|!Array>}
 * @const
 * @private
 */
norris.auth.Access.LEVELS_ = {
  public: '*',
  anon: ['public'],
  user: ['user', 'admin'],
  admin: ['admin']
};


/**
 * List of user roles.
 * @type {!Array.<string>}
 * @const
 * @private
 */
norris.auth.Access.ROLES_ = ['public', 'user', 'admin'];


/**
 * Access roles object with the appropriate bitmasks and titles.
 * @const
 * @export
 */
norris.auth.Access.ROLES = (function(roles) {
  var bitMask = '01',
      intCode,
      rolesObj = {};

  goog.array.forEach(roles, function(role) {
    intCode = parseInt(bitMask, 2);
    rolesObj[role] = {
      bitMask: intCode,
      title: role
    };
    bitMask = (intCode << 1).toString(2);
  });

  return rolesObj;
})(norris.auth.Access.ROLES_);


/**
 * Access level object with the appropriate bitmasks.
 * @const
 * @export
 */
norris.auth.Access.LEVELS = (function(levels, roles) {
  var levelsObj = {};

  goog.object.forEach(levels, function(level) {
    if (goog.isString(level)) {
      if (level === '*') {
        var resultBitMask = '';
        goog.object.forEach(roles, function() {
          resultBitMask += '1';
        });

        levelsObj[level] = {
          bitMask: parseInt(resultBitMask, 2)
        };
      } else {
        console.log('Access Control Error: Could not parse "' + levels[level] +
            '" as access definition for level "' + level + '"');
      }
    } else if (goog.isArray(level)) {
      var resultBitMask = 0;

      goog.array.forEach(level, function(role) {
        if (goog.object.containsKey(roles, role)) {
          resultBitMask = resultBitMask | roles[role].bitMask;
        } else {
          console.log("Error: Could not find role '" + role +
              "' in registered roles while building access for '" +
              level + "'");
        }
      });
      levelsObj[level] = {
        bitMask: resultBitMask
      };
    }
  });

  return levelsObj;
})(norris.auth.Access.LEVELS_, norris.auth.Access.ROLES);
