const HomeStyle = (theme, fade) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#273746",
    color: "#F8F9F9",
  },
  AppBar: {
    background: "linear-gradient(to right bottom, #34495E, #1C2833)",
    color: "#F8F9F9",
    cursor: "pointer",
  },
  SearchBar: {
    backgroundColor: "#273746",
    color: "#F8F9F9",
    cursor: "pointer",
  },
  FullWidthCarousel: {
    padding: "20px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  listbox: {
    width: "100%",
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: "#273746",
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.50)",
    '& li[data-focus="true"]': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      color: "white",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      color: "white",
    },
    "& li:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      color: "white",
    },
    "& li": {
      padding: "10px",
    },
  },
});

export default HomeStyle;
