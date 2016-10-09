
function afterLoad(nav, id) {
  nav.find('a[data-link-id="'+id+'"]').addClass('active');
  nav.slideDown(300);
};