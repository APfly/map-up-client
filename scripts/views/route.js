page('/'
  , (ctx, next) => app.Meetups.fetchAll()
  // , (ctx, next) => app.adminView.verify(ctx, next)
);

page();