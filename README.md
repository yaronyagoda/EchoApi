# EchoApi
Installation

1. Git clone
2. cd EchoApi
3. node index.js [port_num]  (default is 3000)

There are 3 part

1. HTTP listener the listens to the POST requests: 
http://localhost:3000/echoApi/echo

Example Body:
{
	"time" : "1576441444287",
	"message" : "678"
}

Get the message and inserts it to the Sorted set while the weight is the timestamp - giving us a set sorted by timesamp. 
I am saving it as a Json with the message+ timestamp + uuid just to make sure it is completely uniq.

2. Worker that 
- Runs every second (configurable)
- Performs locking
- Gets all the messages in the sorted set which their weight is smaller than the current time
- Writes them into a message list
- Deletes them from the sorted set
- releases the lock

This way even if there are multiple servers only one worker can get from the sorted set at a time (I have verified)

3. echoer - listens on the messages list with a blockig pull blpop and print the message to the console
