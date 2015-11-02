# CSS QUICK GUIDELINES

## 1 DON'T F@#!ING NEST! (more than once)
Use sass/scss/less nesting wisely, don't abuse it!  
Nesting should be used only for modifiers or pseudos (elements/classes).  
2 levels deep nesting should be the max nesting depth, 3rd level is acceptable only for pseudos  
_The more you nest, the more you'll have to override and use !important, so please don't... just DON'T_ (see 1.a for another reason to avoid deep nesting)  

######Do:
    .first {
        prop: value;
      
        .second {
            other-prop: value;
      
            &:hover {
                pseudo: foo;
                // MAX DEPTH LEVEL REACHED, STOP NESTING!
            }
        }
        &:focus {
            foo: bar;
        }
    }

######DO NOT:
    .first {
        prop: val;
      
        .second {
            ... {
                fourth {
                    prop: hardly-overriddable;
                    // TOO DEEP HERE, I'M DROWING !1!important!
                }
            }
        }
    }

### 1.a Of Browser And Styles Parsing

Browsers parse styles in a counter intuitive way, when you write something like "#foo .bar .baz a" you may think it looks for "#foo" element, then select all ".baz" under ".bar" and in this shortened list of elements search for "a" tags, well, _IT DOES NOT_.  
Browsers will pick _EVERY_ "a" tag in the document, _THEN_ look for any occurrence under ".baz" class, within the list of every "a" under ".baz" class search for the occurrences that has ".bar" as parents and lastly they will sort out which ones are found under "#foo" element.
The way browsers handle selectors make a too specific one harder (and more expensive) to be parsed, so the rightmost selector _MUST_ always have the higher specificity in the chain  

_The Less Specific A Selector Is, The Better And Faster It Is!_


## 2 DON'T USE IDs AS SELECTOR
to be written

## 3 USE CLASSES OVER TAGS, EVEN MORE THAN ONE PER TAG, THEY COST NOTHING

Classes are to be preferred over tag as selectors, 

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

## GENERAL HINTS

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

## COMPILING CMD LINE DIRECTIVES

SASS and LESS give you some intresting options and switches, 

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

