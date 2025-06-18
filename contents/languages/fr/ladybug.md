## La coccinelle

La coccinelle flotte dans l’air. Les nombres décimaux n’ont pas de secrets pour elle.

### Tutoriel

La coccinelle peut se déplacer de façon plus fine :

```
m 2.5,2.5
```

Et dessiner des lignes verticales partielles :

```
v2.5
```

Horizontales :

```
h2.5
```

Ou n’importe quelle ligne :

```
l -2.5,-2.1
```

Pour finalement fermer son chemin en cours :

```
Z
```

Elle peut, par exemple, dessiner des pointillés :

```
m 2.5,2.5
h 0.5 m 0.5,0 h0.5 m0.5,0 h0.5 m0.5,0 h0.5
m0,0.5 v0.5 m0,0.5 v0.5 m0,0.5 v0.5
```
