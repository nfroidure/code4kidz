# Code 4 Kidz

This project is aimed to bring coding challenges to kids
but by writing real code with their keyboard.

My opinion is that coding is not a drag and drop skill
so instead of making programming easier with no code,
I made easier languages with increasing challenges.

The languages are designed to draw, leading to funny
coding challenges. They are heavily inspired by
[SVG path data](https://www.w3.org/TR/SVG/paths.html)
which makes it a good introduction to vector drawing.

Another challenge can be to make coding golfs trying to
reproduce a picture with the less code possible
(the amount of chars used in the program is reported).

The whole work provided here is released under [Creative Commons Attribution-NonCommercial license](https://creativecommons.org/licenses/by-nc/4.0/).

Each languages implementation requires:

- an [Ohm](https://github.com/ohmjs) grammar,
- a skin / configuration (with the various names, colors, pictures required),
- an interpreter to draw results (and expected ones),
- a comparator to check programs similarity (to validate results),
- a set of programs (drawings) for kids to reproduce.

I hope you find it useful, feel free to add your own
challenges, I’ll try to keep the online version up
to date.

## Design

I’m not a designer, but I can do things with a few tools:

- color Palette done with [Coolors](https://coolors.co/114b5f-456990-c4cbca-f45b69-6b2737),
- logo done with Inkscape,
- animals downloaded here.

## Development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, generate the formulas:
```bash
npm run ohm:types
```

First, run the development server:

```bash
npm run dev
```

Open [http://code4kidz.localhost:3000](http://code4kidz.localhost:3000) with your browser to see the result.

### Deploy

This project is a static one, see GitHub Workflows in this project to know the recipe.
