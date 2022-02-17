# TicTacToe

This was a practice project focused on encapsulation, modules, factory functions and closure.
The ideas was to have as least as possible global code.

The flow is simple, an starting input to choose the player's names. After that, click start and the board will appear. 
Play the game and be prompted with either a winning or tie message. There is restart button to play again, can be used in the middle of the game as well.


I decided to create a module for the board, which is a dictionary. This way I was able to easily identify winning situations and avoid ilegal moves.
After that I created a 'Display' module that would take care of the different visual effects related to the game board and the different prompts.

The third module is called 'Rules', and it englobes all the functions dedicated to check the winning situations, change the player turn, etc.

What was difficult for me in this project was to find the way to refactor, as I was thinking of the game as a linear application, but building a website, 
I needed to change my mind to 'Event-Driven' programming. As the user might want to restart the game at any time, for example.

After I adopted this new point of view, it was easy to clean the code and leave the least possible global code.
