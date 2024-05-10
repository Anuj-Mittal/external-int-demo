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

  useEffect(() => {
    if (!sprComponentsMounted) {
      sprComponentsMounted = true;

      window.spr.integrations.init({
        getToken: () =>
          fetch("/api/getOTA")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              const { ota } = data;
              return ota;
            })
            .catch((error) => {
              console.error(
                "There was a problem with the fetch operation:",
                error
              );
            }),
      });

      caseDetailSprComponentRef.current = window.spr.integrations.command(
        "MOUNT",
        {
          component: "CASE_DETAIL",
          container: document.getElementById("caseDetailContainer"),
          props: { caseNumber: 864950, caseFilterKey: "caseNumbers" },
        }
      );

      ctiSprComponentRef.current = window.spr.integrations.command("MOUNT", {
        component: "CTI",
        container: document.getElementById("ctiContainer"),
        props: { caseNumber: "" },
      });

      guidedPathSprComponentRef.current = window.spr.integrations.command(
        "MOUNT",
        {
          component: "GUIDED_WORKFLOW",
          container: document.getElementById("guidedPathContainer"),
          props: {
            processDefinitionId: 574830,
          },
        }
      );
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
            caseDetailSprComponentRef.current.update({
              caseNumber,
              caseFilterKey: "caseNumbers",
            });
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
