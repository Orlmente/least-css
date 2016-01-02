# CSS QUICK GUIDELINES (Do/Don't, Hints, Etc...)

## 1) DON'T F@#!ING NEST! (more than once)
Use sass/scss/less nesting wisely, don't abuse it!  
Nesting should be used only for modifiers or pseudos (elements/classes).  
2 levels deep nesting should be the max nesting depth, 3rd level is acceptable only for pseudos or modifiers  

_The Less Specific A Selector Is, The Better And Faster It Is!_  

_The more you nest, the more you'll have to override and use !important, so please don't... just DON'T_ (see 3.a for another reason to avoid deep nesting)  

###### Do:
    .first-selector {
        prop: value;
      
        .second-selector {
            other-prop: value;
      
            &:hover {
                pseudo: foo;
                // MAX DEPTH LEVEL REACHED, STOP NESTING!
            }

            &.modifier-class {
                modifier-prop: value;
                // THIS IS ACCEPTABLE (yes, in this case eve addjoin!)
            }
        }
        &:focus {
            foo: bar;
        }
    }

###### DO NOT:
    .first-selector {
        prop: val;
      
        .second-selector {
            ... {
                .fourth-or-more-selector {
                    prop: hardly-overriddable;
                    // TOO DEEP HERE, I'M DROWING !1!important!
                }
            }
        }
    }

If you find youself nesting more than 3 times, then consider refactoring you styles.  
Nesting: this is not the feature you are looking for.
----

## 2) GO TO POINT #1!
----

## 3) WRITE EFFICIENT STYLE!

Writing light and efficient styles is not as simple as it can seems.
There are many factors that can affect browsers' performances or project mantainability when writing css, for example:

*   Misunderstanding of rendering engines, that leads to...
    *   Expensive and Unoptimized selectors
    *   Excessive Page Reflows
*   Duplicate properties
*   Unused/Orphanized code
*   Frameworks bloat


### 3.a) Of Browser And Styles Parsing, or, How Things Works In Real Life

Browsers parse styles in a counter intuitive way, when you write something like "#foo .bar .baz a" you may think it looks for "#foo" element, then select all ".baz" under ".bar" and in this shortened list of elements search for "a" elements, well, _IT DOES NOT_.  
Browsers will pick _EVERY_ "a" element in the document, _THEN_ look for any occurrence under ".baz" class, within the list of every "a" under ".baz" they will look for the occurrences that has ".bar" as parent, and lastly they will sort out which ones are found under a "#foo" element.  
The way browsers handle selectors make a too specific one harder (and more expensive) to be parsed, so, while keeping an eye to the "less specific, the better..." rule, the rightmost selector _SHOULD_ always have the higher specificity in the chain.  


### 3.b) Of Selector Optimization, or, Even If ID Is The Fastest Selectors You Still Should Avoid It

Different selectors have different speeds, IDs are the fastest while * (universal) is the slowest.  

    #foo {   }              /* ID (Fastest) */
    body.bar #foo {   }     /* ID */
    .bar {   }              /* Class */
    ul li a.baz {   }       /* Class *
    ul {   }                /* Tag */
    ul li a {  }            /* Tag */
    * {   }                 /* Universal (Slowest) */
    #foo [title='home']     /* Universal */

So, why don't use IDs?  
Short answer: 
*'Coz you don't know how to properly use them!*  
Long answer: 
In order to get benefit from ID's speed you should assign _every single element the page a unique ID_, and then _apply style using single ID selectors_. This will probably be extremely non-semantic and will lead you to a valley of blood and tears in terms of maintainability and readability.  
Common use for IDs is the following:

    #foo .bar {...} /* Bad! */
    #foo li {...} /* Even Worse! */

This is a very unoptimized selector, not for the slower right part but for the useless # on the left. Browser rtl parsing scheme first will select _ALL_ the elements in the DOM and only then will look for the ones inside #foo.  
If you really want to use IDs, then just use them alone. But still there's nothing that couldn't be achieved without them.

### 3.c) Of Stuff You Might Know, or, Some Useful Principles And Methods

###### KISS & DRY principles
KISS stands for *Keep It Short [and] Simple* (or _Keep It Simple Stupid_). Kiss is a design principle whose goal is to avoid unneccessary complexity to a project. The main concept is the fact that the simplier the components (or the tasks) are, the less they may fail or generate bugs.  
DRY stands for *Don't Repeat Yourself*. Dry is a software development principle that aims to reduce repetition of all kind. It's particulary usefull in css where, if dry is not followed, the stylesheet soon become a huge list of classes and rules with the same proprerties and values.  

###### Enters Ben Frain: “sweating over the selectors used in modern browsers is futile.”
_you may have read it somewhere in the interwebz (or may not)_  
Frain did some tests with modern browsers to see how slower selectors impact performances, and he saw that nowadays there is no reason to avoid them, _BUT_ that does not mean you can write messy selectors without paying the price. As stated above (and for sure will do below) the toll is in terms of mantainability, reusability and simplicity to override rules.  

###### The "Lobotomized Owl Selector" (* + *)
The Lobotomized Owl was introduced by Heydon Pickering and is an axiomatic selector whose main goal is to style the more writing the less.

    // this applies to all elements in a list but the first one
    * + * {
        margin-top: 1.5em;
    }

    // to write an exception just add a scope selector
    .compact * + * {
        margin-top: 0.75em;
    }

    // to reset it, not to harm third party styles use a reset wrapper
    .reset > * {
        margin-top: 0;
    }

or, if you don't want to go berserker on every element you can use to a specific element like:

    // book like justified paragraphs
    p {
        text-align: justify;
    }
    p + p {
        margin-top: 2em;
        text-indent: 2em;
    }

When used to normalize spacings of between the elements is a very powerful tool, because it applies only to block elements while inline elements' margin won't be affected.

The main flaw of this approach is his own strength, using the universal selector, it targets everything, so it will surely generate side effects if introduced later in a project. Also, the reset itself could blow up thirdy party style.

###### :not() And Quantity Queries
Another way to write less code to do more job is writing by excetpions. Instead of override properties when exceptions shows up, why not just make them the default behaviour and override all the others at once?  
From that point of view a better way to achieve the same goal of the owl selector is to combine the logic :not() with quantity queries.

normal approach:

    .selector {
        margin-top: 1.5em;
    }
    .selector:first-child {
        margin-top: 0;
    } 

better approach:

    .selector:not(:first-child) {
        margin-top: 1.5em;
    }

This approach is also more conservative than the lobotomized owl, then generates less side effectes.  


<!-- PROOFREAD AND LOOK FOR MISSING THINGS -->

### 3.d) Of Things To Keep In Mind, or, General Hints And Tips For Better Readability And Faster Writing

###### Stylesheet formatting rules
*   Always use spaces over tabs.
*   4 spaces indentation should be used (4 spaces is more readable than 2 and we are not under ruby envs)
*   Always put a single space between rightmost selector and opening bracket
*   Always put a single after the colon and property values
*   Closing bracket must be placed on its own line (don't close blocks on last prop's line for god sake!)
*   Avoid trailing spaces at all costs
*   Write properties following a logic order, if you need to add new props to a block, insert them in the right place  
    ie:
    1.   box-model
    2.   positioning/layering (position, z-index)
    3.   sizings (margins, borders, paddings, sizes)
    4.   fonts (family, metrics, colors)
    5.   backgrounds  
*   Comments with // will be removed upon compilation while /\*\*/ are preserved in expanded style, /\*! !\*/ are preserved in compressed output too (use the latter for copy or important headers)

###### DO:

    // ordered props, logic order could always be swapped,
    // but should remain consistent through the whole stylesheet
    // ie:
    // if you put font's props first, then always put them first!
    .foo {
        box-sizing: border-box;

        position: relative;
        z-index: 1;

        margin: 0 auto;
        border: 1px solid red;
        padding: 5px 10px;
        width: 50%;
        height: auto;
        line-height: 1;

        font-family: Sans-serif;
        font-size: 1.2rem;

        text-transform: uppercase;
        letter-spacing: 0.5em;

        background: transparent url('foo/bar/baz.svg') no-repeat scroll 50%;
        background-size: cover;
    }

###### DO NOT:

    // class filled in random order...
    .bar {
        font-size: 1rem;
        width: 50%;
        font-family: Sans-serif;
        margin: 0 auto;
        position: absolute;
        top: 5px;
        line-height: 1;
        text-transform: uppercase;
        padding: 5px 10px;
    }


###### Don't Mix Units In Same Property
Never use different units inside the same property, it generates caos and is difficult to read.

###### DO:
    .foo {  
        margin: 10px 2px;  
    }  
    or  
    .foo {  
        margin: 10em 1em;  
    }

###### DO NOT!:
    .bar {
        margin: 1rem 3em 2px;
    }

_Mixing different units in different properties is fine though, like em for typography and px for sizings_

    .mixed {
        margin: 5px;
        font-size: 1.2em;
        // different units for different props
    }

### 3.e) Of Reflow And Repaint, or, Don't Waste Machine Resources

_...to be expanded..._
<!-- SOMETHING ABOUT REFLOW AND REPAINT -->  
<!-- WRITE ABOUT WHAT TRIGGER PAGE REFLOW AND WHAT TRIGGER PAGE REPAINT -->

### 3.f) Of Writing Efficient Styles, or, TL;DR

###### tl;dr version

1. Don't nest deeper than 3 levels!
2. Don't abuse (even better don't use) IDs
3. Dont't overqualify selectors
4. Rightmost selector in a chain should always be the more specific one
5. Embrace KISS and DRY principles
6. ...
7. Profit!

_...to be expanded..._
<!-- FINISH WITH MISSING POINTS -->
----


## 4 COMPILING CMD LINE DIRECTIVES

SASS and LESS give you some intresting options and switches...
_...to be expanded..._
<!-- FINISH SENTENCE, TALK ABOUT PROS/CONS OF BOTH LESS AND SASS/SCSS -->

###### cmd line for dev:

    sass --watch source:dest --line-numbers --sourcemap=none --style expanded
_Imho --line-numbers is to be preferred over source maps in dev mode, inspecting outputted styles is easier done that way just looking at the css file without having to use browsers' devtools_  
Typical output of that cmd is:

    /* line 2, ../../../styles/global/_setup.scss */
    html {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: 62.5%;
    }

    /* line 11, ../../../styles/global/_setup.scss */
    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

###### cmd line for production:

    sass source:dest --style compressed

Typical output of that cmd is:

    html{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:62.5%}*,*:before,*:after{box-sizing:inherit}

_...add citations, useful links, notes, etc..._
