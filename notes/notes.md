# Setup Saas
-- since different node-sass versions are compatible with different node.js version, refer doc for which node-sass version to install.        
    $ npm install node-sass@[version]

### Introduction

-- node-sass is a library.  
-- It gives binding for node.js to libsass which is a C version of the stylesheet preprocessor -> Sass.  
-- It allows to natively compile .scss files to .css files.

### How to store .scss files ?

-- create a folder named "Styles" and keep all styling files in there with extension .scss .

### Usage

-- We can write modular stylesheet for our components.  
-- EX: for player component -> _player.scss (this is called partial )  
-- Here, we can write style rules for player component and then import it into our main/app.scss file.        

    @import "./_CurrentSong.scss";    
    @import "./_Player.scss";      



# Font Awesome | React

- Guide: [ Font Awesome React Installation ](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react#get-started)
