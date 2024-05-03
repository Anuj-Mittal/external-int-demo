import { Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import { Card, Col, Row, Button, Popover, InputNumber } from "antd";
import { PhoneTwoTone } from "@ant-design/icons";

let sprComponentsMounted = false;

export const Layout = () => {
  const [isCtiVisible, setIsCtiVisible] = useState(false);
  const caseDetailSprComponentRef = useRef();
  const ctiSprComponentRef = useRef();
  const guidedPathSprComponentRef = useRef();

  // 7316716
  useEffect(() => {
    if (!sprComponentsMounted) {
      sprComponentsMounted = true;

      caseDetailSprComponentRef.current = window.spr.integrations.command(
        "MOUNT",
        {
          component: "CASE_DETAIL",
          container: document.getElementById("caseDetailContainer"),
          props: { caseNumber: 7316716 },
        }
      );

      ctiSprComponentRef.current = window.spr.integrations.command("MOUNT", {
        component: "CTI",
        container: document.getElementById("ctiContainer"),
        props: { caseNumber: "" },
      });

      // guidedPathSprComponentRef.current = window.spr.integrations.command(
      //   "MOUNT",
      //   {
      //     component: "GUIDED_PATH",
      //     container: document.getElementById("guidedPathContainer"),
      //     props: {
      //       actionDetails: {
      //         action: 51563,
      //       },
      //     },
      //   }
      // );
    }
  }, []);

  return (
    <Flex justify="start" gap="middle" style={{ padding: "40px" }}>
      <Flex vertical gap="middle" justify="flex-end">
        <div
          id="ctiContainer"
          style={{
            width: "340px",
            height: "560px",
            borderRadius: "10px",
            overflow: "scroll",
            opacity: isCtiVisible ? 1 : 0,
          }}
        />
        <Button
          style={{ width: "100px" }}
          icon={
            <PhoneTwoTone
              style={{
                transform: "scaleX(-1)",
              }}
            />
          }
          onClick={() => {
            setIsCtiVisible((v) => !v);
          }}
        >
          Phone
        </Button>
      </Flex>
      <div
        id="caseDetailContainer"
        style={{
          width: "600px",
          height: "700px",
        }}
      />
      <Flex vertical gap="middle">
        <InputNumber
          addonBefore="Case Number"
          onChange={(caseNumber) => {
            caseDetailSprComponentRef.current.update({ caseNumber });
          }}
        />
        <InputNumber
          addonBefore="Guided Path Id"
          onChange={(action) => {
            guidedPathSprComponentRef.current.update({
              actionDetails: {
                action,
              },
            });
          }}
        />
        <div
          id="guidedPathContainer"
          style={{
            width: "400px",
            height: "500px",
          }}
        />
      </Flex>
    </Flex>
  );
};
