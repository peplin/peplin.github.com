---
title: Threephase (The Game)
subtitle: A browser-based electric power system game
permalink: /2011/05/threephase/
featured_image: /images/threephase/threephase-hero
---

{% include picture_tag.html path="/images/threephase/threephase-inner-leader" alt="Power lines in front of sky and cell phone tower" %}

*This post is part of a series describing the [Threephase](/2011/05/threephase/)
project.*

Threephase is a conceptual web browser-based game simulating the electric power
generation and transmission system. The project was prototyped over a two month
period beginning in September 2010, to satisfy the graduate project requirement
for Master's in Information Networking (MSIN) candidates at the [Information
Networking Institute](http://www.ini.cmu.edu) of Carnegie Mellon University
(CMU).

This article is an abridged version of the
[final report](/files/threephase/report.pdf),
reformatted for the web and with some (less formal) comments and reflections
added. I've split it up into a few posts:

* [Game Objects](/2011/05/threephase-game-objects/)
* [Game Mechanics](/2011/05/threephase-mechanics/)
* [Time](/2011/05/threephase-time/)
* [Implementation](/2011/05/threephase-implementation/)
* [Evaluation](/2011/05/threephase-time/)

The primary inspiration for Threephase was the class "The Engineering &
Economics of Power Systems" offered at CMU in the Spring of 2010. The class
introduced core power system concepts and discussed many of the issues effecting
the utilities today. From my perspective as a computer scientist and video
gamer, the available computer simulations for learning these concepts had room
for expansion and improvement.

The power system is a growing, popular concern of which the complexity is not
well understood by non-experts. The simulations and teaching tools currently
available aren't sufficiently accessible and modern to attract people from
outside the industry. Threephase is an attempt to balance between the artistic,
playful and technical elements to create an immersive virtual world for
experimentation and learning.

From conception to implementation, the design shifted in a few ways in response
to the demands of the web-based user interface. The nature of the web protocol
HTTP also presented unique challenges to a real-time game, and Threephase
applies some novel techniques to find scalable solutions.

## Source Code

The game's source code is provided under an MIT open source license at
[GitHub](https://github.com/peplin/threephase).

## Acknowldgements

This project would not have been possible without the assitance of my advisors
and professors at CMU. The course I mentioned was taught by:
Dr. Lester Lave
(who sadly passed away shortly after the completion of this project),
[Dr. Marija Ilić](http://www.ece.cmu.edu/~milic/) and Dr. Jovan Ilić.

The advisors for this project in particular were
[Dr. Jay Apt](https://www.cmu.edu/tepper/faculty-and-research/faculty-by-area/profiles/apt-jay.html)
and [Dr. Gabriela Hug](http://www.ece.cmu.edu/directory/details/4617).

## Current Player Actions & Abilities

In the current version of Threephase, players can:

* Create new games and choose attributes for the game
* Join existing games that have already started
* Build city-local generators from a list of available types and a range of
    capacities
* View marginal price of electricity over time
* View marginal cost of each generator over time
* View marginal price of each type of fuel

Once the objects are created, the current version of the backend can:

* Calculate market price for each fuel based on supply and demand
* Automatically assign the optimal operating level for each generator
* Order generators based on marginal cost or average cost
* Deduct operating costs (cost of fuel, cost of workforce, etc.) over a time
    period from a player's cash
* Add customer payments (based on marginal price of electricity) over a time
    period to a player's cash
* Calculate marginal price for rate of return regulation
* Calculate marginal price for marginal cost bidding regulation, assuming a
    vertical demand curve
* Discount generator operating costs based on map geology
* Trigger random equipment failures (rate determined by generator attributes) -
    equipment repair is notably not yet implemented

## Background

Now more than ever, the consumption and generation of electricity are on the
minds of policy makers and concerned citizens alike. Green power, smart grids,
and the renewed popularity of nuclear energy seem like obvious solutions to
increasing efficiencies, so the lack of implementation momentum puzzles many
people outside the industry. The most (and nearly only) visible change in the
past decade to consumers is the shift from incandescent to CCFL light bulbs -
hardly revolutionary.

Since the widespread restructuring of the power system in the early 1970's, the
complexity of power economics has surpassed the understanding of most people,
including the politicians charged with deciding the future of the system itself.
The engineering problems are also non-intuitive to those without an electrical
engineering background. For example, despite the hype, wind power alone is not
the ultimate solution to the world's energy and environmental issues, but this
isn't communicated to or well understood by laypeople. There is an opportunity
for educating the public and increasing awareness of the tough realities of the
power system.

### Computer & Video Games

The power system is frequently included in computer and video games, dating at
least back to Maxis' SimCity of 1989 (and the version that I played, SimCity
2000. Electricity appears even earlier in board games, where controlling the
power & water utilities in Monopoly garnered players a key advantage. More
recently, the German board game [Power
Grid](http://www.riograndegames.com/games.html?id=5) used the power system as
its core game mechanic.

{% include picture_tag.html path="/images/threephase/simcity" alt="SimCity 2000 game screenshot" %}

Electricity transmission surfaced as a game mechanic in recent computer games as
well, such as [Darwinia](http://www.introversion.co.uk) and the new massively
multiplayer game [Love](http://www.quelsolaar.com/love). In both games,
protecting transmission lines from attack and malfunction is a key objective.

![Darwinia](/images/threephase/darwinia.jpg)

[Source](http://www.introversion.co.uk)

{% include picture_tag.html path="/images/threephase/love" alt="Love game screenshot" %}

[Source](http://www.quelsolaar.com/love)

On the other end of the spectrum, the current power system teaching tool used at
Carnegie Mellon University,
[Gipsys](https://www.ece.cmu.edu/~nsf-education/software.html), excels in the
technical but isn't approachable enough to engage those with a passing interest.
Since this project started, IBM released a web-based city planning serious game,
[CityOne](http://gamesforcities.com/database/cityone-a-smarter-planet-game/), which asks players to make public policy decisions to improve
efficiency in their virtual city. IBM's take on serious games is unfortunately
less of a challenging, immersive virtual world and more of a marketing tool.

![Gipsys](/images/threephase/gipsys.png)

The frequent appearance of the electrical system in games is not a coincidence -
the concepts of generation and transmission fit well with strategy gameplay. The
games market is ripe for a serious game that combines popular fascination with
an idealized power system and the often troublesome state of engineering and
economics in the actual industry. This game could be used for both education and
casual enjoyment.

### Concept

Threephase tries fill the remaining gap, and balance between the artistic, the
playful and the technical. A new generation of gamers is being formed online, by
the likes of [Zynga's](http://www.zynga.com/) Farmville, Frontierville and Mafia
Wars. These gamers are comfortable with having a persistent, virtual world in
the games they play. They are accustomed to games lasting days or months, and
even those without a set endpoint. Unfortunately, few of these games challenge
players to learn or think creatively. They are a missed opportunity to show a
wide audience the positive effects of gaming firsthand.

The goal of Threephase is to be approachable by a lowest common denominator of
people who understand technology, use the web and are willing to play a game (or
already do). Each player is handed control of a state-wide utility company and
tasked with generating enough power to meet customer demand. Each player
operates in a game world shared with other players, where the repercussions of
energy decisions in one state can be felt by many others.

*Continue to the next section on
[game objects](/2011/05/threephase-game-objects/).*

![Transformer on Utility Pole](/images/threephase/threephase-logo.jpg)

## Other Threephase Articles

* [Game Objects](/2011/05/threephase-game-objects/)
* [Game Mechanics](/2011/05/threephase-mechanics/)
* [Time](/2011/05/threephase-time/)
* [Implementation](/2011/05/threephase-implementation/)
* [Evaluation](/2011/05/threephase-time/)
