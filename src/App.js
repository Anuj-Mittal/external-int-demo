import { useState } from "react";
import { Button } from "antd";
import { CaseDetail } from "./CaseDetail";
import { Layout } from "./Layout";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  if (isReady) {
    return (
      <>
        <Layout />
      </>
    );
  }

  return (
    <Button
      id="button"
      onClick={() => {
        setIsReady(true);
      }}
    >
      Add Sprinklr Components
    </Button>
  );
};

export default App;
