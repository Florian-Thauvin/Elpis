# Elpis
[![ELPIS - DEFAULT](https://github.com/Florian-Thauvin/elpis/actions/workflows/default.yml/badge.svg?branch=main)](https://github.com/Florian-Thauvin/elpis/actions/workflows/default.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Florian-Thauvin_elpis&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Florian-Thauvin_elpis)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Florian-Thauvin_elpis&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Florian-Thauvin_elpis)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Florian-Thauvin_elpis&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Florian-Thauvin_elpis)
[![wakatime](https://wakatime.com/@15ce2ca2-0fda-4831-b2ed-a77a19032e3b/projects/vibbvbatrj.svg)](https://wakatime.com/@15ce2ca2-0fda-4831-b2ed-a77a19032e3b/projects/vibbvbatrj)

## Objectif

L'objectif de ce projet est de gérer : 
- Les tâches à réaliser au cours d'un temps donné
- Les ressources humaines
- Compiler les données en un planning de type Gantt

## Hypothèses

Les hypothèses suivantes ont été mises en place :
- Les tâches sont estimées en effort. L'effort prend en compte la complexité de la tâche et le temps de réalisation. 
  - Exemple: Une tâche très complexe mais très courte peut avoir le même effort qu'une tâche simple mais très longue
- Les dépendances (aussi bien externes qu'internes) sont identifiées et tracées
- L'estimation donnée est valable à un temps T, avec des ressources données et dans un scope fixe. 
  - En cas de modification d'une de ses variables, l'estimation n'est plus valide
  
## Règles 
- Une tâche dont l'effort nécessaire pour sa réalisation est suppérieure au travail de trois personnes à temps plein ne sortira pas
  > Exemple: Si une team a une vélocité de 0,25 SP/j/personne, avec des sprints de 3 semaines (15 jours), elle ne pourra pas sortir des tâches ayant un effort de plus de 11,25 SP
- Tout bloquage ou dépendence externe non maîtrisé empêche la tâche de sortir. Si un bloquage est identifié et maîtrisé (i.e. avec une date de résolution fixe), la tâche (ou sous-tâche) concernée ne commencera pas avant la date de résolution.
- Si la finalisation d'une tâche a une marge correspondant à au moins 50% de l'effort nécessaire pour la sortir, elle est sûre de sortir.
  > Exemple: Si une tâche a un effort estimé de 4SP, avec une team ayant une vélocité de 0,25 SP/j/personne pour un sprint de 3 semaines, elle est certaine de sortir si l'estimation de fin a lieu (4SP / 2) x (1 / 0,25) = 8 jours.
