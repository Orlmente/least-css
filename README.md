# CSS QUICK GUIDELINES (Do/Don't, Hints, Etc...)

## 1) DON'T F@#!ING NEST! (more than once)
Use sass/scss/less nesting wisely, don't abuse it!  
Nesting should be used only for modifiers or pseudos (elements/classes).  
2 levels deep nesting should be the max nesting depth, 3rd level is acceptable only for pseudos  

_The Less Specific A Selector Is, The Better And Faster It Is!_  

_The more you nest, the more you'll have to override and use !important, so please don't... just DON'T_ (see 1.a for another reason to avoid deep nesting)  

######Do:
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

######DO NOT:
    .first-selector {
        prop: val;
      
        .second-selector {
            ... {
                fourth-selector {
                    prop: hardly-overriddable;
                    // TOO DEEP HERE, I'M DROWING !1!important!
                }
            }
        }
    }

If you find youself nesting more than 3 times, then consider refactoring you styles.  
Nesting: this is not the feature you are looking for.


## 2) GO TO POINT #1!

## 3) WRITE EFFICIENT STYLE!

Writing light and efficient styles is not as simple as it can seems.
There are many factors that can affect browsers' performances when writing css, for example:

*   Misunderstanding of rendering engines, that leads to...
    *   Expensive and Unoptimized selectors
    *   Excessive Page Reflows
*   Duplicate properties
*   Unused/Orphanized code
*   Frameworks bloat
<!-- SEE IF SOMETHING IS MISSING IN THIS LIST -->

### 3.a) Of Browser And Styles Parsing, or, How Things Works In Real Life

Browsers parse styles in a counter intuitive way, when you write something like "#foo .bar .baz a" you may think it looks for "#foo" element, then select all ".baz" under ".bar" and in this shortened list of elements search for "a" tags, well, _IT DOES NOT_.  
Browsers will pick _EVERY_ "a" tag in the document, _THEN_ look for any occurrence under ".baz" class, within the list of every "a" under ".baz" class search for the occurrences that has ".bar" as parents and lastly they will sort out which ones are found under "#foo" element.
The way browsers handle selectors make a too specific one harder (and more expensive) to be parsed, so (while keeping an eye to the "less specific, the better..." rule) the rightmost selector _SHOULD_ always have the higher specificity in the chain  
<!-- PROOFREAD AND LOOK FOR MISSING THINGS -->

### 3.b) Of Selector Optimization, or, Even If ID Is The Fastest Selectors You Still Should Avoid Them

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
If you really want to use IDs, then just use them alone. But still I don't really see what couldn't be achieved without them.
<!-- PROOFREAD AND LOOK FOR MISSING THINGS -->

######Enters Ben Frain: “sweating over the selectors used in modern browsers is futile.”
_(you may have read it in some blogs or discussions)_  

<!-- EXPAND FRAIN'S THOUGHTS -->  
<!-- MENTION "LOBOTOMIZED OWL SELECTOR (* + *)" -->

### 3.c) Of Reflow And Repaint, or, Don't Waste Machine Resources

<!-- SOMETHING ABOUT REFLOW AND REPAINT -->  
<!-- WRITE ABOUT WHAT TRIGGER PAGE REFLOW AND WHAT TRIGGER PAGE REPAINT -->

### 3.d) Of Writing Efficient Styles, or, TL;DR

######tl;dr version

1. Don't nest deeper than 3 levels!
2. Don't abuse (even better don't use) IDs
3. Dont't overqualify selectors
4. Rightmost selector in a chain should always be the more specific one
5. Embrace KISS and DRY principles
6. ...<!-- FINISH WITH MISSING POINTS -->


## 4 DON'T MIX UNITS IN SAME PROPERTY

######Do:
    .foo {  
        margin: 10px 2px;  
    }  
    or  
    .foo {  
        margin: 10em 1em;  
    }

######DO NOT!:
    .bar {
        margin: 1rem 3em 2px;
    }

_Mixing different units in different properties is fine though, like em for fonts and px for sizes_

    .mixed {
        margin: 5px;
        font-size: 1.2em;
        // different units for different props
    }
<!-- THIS WHOLE SECTION COULD BE SPLITTED AND MOVED IN #3 SUBSECTIONS, THINK ABOUT IT -->

## 5 GENERAL HINTS

*   Always use spaces over tabs.
*   4 spaces indentation should be used (4 spaces is more readable than 2 imho and we are not under ruby envs)
*   Always put a single space between rightmost selector and opening bracket
*   Closing bracket must be placed on its own line (don't close blocks on last prop's line for god sake!)
*   Avoid trailing spaces at all costs
*   Write properties following a logic order, if you need to add a new prop to a block, insert it in the right place  
    like:
    1.   box-model
    2.   positioning
    3.   sizings (margins, borders, paddings, sizes)
    4.   fonts (family, metrics, colors)
    5.   backgrounds  
*   Comments with // will be removed upon compilation while /\*\*/ are preserved in expanded style, /\*! !\*/ are preserved in compressed output too (use the latter for copy or important headers)

##DO:

    // ordered props, logic order could always be swapped,
    // but should remain coherent through the whole style sheet
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

##DO NOT:

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

<!-- THIS WHOLE SECTION COULD BE SPLITTED AND MOVED IN #3 SUBSECTIONS, THINK ABOUT IT -->

## 6 COMPILING CMD LINE DIRECTIVES

SASS and LESS give you some intresting options and switches <!-- FINISH SENTENCE, TALK ABOUT PROS/CONS OF BOTH LESS AND SASS/SCSS -->

######cmd line for dev:

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

######cmd line for production:

    sass source:dest --style compressed

Typical output of that cmd is:

    html{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:62.5%}*,*:before,*:after{box-sizing:inherit}

