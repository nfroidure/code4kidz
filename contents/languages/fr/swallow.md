## L’hirondelle

L’hirondelle est très intelligente.

### Tutoriel

Tu peux déplacer l’hirondelle :

```
m 2.5,2.5
```

Dessiner des lignes verticales :

```
v2.5
```

Horizontales :

```
h2.5
```

Des lignes :

```
l 2.5,2.1
```

Des arcs de cercle :

```
a2.5,2.5 0 0,1 2,-1.5
```

Et comme l’hirondelle aime les mathématiques, elle peut dessiner des courbes, grâce à
[Pierre Bézier](https://fr.wikipedia.org/wiki/Pierre_B%C3%A9zier),
un fameux ingénieur français qui travaillé chez Renault :

```
M1,2 C1,1 2.5,1 2.5,2 S4,3 4,2Z
M5,3 Q5,0.5 6,3 T10,2Z
```

Et enfin, fermer le chemin tracé :

```
Z
```

Savais-tu que ce petit language de programmation est enfait une partie du format d'image [SVG (Scalable Vector Graphics)](https://fr.wikipedia.org/wiki/SVG) appelée [SVG Path Data](https://www.w3.org/TR/SVG/paths.html) ?
