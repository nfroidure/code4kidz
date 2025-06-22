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

The picture of the swallow you can see in this web site has been, in fact, made with this technology:

```
M 2.8391184,2.9369631 C 6.3823559,4.5331241 9.2961333,6.982801 1.659512,8.1546232 4.0345036,8.102028 4.8465744,8.5880083 2.1646368,10.512995 7.0071876,7.8201174 9.1425553,6.5367931 8.8753712,12.761968 9.5170335,11.617495 11.286338,7.691785 9.6411582,7.1174448 9.7715945,6.9617628 9.9672488,6.7093056 10.1061,6.4463293 10.381699,6.326412 10.581561,6.1602111 10.743555,5.9477262 10.560524,5.9056499 10.406945,5.895131 10.263886,5.8993386 10.259679,5.8404318 10.247056,5.7836291 10.219706,5.7331375 10.036675,5.3860088 9.2077732,5.4449154 8.9069284,5.4785765 9.0058076,3.77449 4.1354864,3.0152248 2.8391184,2.9369631 Z
```
