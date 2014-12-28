var cats = require('./cats-page');

describe('cat view', function() {
  beforeEach(cats.navigate);

  it('should load the page', function() {
    expect(cats.h2Header.getText()).toEqual('Cats!');
    expect(cats.activeSidebarLink.getText()).toEqual('Cats!');
  });

  it('should show some cats', function() {
    cats.getCatRows().then(function(rows) {
      expect(rows.length).toBe(2);
      expect(rows[0].getText()).toContain('Morris');
      expect(rows[1].getText()).toContain('Spades');
    });
  });

  it('should show a form', function() {
    expect(cats.inputCatName.isPresent()).toBe(true);
    expect(cats.inputCatColor.isPresent()).toBe(true);
    expect(cats.addCatButton.isPresent()).toBe(true);
  });

  it('should filter to a cat', function() {});

  it('should add a cat', function() {});

  it('should delete a cat', function() {});
});
