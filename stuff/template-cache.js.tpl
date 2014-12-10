goog.provide('norris.templates');

/**
 * Template Cache
 * @param {!angular.$templateCache} $templateCache Angular template cache factory
 * @ngInject
 */
norris.templates = function($templateCache){
  <% _.forEach(templates, function(template) { %>
  $templateCache.put('<%= template.path %>','<%= template.contents %>');
  <% }); %>
};
