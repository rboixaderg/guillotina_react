import React from "react";
import { TabsPanel } from "../components/tabs";
import { ContextToolbar } from "../components/context_toolbar";
import { PanelItems } from "../components/panel/items";
import { TraversalContext } from "../contexts";
import { PanelProperties } from "../components/panel/properties";
import { PanelPermissions} from "../components"
import { PanelBehaviors } from "../components";


const tabs = {
  Items: PanelItems,
  Properties: PanelProperties,
  Behaviors: PanelBehaviors,
  Permissions: PanelPermissions
};

const tabsPermissions = {
  Items: "guillotina.ViewContent",
  Properties: "guillotina.ViewContent",
  Behaviors: "guillotina.ModifyContent",
  Permissions: "guillotina.SeePermissions"
};

export function FolderCtx(props) {
  const ctx = React.useContext(TraversalContext);
  const calculated = ctx.filterTabs(tabs, tabsPermissions);

  return (
    <TabsPanel
      tabs={calculated}
      currentTab="Items"
      rightToolbar={<ContextToolbar {...props} />}
      {...props}
    />
  );
}