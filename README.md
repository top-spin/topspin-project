# TopSpin

TopSpin is a table tennis tournament generator and social media website. This was a group project written in Vue using Vuetify. The database used was PostgreSQL and image upload/storage was handled with Amazon AWS S3, API Gateway, and Lambda products. It was designed to help keep track of play and make it easy for members of an organization to set up a tournament with 2, 4, 8, or 16 players.

Features include a live chat using sockets, notifications of a new tournament, dynamic statistics and win rate, ELO ranking system for players, followers/ following, and a search including Google Maps to find other players near you. 
 ![landing page](http://i66.tinypic.com/351h6k6.png)
## Logging in

First, the user creates an account and logs in to the site with their info using Auth0.
From there, the user is directed to the dashboard which shows their statistics, top players, recent matches, and upcoming tournaments. 
![dashboard](http://i68.tinypic.com/2vacwg2.png)
## Creating a tournament

Creating a tournament is straightforward and begins with entering the information such as name, description, date, and size for the tournament. After that, there will be suggested players to select from based on who you follow or you can search from all players in the search bar. Once all players are submitted, you will have to wait for the players to accept the tournament to proceed to start it.  The edit players button will allow you to replace players in case someone declines.  After the tournament has started you can enter scores and submit each round. 

## How ranking is calculated

All players are given a numerical rating value of 1000 when they first start. However, this rating changes as they play others and is calculated by an ELO system.

What this means is, 
"Players with higher ELO rating have a higher probability of winning a game than a player with lower ELO rating. After each game, ELO rating of players is updated. If a player with higher ELO rating wins, only a few points are transferred from the lower rated player. However if lower rated player wins, then transferred points from a higher rated player are far greater."

After ratings are calculated for each match in a tournament, they are sorted in descending order to give us the ranking for the players in our system. Players cannot see the numerical rating but can see their change in ranking compared to others. 

## Development Challenges 

A major challenge when developing TopSpin was creating the algorithms for the tournament bracket and figuring out the logic for all the matches. When the first round is created, players need to be paired up by their rating against others with different skill levels. This proved to be difficult thing to implement although it seems to work flawlessly behind the scenes for the use. 

Another challenge was basically learning the Vue framework within the two weeks we had to develop the project. Previously, all of the team had only been working in React JS and this was the first dive into a new framework. There was a little learning curve but everyone was able to pick it up in a few days. We chose to use Vue because it seemed like a good opportunity to learn new technologies and wanted to push ourselves. 


 ![tournament view](http://i64.tinypic.com/nl3lns.png)
![chat feature](http://i66.tinypic.com/676vdt.png)
![followers](http://i64.tinypic.com/4ibern.png)

