stickyBlock
===============
Easily make any block floating on your page.

##Getting started
1. Include jQuery
2. Include stickyBlock
3. Call stickyBlock his options after window load

```html
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/jquery.sticky-block.js"></script>
<script>
    $(window).load(function() {
      $('.js-float-block').stickyBlock({
        'top': 20,
        'end': {
          'element': $('.footer'),
          'offset': 20
        }
      });
    });
    </script>
```

##Options
Options list:
<table>
    <tr>
      <th>Name</td>
      <th>Description</th>
      <th>Type</th>
      <th>Default Value</th>
    </tr>
    <tr>
      <td>start</td>
      <td>-</td>
      <td><code>Object</code></td>
      <td><code>'element': self,'border': 'top','offset': </code></td>
    </tr>
    <tr>
      <td>start.element</td>
      <td>-</td>
      <td><code>jQuery object</code></td>
      <td><code>self</code></td>
    </tr>
    <tr>
      <td>start.border</td>
      <td>-</td>
      <td><code>String</code></td>
      <td><code>'top'</code></td>
    </tr>
    <tr>
      <td>start.offset</td>
      <td>-</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>end</td>
      <td>-</td>
      <td><code>Object</code></td>
      <td><code>'element': null,'border': 'top','offset': 0</code></td>
    </tr>
    <tr>
      <td>end.element</td>
      <td>-</td>
      <td><code>jQuery object</code></td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td>end.border</td>
      <td>-</td>
      <td><code>String</code></td>
      <td><code>'top'</code></td>
    </tr>
    <tr>
      <td>end.offset</td>
      <td>-</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>top</td>
      <td>-</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>parent</td>
      <td>-</td>
      <td><code>jQuery object</code></td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td>cache</td>
      <td>-</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>animate</td>
      <td>-</td>
      <td><code>String</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>wrapperClass</td>
      <td>-</td>
      <td><code>String</code></td>
      <td><code>''</code></td>
    </tr>
</table>

##Events
<code>sticky-block-start</code> -when an element begins to float<br>
<code>sticky-block-end</code> - when the element reaches the limit<br>
<code>sticky-block-default</code> - when the element returns to its original location
```html
<script>
    $('.js-float-block').on('sticky-block-start', function() {
    console.log('start');
    });
    
    $('.js-float-block').on('sticky-block-end', function() {
    console.log('end');
    });
    
    $('.js-float-block').on('sticky-block-default', function() {
    console.log('default');
    });
</script>
```

##Methods
<code>destroy</code> - remove element from stickyBlock
```html
<script>
    $('.js-float-block').stickyBlock('destroy');
</script>
```

##Animation effects
Effects list:
 <code>For animation you must connect - jquery.sticky-block-animate.css</code> 
- fadeIn
- fadeInDown
- bounceInDown
- bounceIn
- slideInDown
- zoomInDown
- flipInX
- flipInY

##Browser Support
All modern browsers and IE9+ (animation effects IE10+)

##Example
See example - <a href="https://m-ulyanov.github.io/stickyblock/demo/">stickyBlock</a>
