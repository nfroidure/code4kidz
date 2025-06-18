## Butterfly

Nothing stops a butterfly!

### Tutorial

You can ask the butterfly to move somewhere:
```
m 2.5,2.5
```

To draw a vertical line:
```
v2.5
```

And a horizontal one:
```
h2.5
```

Or any line:
```
l 2.5,2.1
```

You can also draw arcs:
```
a2.5,2.5 0 0,1 2,-1.5
```

And finally ask it to completely close
 the current drawing path:
```
Z
```

Fly away butterfly:
```
m5,5
a 1,1 300 0,1 -1,-1
a 1,1 300 0,1 -1,-1
m2,2
a 1,1 60 1,1 -1,-1
a 1,1 60 1,1 -1,-1
m3,3l7,7
```
