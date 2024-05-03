let sprComponentMounted = false;

export const CaseDetail = () => {
  if (!sprComponentMounted) {
    window.spr.integrations.command("mount", {
      component: "CASE_DETAIL",
      container: document.getElementById("root"),
      props: { caseNumber: "7316716" },
    });
  }
  return null;
};
