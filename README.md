# Joke CLI Tool

This command line tool is designed to bring laughter into your terminal by fetching jokes from the "icanhazdadjoke" API. It not only entertains you with humorous jokes but also allows you to save your favorite jokes for future laughs. Additionally, it features a leaderboard that showcases the most popular jokes based on user searches.

## Features

1. **Search for Jokes:**

   - Provide a search term as a command line argument to find jokes related to that term.
   - Utilizes the "icanhazdadjoke" API to fetch jokes.

2. **Random Humorous Messages:**

   - Displays random humorous messages along with the retrieved joke to add an extra layer of fun.

3. **Save Jokes:**

   - Saves the selected joke to a text file named `jokes.txt` for future enjoyment.

4. **Leaderboard:**
   - Pass "leaderboard" as a command line argument to view the most popular jokes based on user searches.
   - The leaderboard displays the top searched jokes along with the number of appearances.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd joke-cli-tool
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

- Run the tool with the following command:

  ```bash
  node index.js <searchTerm or "leaderboard">
  ```

## Examples

1. **Search for Jokes:**

   ```bash
   node index.js cat
   ```

2. **Display Leaderboard:**
   ```bash
   node index.js leaderboard
   ```

## Humorous Messages

**The tool includes various humorous messages to keep you entertained throughout the process.**

```

```
