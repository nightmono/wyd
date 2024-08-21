# wyd? 

**wyd?** is a productivity Discord bot that checks on how you're doing at regular intervals, keeping you focused and reminding you of the task at hand. 

## How it works

1. First you set your task using the `/start` command. You tell **wyd?** the task you want to complete and how long you think it'll take.  
   The current options are: unsure, 15 mins, 30 mins, 60 mins, and 180 mins.
2. Once you set your task you can start working. Every 15 minutes, **wyd?** will ping you and tell the time elapsed since you set your task.
3. You can also run `/status` to check this information at all anytime.
4. Once you have finished your task, use the `/finish` command. **wyd?** will tell how long you took to finish the task compared to the time you said it would take.

## TODO

- [ ] Store tasks in a database rather than a list
- [ ] Customisable interval
- [ ] More customisable time
- [ ] Add a finish task button to `/status` and interval message for easier use
- [ ] Add a variety of random sentence combinations
- [ ] Remember previously completed tasks
- [ ] Use previously stored data to generate stats/insights
- [ ] Message users directly rather than through the channel they set the task in
- [ ] Task queue feature where users can set multiple tasks that come after each other
