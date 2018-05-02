<<<<<<< HEAD
page('/', (ctx, next) => 
  app.Meetups.fetchAll(() => app.meetupView.initIndexPage(ctx,next))
  // , (ctx, next) => app.adminView.verify(ctx, next)
=======
page('/'
  , (ctx, next) => app.Meetups.initSearch(() => app.meetupView.initIndexPage(ctx, next))
>>>>>>> 80bc62ce240a06363fcc0e633d9e62b468649543
);
page();