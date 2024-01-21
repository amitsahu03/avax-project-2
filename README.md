# Voting Machine Smart Contract

## Overview

This Solidity smart contract represents a simple Voting Machine, allowing the registration of voters and recording votes for different parties. It is written in Solidity version 0.8.9.

## Features

- **Owner Functionality**: The contract owner has special privileges, such as registering new voters and casting votes on behalf of registered voters.

- **Voter Registration**: The contract allows the registration of new voters, ensuring they are at least 18 years old.

- **Voting**: Registered voters can cast their votes for a specified party code (ranging from 0 to 9999). Each voter is allowed to vote only once.

## Contract Variables

- **voteMapper**: A mapping that associates each voter's address with the party code they voted for.

- **hasVoted**: A mapping indicating whether a voter has already cast their vote.

- **voterRegister**: A mapping to keep track of registered voters.

- **owner**: The address of the contract owner.

## Constructor

The contract constructor sets the deployer's address as the owner of the contract.

## Modifiers

- **onlyOwner**: A modifier that restricts certain functions to be callable only by the owner of the contract.

## Functions

### RegisterNewVoter

Allows the owner to register a new voter.

### vote

Allows the owner to cast a vote on behalf of a registered voter.

### getContractAddress

Returns the contract's address.

## Project Setup Instructions

To run this project on your computer after cloning the GitHub repository, follow the steps below:

1. **Install Dependencies:**
   - Navigate to the project directory in the terminal.
   - Run the following command to install project dependencies:
     ```bash
     npm install
     ```

2. **Start Ethereum Node:**
   - Open two additional terminals in your Visual Studio Code or preferred code editor.

   - In the second terminal, start the local Ethereum node using Hardhat:
     ```bash
     npx hardhat node
     ```

3. **Deploy Smart Contract:**
   - In the third terminal, deploy the smart contract to the local Ethereum network:
     ```bash
     npx hardhat run --network localhost scripts/deploy.js
     ```

4. **Launch Front-end:**
   - Go back to the first terminal and start the front-end application:
     ```bash
     npm run dev
     ```

5. **Access the Project:**
   - The project will be accessible on your local machine, typically at [http://localhost:3000/](http://localhost:3000/).

Now, the project is successfully running on your localhost. Ensure to follow these steps in sequence for a smooth setup process.
