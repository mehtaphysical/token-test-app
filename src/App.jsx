import { Button, TextField } from "@material-ui/core";
import { useNearWallet } from "near-react-hooks";
import { useEffect } from "react";

function App() {
  const tokenIds = ["usdc"];

  const wallet = useNearWallet();

  useEffect(() => {
    Promise.all(
      tokenIds.map((id) =>
        wallet.account().viewFunction(`${id}.ft-fin.testnet`, "ft_metadata", {
          account_id: wallet.getAccountId(),
          amount: "1000",
        })
      )
    ).then(console.log);
  }, []);

  const handleMintAll = () => {
    Promise.all(
      tokenIds.map((id) =>
        wallet.account().functionCall(`${id}.ft-fin.testnet`, "mint", {
          account_id: wallet.getAccountId(),
          amount: "1000",
        })
      )
    ).then(console.log);
  };

  if (!wallet.isSignedIn())
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => wallet.requestSignIn()}
      >
        Connect With NEAR Wallet
      </Button>
    );

  return (
    <form>
      <TextField label="nUSDC" />
    </form>
  );
}

export default App;
