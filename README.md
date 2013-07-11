beta
====

UAL beta website

This is the repo for the new [www.arts.ac.uk](www.arts.ac.uk) website.
The site is built using [Gridset](http://gridsetapp.com), parts of [Zurb Foundation 4.0](http://foundation.zurb.com/), plus a pick-and-mix of extra components.

Authors
------------

[Howard Panton](https://github.com/howardpanton), [Matt Wisbey](https://github.com/wisbey), [Pete Richardson](https://github.com/denovo), [Alastair Mucklow](https://github.com/strangerpixel)

Github setup
------------

* [Cheat sheet](http://rogerdudler.github.com/git-guide/files/git_cheat_sheet.pdf)
* [Git Reference](http://gitref.org/index.html) 

**Quick start**

`git clone https://github.com/artslondon/beta.git`
`cd beta`

At this point you should fork the artslondon repo into your own github account.

**Verify existing remote**

`git remote -v`

You should see:

-- origin	https://github.com/artslondon/beta.git (fetch)  
-- origin	https://github.com/artslondon/beta.git (push)  

**Update remote**

`git remote update`

-- Fetching origin  
-- From https://github.com/artslondon/beta  
-- * [new branch]      gh-pages   -> origin/gh-pages  
-- * [new branch]      master     -> origin/master  

**Checkout gh-pages branch**

`git checkout gh-pages`

-- Branch gh-pages set up to track remote branch gh-pages from origin.
-- Switched to a new branch 'gh-pages'

**Set a new remote**

`git remote add source https://github.com/yourusername/beta.git`

`git remote -v`

-- origin	https://github.com/artslondon/beta.git (fetch)  
-- origin	https://github.com/artslondon/beta.git (push)  
-- source	https://github.com/yourusername/beta.git (fetch)  
-- source	https://github.com/yourusername/beta.git (push)  


### Fork & pull process

* [Using pull requests](https://help.github.com/articles/using-pull-requests)

Before doing any work, make sure you have pulled down any changes from the origin repo:

`git pull origin gh-pages`

Make sure you're on the gh-pages branch:

`git branch`

-- *gh-pages  
-- master

Make changes, commit them, then push changes to your own remote:

`git push source gh-pages`

Now you can make a pull request via github.com.


## Javascript libraries used & descriptions 

A list of all libraries that are used on the UAL website. Please add to this list each time you add a new script to the Assets folder.


### [Modernizr](http://modernizr.com)

** used in _____ pages **

Modernizr is a JavaScript library that detects HTML5 and CSS3 features in the user’s browser. 
Used to provide fallback for browsers which don't support some of the latest features.

How it works
Modernizr runs quickly on page load to detect features; it then creates a JavaScript object with the results, and adds classes to the html element for you to key your CSS on. Modernizr supports dozens of tests, and optionally includes YepNope.js for conditional loading of external .js and .css resources.


### [response.js](http://responsejs.com)

** used in _____ pages **

Response is a jQuery plugin that provides tools for building performance-optimized, mobile-first responsive websites. Its breakpoint sets use HTML5 data attributes to dynamically swap markup based on breakpoints so that rich content can be served progressively. Its API includes cross-browser event hooks, HTML5 dataset, and ways to get or test responsive properties.


### [fitVid.js](http://fitvidsjs.com)

** used in _____ pages **

For fluid width video embeds - use to make videos responsive



### [Skrollr.js](https://github.com/Prinzhorn/skrollr)

** used on Camberwell homepage **

Scrolling animation library 


### [Selectivizr](http://selectivizr.com)

** used in _____ pages **

Selectivizr is a JavaScript utility that emulates CSS3 pseudo-classes and attribute selectors in Internet Explorer 6-8. Simply include the script in your pages and selectivizr will do the rest.


### [jquery.lazyload.js](https://github.com/tuupola/jquery_lazyload)

** used in _____ pages **

Lazy Load delays loading of images in long web pages. Images outside of viewport wont be loaded before user scrolls to them.


### [breakpoints.js](https://github.com/14islands/js-breakpoints)

** used in ___ pages **

library that syncs CSS media queries to breakpoint events in JavaScript. Helpful to change JavaScript logic for different screen sizes, resolutions or other media query features.

