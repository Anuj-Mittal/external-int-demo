import { Flex } from "antd";
import { useEffect, useRef } from "react";
import { Card, Col, Row } from "antd";
import { InputNumber } from "antd";

let sprComponentsMounted = false;

export const Layout = () => {
  const caseDetailSprComponentRef = useRef();
  // 7316716
  useEffect(() => {
    if (!sprComponentsMounted) {
      sprComponentsMounted = true;

      caseDetailSprComponentRef.current = window.spr.integrations.command(
        "MOUNT",
        {
          component: "CASE_DETAIL",
          container: document.getElementById("caseDetailContainer"),
          props: { caseNumber: "" },
        }
      );
    }
  }, []);

  return (
    <Flex
      align="start"
      justify="center"
      style={{ padding: "50px" }}
      gap="middle"
    >
      <Card title="Case Details" bordered={true}>
        <div
          id="caseDetailContainer"
          style={{
            width: "500px",
            height: "600px",
          }}
        />
      </Card>
      <div
        style={{
          width: "300px",
        }}
      >
        <InputNumber
          addonBefore="Case Number"
          onChange={(caseNumber) => {
            caseDetailSprComponentRef.current.update({ caseNumber });
          }}
        />
      </div>
    </Flex>
  );
};
