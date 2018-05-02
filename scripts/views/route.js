page('/', (ctx, next) => 
  app.Meetups.fetchAll(() => app.meetupView.initIndexPage(ctx,next))
  // , (ctx, next) => app.adminView.verify(ctx, next)
);

page();