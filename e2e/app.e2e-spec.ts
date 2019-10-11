import { RetailmasterNewPage } from './app.po';

describe('retailmaster-new App', () => {
  let page: RetailmasterNewPage;

  beforeEach(() => {
    page = new RetailmasterNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
