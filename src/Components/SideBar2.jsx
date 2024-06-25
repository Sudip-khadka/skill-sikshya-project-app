import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import Orders from "@mui/icons-material/ShoppingCart";
import Appointments from "@mui/icons-material/CalendarMonth";
import Coupon from "@mui/icons-material/LocalOffer";
import Inventory from "@mui/icons-material/EventNote";
import Campaign from "@mui/icons-material/Campaign";
import Profile from "@mui/icons-material/Person";
import PreOrder from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import Rating from "@mui/icons-material/Stars";
import List from "@mui/icons-material/FiberManualRecord";

import "../Styles/Sidebartwo.css";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Root,
  TreeItem2GroupTransition,
} from "@mui/x-tree-view/TreeItem2";
import { unstable_useTreeItem2 as useTreeItem } from "@mui/x-tree-view/useTreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";

// Custom styled arrow icons
const CustomArrowDropUpIcon = styled(ArrowDropUpIcon)(({ theme }) => ({
  fontSize: "2rem !important", // Adjust the size as needed
}));

const CustomArrowDropDownIcon = styled(ArrowDropDownIcon)(({ theme }) => ({
  fontSize: "2rem !important", // Adjust the size as needed
}));

const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: theme.palette.text.secondary,
  paddingRight: theme.spacing(1),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row-reverse",
  fontWeight: theme.typography.fontWeightMedium,
  "&.expanded": {
    fontWeight: theme.typography.fontWeightRegular,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.focused, &.selected, &.selected.focused": {
    backgroundColor: `#082D4A`,
    color: "#D6EBFB",
  },
}));

const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(
  ({ theme }) => ({
    marginRight: theme.spacing(1),
    display: "flex",
    gap: "20px",
  })
);

const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
  ({ theme }) => ({
    marginLeft: 0,
    [`& .content`]: {
      paddingLeft: theme.spacing(2),
    },
  })
);

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const theme = useTheme();
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    isChild,
    ...other
  } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const style = {
    "--tree-view-color":
      theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color":
      theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
  };

  return (
    <TreeItem2Provider itemId={itemId}>
      <CustomTreeItemRoot {...getRootProps({ ...other, style })}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
            }),
          })}
        >
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </CustomTreeItemIconContainer>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              p: 0.5,
              pr: 0,
            }}
          >
            <Box
              component={LabelIcon}
              color="inherit"
              sx={{ mr: 1, fontSize: isChild ? "12px" : "24px" }}
            />
            <Typography
              {...getLabelProps({
                variant: "body2",
                sx: { display: "flex", fontWeight: "inherit", flexGrow: 1 },
              })}
            >
              {label}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        </CustomTreeItemContent>
        {children && (
          <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />
        )}
      </CustomTreeItemRoot>
    </TreeItem2Provider>
  );
});

function EndIcon() {
  return <div style={{ width: "24px" }} />;
}

export default function GmailTreeView() {
    const [selectedItem, setSelectedItem] = useState(() => localStorage.getItem('selectedItem') || '3');

    useEffect(() => {
      localStorage.setItem('selectedItem', selectedItem);
    }, [selectedItem]);
  
    const handleItemClick = (itemId) => {
      setSelectedItem(itemId);
    };


  return (
    <SimpleTreeView
      aria-label="gmail"
      defaultSelectedItems={selectedItem}
      slots={{
        expandIcon: CustomArrowDropDownIcon,
        collapseIcon: CustomArrowDropUpIcon,
        endIcon: null,
      }}
      sx={{ flexGrow: 1, maxWidth: 400 }}
    >
      <CustomTreeItem itemId="1" label="Products" labelIcon={Inventory2Icon} >
        <Link  to="/categories" onClick={() => handleItemClick('1.1')}>
          <CustomTreeItem
            itemId="1.1"
            label="Categories"
            labelIcon={List}
            isChild
          />
        </Link>
        <Link to='/variations'onClick={() => handleItemClick('1.2')}>
        <CustomTreeItem
          itemId="1.2"
          label="Variations"
          labelIcon={List}
          isChild
          />
        </Link>
        <Link to='/products'onClick={() => handleItemClick('1.3')}>
        <CustomTreeItem
          itemId="1.3"
          label="Products"
          labelIcon={List}
          isChild
          />
          </Link>
        <Link to='/collections'onClick={() => handleItemClick('1.4')}>
        <CustomTreeItem
          itemId="1.4"
          label="Collections"
          labelIcon={List}
          isChild
          />
        </Link>
      </CustomTreeItem>
        <Link to='/orders'onClick={() => handleItemClick('2')}>
      <CustomTreeItem itemId="2" label="Orders" labelIcon={Orders} />
      </Link>
      <Link to='/appointments'onClick={() => handleItemClick('3')}>
      <CustomTreeItem
        itemId="3"
        label="Appointments"
        labelIcon={Appointments}
        />
        </Link>
      <Link to='/coupon' onClick={() => handleItemClick('4')}><CustomTreeItem itemId="4" label="Coupon" labelIcon={Coupon} /></Link>
      <Link to='/inventory' onClick={() => handleItemClick('5')}><CustomTreeItem itemId="5" label="Inventory" labelIcon={Inventory} /></Link>
      <Link to='/campaign' onClick={() => handleItemClick('6')}><CustomTreeItem itemId="6" label="Campaign" labelIcon={Campaign} /></Link>
      <Link to='/profile' onClick={() => handleItemClick('7')}><CustomTreeItem itemId="7" label="Profile" labelIcon={Profile} /></Link>
      <Link to='/preorder' onClick={() => handleItemClick('8')}><CustomTreeItem itemId="8" label="Pre-Order" labelIcon={PreOrder} /></Link>
      <Link to='/delivery' onClick={() => handleItemClick('9')}><CustomTreeItem
        itemId="9"
        label="Delivery Charges"
        labelIcon={PaidIcon}
      /></Link>
      <Link to='/rating' onClick={() => handleItemClick('10')}><CustomTreeItem itemId="10" label="Rating" labelIcon={Rating} /></Link>
    </SimpleTreeView>
  );
}
