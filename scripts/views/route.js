// page('/'
//   , (ctx, next) => app.Meetups.initSearch(() => app.meetupView.initIndexPage(ctx, next))
// );

page('/mymeetups', ctx => app.meetupView.initMyMeetupsPage())
page();