#Incubator Project

Elevator Pitch:
This project inspires Visionary IBM Executives to recognize when they have an innovation gap in their business unit, understand the Incubator program as a means to fill that innovation gap, and immediately contribute a viable project proposal.

#Changing Things
## Front End Settings
### Changing Dates
   The due dates live in the class of `.deadline`. You can do a search in the `index.html` file for DEADLINES. You should find a comment block, below which you will find the deadlines.

### Changing form fields
  All form field changes must contain a `name` property. Otherwise they will not be passed to the server. Any additional fields must also be added to the `client/scripts/app.js` file where the `ADD INPUTS HERE` comment is. they must be appeneded to the `formData` object.

  These changes will then need to be added to the `helpers.js` file in order to be added to the email

### Hamburger Menu
```HTML
<div>
  <ul id='full-menu'>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
  </ul>
</div>

<div id="collapsed-menu">
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
  </ul>
</div>

<div id="overlay"></div>

<div class="wrapper">
  ... rest of your html
</div>

```

The max-width and the number in the `calc` function should be the same

```CSS
 #collapsed-menu{
   ...
   top:50px; //menu/navbar height
   z-index:101;
   position:fixed;
   max-width:300px;

   @include calc(left, "100% + 300px");
   @include transition(left, 0.6s);
 }

 #overlay{
  display:none;
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background-color: black;
  opacity:0.6;
  z-index:50;
 }

 //~~~~ SASS MIXINS ~~~~
 @mixin transition($transition...) {
     -moz-transition:    $transition;
     -o-transition:      $transition;
     -webkit-transition: $transition;
     transition:         $transition;
 }

 @mixin calc($property, $expression) {
   #{$property}: -webkit-calc(#{$expression});
   #{$property}: calc(#{$expression});
 }



```

### Custom Scrolling and Menu

``` HTML
  <!-- element you want to trigger scroll -->
  <button data-chapter-target="one"></button>
  <button data-chapter-target="two"></button>
  ...
  <!-- element you want to scroll to -->
  <div data-chapter="one"></div>
  ...
  <div data-chapter="two"></div>
```

### Custom Jquery function
  Note
  Found in `client/vendor/custom.js`

  The viewModel contains preferences for how interactions are handled on the client. The only can be changes are:

  - animationTime //=> animation time of menu
  - roundingOffset //=> number of pixels to go INTO the chapter
  - menuOffset //=> height of the menu

#### Tabbed
##### HTML Markup
must have `data-tab-target`, can be any kind of element

```HTML
    <!-- the thing you want to control the tab -->
    <ul>
      <li data-tab-target="one" class="active">
        <p>one</p>
      </li>
      <li data-tab-target="two">
        <p>two</p>
      </li>
      <li data-tab-target="three">
        <p>three</p>
      </li>
    </ul>
```

thing to tab. Make sure active classes match.
```HTML
    <div data-tab="one" class="active">
      ...
    </div>
    <div data-tab="two">
      ...
    </div>
    <div data-tab="three">
      ...
    </div>
```
##### Initialization

tabbing interaction types can be modified by adding the interaction to the settings object, and then passing the name of that settings into the initialization. Must be given a value, there is no default.
`$('[data-tab-target]').tabbed('tabToggle')`

#### jaccordion
##### HTML
The thing that you want to expand and contract (accordion body), must be the element directly below the accordion header

```HTML
<div class="container" data-accordion="accordion">
  <div class="active" data-accordion-target="one">
    accordion header
  </div>
  <div class="active" data-accordion="one">
    accordion body
  </div>
  <div class="active" data-accordion-target="two">
    accordion header 2
  </div>
  <div class="active" data-accordion="two">
    accordion body 2
  </div>
</div>
```
##### Initialize
  where callback is a function to be run once the accordion animation is complete.

 `$('[data-accordion="accordion"]').jaccordion(callback)`



## Server Settings
`server/settings.js` file that can be altered. You are able to change the:
  - Default Sender if one isn't provided
  - Default Target Email: who the email will go to
  - Any additional recipients of the email
  - Email subject line

If you would like to change how the email looks or is output. Go to the `server/helpers.js` file and you can manipulate it there. Currently (11/6/15) the Keys coming from the inputs are:
  - name
  - unit
  - sender
  - sponsor
  - problem
  - user
  - impact




## Getting Started
### For Developers

installing the node modules
```
$ npm install
```
Sass mixins are available should you wish to use them.

