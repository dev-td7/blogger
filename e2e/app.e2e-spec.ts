import { BloggerPage } from './app.po';

describe('blogger App', () => {
  let page: BloggerPage;

  beforeEach(() => {
    page = new BloggerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
