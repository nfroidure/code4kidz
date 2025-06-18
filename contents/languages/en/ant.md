## Ant

The ants are always hardworking. This one is no different.
It is just filling pixels one by one.

And you, do you prefer working hard, or working well?

### Tutorial

You can tell the Ant to fill a pixel that way (note that the first pixel has a `0,0` coordinate):

```
P 2,2
```

You can also give it many pixels to fill:

```
P 1,1 1,2 1,3 1,4 2,1 3,1 2,3
```

And use relative coordinates:

```
p 1,1 0,1 0,1 0,1 1,0 1,0
```

You can, of course, mix relative and absolute commands:
```
p 1,1 0,1 1,1 1,1 1,1 1,0
P 8,1 8,2 7,3 6,4
P 3,7 6,7
```

Can you write your name ?

```
P 1,1 1,2 1,3 1,4 2,4 3,4
P 5,1 5,2 5,3 5,4
P 7,1 8,1 9,1 9,2 8,3 7,4 8,4 9,4
P 11,2 12,1 13,2 11,3 11,4 13,3 13,4 12,3
```
