describe('MovieDash', function() {
  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it ('should redirect to landing page', function () {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain('/#/landing');
  }, 2000);

  it ('should contain input box', function() {
    var input = element(by.css('button'));
    expect(input.isEnabled()).toBe(false);
  });

  it ('input box should be disabled on invalid input', function() {
    element(by.model('zip')).sendKeys(123);
    expect(element(by.css('button')).isEnabled()).toBe(false);
  });
});