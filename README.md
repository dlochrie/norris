norris
======

Walker, Texas Ranger

This project aims to provide a baseline example of how to use AngularJS with the Google Closure Compiler.

It is a work in progress.

## Features:  

 * Angular Components (controllers, directives, services, etc) that (1) are optimized for the Closure Compiler, and (2) adhere as closely as possible to the [Angular Style Guide](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html), and the [JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).
 * Compiled JS with strongly typed properties for performance and accuracy.
 * Compiled/Cached templates to minimize Ajax/HTTP requests.
 * Provide Testing coverage with Jasmine, the Karma Runner, and Sinon for spies.
 * Provide End-to-End Testing Converage with Protractor.
 * Much more.

There is nothing new here. This project just assembles the components, and offers an example application.

## Rationale:

To come up with a clear example of how to build a clean, fast, highly-scalable front-end applications with AngularJS and Google Closure. The objective is to do so with as few dependencies as possible, such as skipping popular build/automation/minification libraries/frameworks such as Grunt, Gulp, and Bower. This is not always possible, but the goal is to keep the library as light as possible so that others may be incorporated as necessary/needed.

Google Closure provides us with an excellent compiler, linting tools, and a rich library full of utilities that you can pull into your code without pulling the rest of the library with it.

## Building / Running

### Closure Compiler

The publicly available Google Closure Compiler that you will find [here](http://dl.google.com/closure-compiler/compiler-latest.zip)
has been recompiled to NOT rename properties.

For example, using the following property _could_ be renamed:

    function SomeFunction() {
      this.someProperty = 'Some Value';
    }


Because of this, the workaround was to use the following syntax:

    function SomeFunction() {
      this.['someProperty'] = 'Some Value';
    }

...which didn't look/feel right at all.

So that the compiler would skip property renaming (but hold onto other advanced optimizations), the compiler was recompiled with the
the following change:

    # This:

    options.setRenamingPolicy(
        VariableRenamingPolicy.ALL, PropertyRenamingPolicy.ALL_UNQUOTED);

    # Became This:

    options.setRenamingPolicy(VariableRenamingPolicy.ALL,
      PropertyRenamingPolicy.OFF);


### Compiling the JavaScript source code

To Compile the JS _and_ the Template Cache:

    make dependencies

To Start the Express server:

    npm start

Build Prerequisites (this is done when you `make dependencies`):

    npm run-script template-cache

...More to come.
