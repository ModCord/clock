# clock
A clock event loop too fire specific events when the cycle is past an unix timestamp.
Basically instead of having tens-hundreds of randomly instantiated timeouts, the clock simply cycles through the routines and emits an event with the initially passed data in a centralised location, increasing maintanability and possibily performance. 
