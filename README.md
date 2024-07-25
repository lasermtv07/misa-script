# misascript
a WIP programming language written in vanilla JS
## IR
still WIP, too. 
### Instructions:
- `label` - defines a label to which you can jump
- `let` - creates/sets the value of a variable, You can use `{1,2,3}`.. to define arrays,
`&var` to create a reference, `*var` to set to the same value as different variable and you can ofcourse also create booleans, scalars and strings
- `add/sub/mul/div/mod t a b` - do the corresponding arithmetic operations (`t` - target variable, `a` input 1, `b` input two, rules apply the same as for let)
- `push a` - pushes data onto stack, same rules as for let apply
- `pop a` - removes data from stack and saves it into a variable
- `equ/neq/lt/gt t a b` - compares integer values from `a` and `b`, saves boolean result to `t`
- `not t a` - does the javascript **not** operation to `a` and saves result to `t`
- `and/or t a b`- des the **and/or** binary operation between two variables
- `jmp a` - jumps to specific address or label
- `cmp a` - if the variable **a** is false, ignore following operation
