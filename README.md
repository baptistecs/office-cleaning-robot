# ROBOT CLEANER

## Table of content

- [ROBOT CLEANER](#robot-cleaner)
  - [Introduction](#introduction)
  - [Prerequisite](#prerequisite)
  - [Build the app](#build-the-app)
  - [Run the app in a production environment](#run-the-app-in-a-production-environment)
  - [Run the app in a development environment](#run-the-app-in-a-development-environment)
  - [Test](#test)
  - [TODO](#todo)

## Introduction

The app should take an instruction file in order to command a robot.
Once the robot is done with all the commands, the app should return the cleaned area (deducing the multiple passages on the same area).

The first line in the instruction file contains the number of commands (integer).

The second line contains the starting coordinates (two integers separated by a space).

The following lines contain the commands (a capital letter for the compass direction, N, S, E, W and an integer for the number of steps, both values are separated by a space).

[⇧ Table of content ⇧](#table-of-content)

## Prerequisite

- Open a terminal and go to the `office-cleaning-robot` directory:

`cd path/to/office-cleaning-robot`

[⇧ Table of content ⇧](#table-of-content)

## Build the app

- Build the app (generate Node.js files from Typescript sources):

`yarn build`

You can optionally use `yarn _build` instead to skip the tests and the lint scripts but it's bad practice.

## Run the app in a production environment

- Follow the [Prerequisite](#prerequisite) section

- Follow the [Build the app](#build-the-app) section

- Run the app with the default instruction file:

`yarn start`

Or by specifying an instruction file:

`yarn start file=./data/cleaning-instruction-10000.txt`

Or directly without using yarn:

`node . file=./data/cleaning-instruction-10000.txt`

[⇧ Table of content ⇧](#table-of-content)

## Run the app in a development environment

- Follow the [Prerequisite](#prerequisite) section

- Run nodemon to watch for file changes:

`yarn watch`

You can optionally use `yarn _watch` instead to skip the tests and the lint scripts but it's bad practice.

- Edit the files in the `src` folder.

- You can run the app without watching for changes by running:

`yarn dev`

Or by specifying an instruction file:

`yarn dev file=./data/cleaning-instruction-10000.txt`

Or directly without using yarn:

`node_modules/.bin/ts-node src/index.ts file=./data/cleaning-instruction-10000.txt`

[⇧ Table of content ⇧](#table-of-content)

## Test

- Follow the [Prerequisite](#prerequisite) section

- Run Jasmine-ts:

`yarn test`

[⇧ Table of content ⇧](#table-of-content)

## TODO

- Split Map2d addLine method in two methods "addHorizontalLine" and "addVerticalLine" and update addLine for using those
- Implement "onMoveHorizontal" and "onMoveVertical" callbacks in the Robot constructor so we can call directly the Map2d previous methods
- Add test coverage report generation
- Display logs (warn & error) only if process.env.NODE_ENV == 'development'

[⇧ Table of content ⇧](#table-of-content)
