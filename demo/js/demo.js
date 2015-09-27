
function afterLoad(nav, id) {
  console.log(nav)
  nav.find('a[data-link-id="'+id+'"]').addClass('active');
  nav.slideDown(300);
};