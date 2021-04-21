import { useEffect, useState } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { useNearWallet } from "near-react-hooks";

function App() {
  const tokenIds = ["nusdc", "nusdt", "ndai", "nweth", "banana", "avocado"];
  const [tokenData, setTokenData] = useState([]);

  const wallet = useNearWallet();

  useEffect(() => {
    Promise.all(
      tokenIds.map((id) =>
        wallet.account().viewFunction(`${id}.ft-fin.testnet`, "ft_metadata", {
          account_id: wallet.getAccountId(),
          amount: "1000",
        })
      )
    ).then((tokens) =>
      setTokenData(
        tokens.map((token, i) => ({
          ...token,
          id: `${tokenIds[i]}.ft-fin.testnet`,
        }))
      )
    );
  }, []);

  const mint = (token) => {
    return wallet.account().functionCall(token.id, "mint", {
      account_id: wallet.getAccountId(),
      amount: document.getElementById(token.id).value,
    });
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
    <form style={{ width: "20rem", margin: "auto" }}>
      {tokenData.map((token) => (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <img
            src={token.icon}
            alt={token.name}
            style={{ width: "3rem", marginRight: "1rem" }}
          />
          <TextField id={token.id} label={token.symbol} />
          <Button onClick={() => mint(token)}>+</Button>
        </Grid>
      ))}
    </form>
  );
}

export default App;
