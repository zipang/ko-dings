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

## 2. `toggleClass` binding

An even simpler binding that toggle a simple class name on a boolean value.

In its simplest form, the binding looks for an observable or property with the same name of the class that must be toggled.

```html
    <div class="product" data-bind="toggleClass: available">
    </div>
```

In a slightly more sophisticated form, the binding looks for the name of the accessor betwwen the brackets after the name of the class to toggle.

```html
    <div class="product" data-bind="toggleClass: available[inStock]">
    </div>
```
