ko-dings
========

_Bells & Whistles for Knockout JS_

Some ideas provided by this great post :  
[10 Knockout Binding Handlers I Don't Want To Live Without](http://tech.pro/blog/1863/10-knockout-binding-handlers-i-don-t-want-to-live-without)

Obviously.. there is more to come..

## 1. Current HTML attributes bindings

The following attributes bindings are added to Knockout.

* src
* href
* title
* alt
* width
* height
* placeholder
 
```html
    <img data-bind="src: mainVisual, 
         alt: description, title: description, 
        width: mainVisualWidth, height: mainVisualHeight">
```

## 2. `className` binding

This new binding provides a custom syntax to bind a ViewModel attribute to a class name amongst a list of known values. 

```html
    <div class="product" data-bind="className: disponility[available|out-of-stock|pre-order]">
    </div>
```
