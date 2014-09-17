ko-dings
========

Bells & Whistles for Knockout JS

Some ideas provided by this great post :

## Current HTML attributes bindings

The following attributes bindings are added to Knockout.

* src
* href
* title
* alt
* width
* height
* placeholder
 
```html
    <img data-bind="src: mainVisual, alt: description, title: description, width: mainVisualWidth, height: mainVisualHeight">
```

## `className` binding

This new binding provides a custom syntax to bind a ViewModel attribute to a class name amongst a list of known values. 

```html
    <div class="product" data-bind="className: disponility[available|out-of-stock|pre-order]">
    </div>
```
