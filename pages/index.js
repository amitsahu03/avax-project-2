import { useState, useEffect,useRef } from "react";
import { ethers } from "ethers";
import amitKumarWalletAbi from "../artifacts/contracts/Assessment.sol/VotingMachine.json"

export default function HomePage() {
  const [amitWallet, setAmitWallet] = useState(undefined);
  const [amitAccount, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  const registerAddrRef = useRef();
  const ageRef = useRef();
  const voteAddrRef = useRef();
  const partyCodeRef = useRef();

  const contractAddress = "0xD9020c84eF2209323204484ab58106773e686303";
  const atmABI = amitKumarWalletAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setAmitWallet(window.ethereum);
    }

    if (amitWallet) {
      try {
        const accounts = await amitWallet.request({ method: "eth_accounts" });
        accoundHandler(accounts);
      } catch (error) {
        console.log("error", error)
      }
    }
  };

  const accoundHandler = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No amitAccount found");
    }
  };


  const connectToMetamask = async () => {
    if (!amitWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await amitWallet.request({ method: "eth_requestAccounts" });
    accoundHandler(accounts);

    // once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(amitWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const registerNewVoter = async () => {

    const addr = registerAddrRef.current.value;
    const age = Number(ageRef.current.value);
    console.log(addr,age);

    if( !addr ){
      alert('address is required');
      return;
    }

    try {
      if (atm) {
        let tx = await atm.RegisterNewVoter(addr,age);
        await tx.wait();

        registerAddrRef.current.value = '';
        ageRef.current.value = 0;
        console.log(`NEW VOTER REGISTERED WITH ADDRESS ${addr}`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
    }
  };

  const vote = async () => {

    const addr = voteAddrRef.current.value;
    const partyCode = Number(partyCodeRef.current.value);

    console.log(addr,partyCode)

    try {
      if (atm) {
        let tx = await atm.vote(addr,partyCode);
        await tx.wait();

        console.log(`VOTER WITH ADDRESS : ${addr} HAS VOTED TO PARY WITH CODE : ${partyCode}`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error)
    }


  };



  useEffect(() => {
    getWalletAddress();
  }, []);


  return (
    <main className="container">
      <header>
        <h1>Voting Machine</h1>
      </header>
      <div className="content">
        {!amitAccount ? (
          <button onClick={connectToMetamask}>Initialize Voting Machine</button>
        ) : (
          <>
            <div className="button-group">

              <div className="btn-input">
                <button onClick={registerNewVoter}>Register New Voter</button>
                <div>
                  <input ref={registerAddrRef} type="password" placeholder="Voter Address"></input>
                  <input ref={ageRef} type="number" placeholder="Age"></input>
                </div>

              </div>

              <div className="btn-input">
                <button onClick={vote}>Vote</button>
                <div>
                  <input ref={voteAddrRef} type="password" placeholder="Address"></input>
                  <input ref={partyCodeRef} type="number" placeholder="Amount"></input>
                </div>
              </div>


            </div>
          </>
        )}
      </div>
      <style jsx>{`body {
  background-color: #2c3e50;
  color: #ecf0f1;
}

main {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(to right, #3498db, #2ecc71);
  color: #ecf0f1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.btn-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1em;
}

input {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2c3e50;
  color: #ecf0f1;
  border: 1px solid #3498db;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.2s, transform 0.2s;
  margin: 0.4em;
}

.btn-input > div {
  display: flex;
}

.container {
  text-align: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to bottom, #2c3e50, #34495e);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: #ecf0f1;
}

header {
  margin-bottom: 30px;
  font-size: 36px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 8px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  display: block;
  padding: 10px 20px;
  font-size: 16px;
  background: orange;
  color: #ffffff;
  border: 1px solid #e74c3c;
  font-weight: bold;
  cursor: pointer;
  width: 20vw;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background 0.2s;
}

button:hover {
  transform: scale(1.05);
  background: lime;
}
`}</style>
    </main>
  );
}
