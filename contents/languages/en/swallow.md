## Swallow

A swallow is very smart.

### Tutorial

You can ask the swallow to move somewhere:

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
l -2.5,-2.1
```

And finally ask it to completely close
the current drawing path:

```
Z
```

Swallows can also draw arcs in the sky:

```
M0,15 l 2.0,-1 a2.5,2.5 -30 0,1 2.5,-1.5 l 2.0,-1 a2.5,5.0 -30 0,1 2.0,-1 l 1.0,-1 a2.5,7.5 -30 0,1 5.0,-2.5 l 1,-1 a2.5,10.0 -30 0,1 5.0,-2.5 l 5.0,-2.5 Z
```

And even do maths thank to
[Pierre Bézier](https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier),
a famous french engineer and Renault worker:

```
M1,2 C1,1 2.5,1 2.5,2 S4,3 4,2Z
M5,3 Q5,0.5 6,3 T10,2Z
```

Did you know that this tiny programming language is in fact a part of the [SVG (Scalable Vector Graphics)](https://en.wikipedia.org/wiki/SVG) image format specification called [SVG Path Data](https://www.w3.org/TR/SVG/paths.html)?
