module.exports = new function() {
  /**
   * Navigates to the Cats Page.
   */
  this.navigate = function() {
    browser.get('http://localhost:3000/#cats');
  }

  /**
   * Returns a promise resolving to all the cats rows.
   * @return {!angular.$q.Promise} Promise with rows.
   */
  this.getCatRows = function() {
    return element.all(by.repeater('cat in cats'));
  }

  /**
   * H2 Header element at the top.
   * @type {!angular.JQLite}
   */
  this.h2Header = element(by.css('[ui-view] h2'));

  /**
   * Sidebar link on the left.
   * @type {!angular.JQLite}
   */
  this.activeSidebarLink = element(by.css('.norris-sidebar li.active a'));

  /**
   * "Name" form input in the table.
   * @type {!angular.JQLite}
   */
  this.inputCatName = element(by.model('editCat.name'));

  /**
   * "Color" form input in the table.
   * @type {!angular.JQLite}
   */
  this.inputCatColor = element(by.model('editCat.color'));

  /**
   * Button for adding a new Cat.
   * @type {!angular.JQLite}
   */
  this.addCatButton = element(by.buttonText('+'));
}
