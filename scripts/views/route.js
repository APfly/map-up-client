page('/'
  , (ctx, next) => app.Meetups.initSearch()
  // , (ctx, next) => app.adminView.verify(ctx, next)
);

page();