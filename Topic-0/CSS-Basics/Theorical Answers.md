### CSS - Exercise 2.3.6
Simply adding a   ```

    * {  
     font-weight: 400;  
    }
      
would be enough, because i didn't specify any font-weight before, i don't need to override any rule


### CSS - Exercise 2.3.7
The only way to override inline styles is with the   ```!important```
 keyword on a rule, because inline styles has one level more of specificity than the IDs.  
 Inline-styles specificity are ```1-0-0-0```.  
 In this case we'll need to aply the following rule to override the inline-style  
 ```
 .oh-no-inline-styles[style] {
  background: green !important;
}