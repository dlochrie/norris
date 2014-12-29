/**
 * Created by blewis on 12/19/14.
 */
goog.provide('norris.auth.User');

/**
 * @typedef {{
 *   id: (string|undefined),
 *   email: (string|undefined),
 *   role: ({bitMask:number, title:string})
 *   }} norris.auth.User
 */
norris.auth.User;