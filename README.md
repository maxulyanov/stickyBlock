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
      <td>Options at the beginning of a floating</td>
      <td><code>Object</code></td>
      <td>
        <code>'element': self</code>,<br>
        <code>'border': 'top'</code>,<br>
        <code>'offset': 0</code>
      </td>
    </tr>
    <tr>
      <td>start.element</td>
      <td>jQuery object (dom) to start floating</td>
      <td><code>jQuery_object</code></td>
      <td><code>self</code></td>
    </tr>
    <tr>
      <td>start.border</td>
      <td>Border start element <code>'top'</code> or <code>'bottom'</code></td>
      <td><code>String</code></td>
      <td><code>'top'</code></td>
    </tr>
    <tr>
      <td>start.offset</td>
      <td>Оffset in px before the start floating</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>end</td>
      <td>Options at the end of the floating</td>
      <td><code>Object</code></td>
      <td>
        <code>'element': null</code>,<br>
        <code>'border': 'top'</code>,<br>
        <code>'offset':  0</code>
      </td>
    </tr>
    <tr>
      <td>end.element</td>
      <td>jQuery object (dom) to the end of the floating</td>
      <td><code>jQuery_object</code></td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td>end.border</td>
      <td>Border end element <code>'top'</code> or <code>'bottom'</code></td>
      <td><code>String</code></td>
      <td><code>'top'</code></td>
    </tr>
    <tr>
      <td>end.offset</td>
      <td>Оffset in px before the end floating</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>top</td>
      <td>Offset top for state fixed</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>parent</td>
      <td>The global parent to which will be added style - <code>position: relative</code></td>
      <td><code>jQuery object</code></td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td>cache</td>
      <td>Сache values (it recommended only for static pages)</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>animate</td>
      <td><a href="#animation-effects">Animation effects</a></td>
      <td><code>String</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>wrapperClass</td>
      <td>Add class to the wrapper</td>
      <td><code>String</code></td>
      <td><code>''</code></td>
    </tr>
</table>

##Events
<code>sticky-block-start</code> - when an element begins to float<br>
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
Effects list:<br>
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
