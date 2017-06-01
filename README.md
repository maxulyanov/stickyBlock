stickyBlock
===============
This is make any block floating on your page easily

## Getting started
1. Include jQuery
2. Include stickyBlock
3. Call stickyBlock with your options after window load
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

## Options
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
        <code>'element':self</code>,<br>
        <code>'border':'top'</code>,<br>
        <code>'offset':0</code>
      </td>
    </tr>
    <tr>
      <td>start.element</td>
      <td>jQuery object (dom) starts floating</td>
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
        <code>'element':null</code>,<br>
        <code>'border':'top'</code>,<br>
        <code>'offset':0</code>
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
      <td>Offset top during the floating</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>parent</td>
      <td>Sets the parent of which is targeted to be absolute positioning for the final position of the current element .
If none of the parent element does not have a <code>position: relative</code> - is the recommended setting to ignore.</td>
      <td><code>jQuery object</code></td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td>cache</td>
      <td>Сache options (it recommended only for static pages)</td>
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
    <tr>
      <td>returnToInitialState</td>
      <td>To return to the initial state. Function must return true</td>
      <td><code>Function</code></td>
      <td><code>null</code></td>
    </tr>
</table>

## Events
Events list:<br>
<code>sticky-block-start</code> - when an element begins floating<br>
<code>sticky-block-end</code> - when the element reaches the limit<br>
<code>sticky-block-default</code> - when the element returns to its original position
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

## Methods
<code>destroy</code> - remove element from stickyBlock
```html
<script>
    $('.js-float-block').stickyBlock('destroy');
</script>
```

## Animation effects
Effects list:<br>
 <code>You must connect - jquery.sticky-block-animate.css for animation</code> 
- fadeIn
- fadeInDown
- bounceInDown
- bounceIn
- slideInDown
- zoomInDown
- flipInX
- flipInY

## Browser Support
All modern browsers and IE9+ (animation effects IE10+)

## Example
See example - <a href="https://m-ulyanov.github.io/stickyblock/demo/">stickyBlock</a>
