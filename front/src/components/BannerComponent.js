import React  from "react"
import BannerService from "../services/BannerService"
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Paper, Grid, Typography, Button, MenuItem } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";
import CategoriesService from "../services/CategoriesService";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
      },
    paper1: {
        color: theme.palette.text.primary,
        width: '30%',
        padding: theme.spacing(1),
        maxHeight: "calc(100vh - 90px)", 
        overflow: 'auto'
      },
    paper2: {
        padding: theme.spacing(1),
        maxHeight: "calc(100vh - 90px)",
        width: '70%',
        overflow: 'auto'
      },
    paper3: {
        color: theme.palette.text.primary,
        width: '30vw',
        padding: theme.spacing(0),
        position: 'absolute',
        bottom:0,
      },
    paper4: {
        color: theme.palette.text.primary,
        width: '35vw',
        padding: theme.spacing(0),
        position: 'absolute',
        bottom: 0,
        left: '65vw'
        
      },
      paper5: {
        color: theme.palette.text.primary,
        width: '35vw',
        padding: theme.spacing(0),
        position: 'absolute',
        bottom: 0,
        left: '30vw'
      },
      control: {
        padding: theme.spacing(2),
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      TextField: {
        width: '43vw',
        },
  });

class BannerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      categories:[],
      banId: "id",
      banName: "", 
      originName: "",
      banCategory: "",
      banPrice: "",
      banText: "",
      selectedId: 0,
      isNew: false,
      isError: false,
      searchString:"",
    };
  }

  onChangeName = (item) => {
    let Err = false;
    for (let i = 0; i < this.state.banners.length; i++) {
        if (this.state.banners[i].name !== this.state.originName)
        if (this.state.banners[i].name === item.target.value) {
            Err=true;
        }
    }
    this.setState({ banName: item.target.value, isError: Err});
  };
  
  onChangeText = (item) => {
    this.setState({ banText: item.target.value });
  };

  onChangePrice = (item) => {
    if (item.target.value > 0) this.setState({ banPrice: item.target.value });
  };

  onChangeCategory = (item) => {
    this.setState({ banCategory: item.target.value });
  };
  
  onCreateNew = (item) => {
    this.setState({originName:"", selectedId:0, isError:false, isNew: true, banName:"", banPrice:0, banText:"", banCategory:this.state.categories[0].name});
  };

  onSaveClicked = () => {
    const cat = {
      id: null,
      name: this.state.banCategory,
      requestName: "",
      deleted: false,
    };
    const params = {
      name: this.state.banName,
      categoryId: cat,
      price: this.state.banPrice,
      content: this.state.banText,
      deleted: false,
    };
    
    let res;
    this.state.isNew
      ? res = BannerService.addNewBanner(params)
      : res = BannerService.editBanner(this.state.selectedId, params);
    
    //console.log(res);
    setTimeout(() => {
        window.location.reload();
    }, 50);
    
  };

  onDeleteClicked = () => {
    BannerService.deleteBanners(this.state.selectedId);
    const ban = Object.assign([], this.state.banners);
    let ind = -1;
    for (let i = 0; i < ban.length; i++) {
      if (ban[i].id === this.state.selectedId) 
          ind=i;
      }
    ban.splice(ind, 1);
    this.setState({banners: ban, originName:"", selectedId:0, isError:false, banName:"", banPrice:null, banText:"", banCategory:""})
  };

  onSearch = (item) => {
    this.setState({ searchString: item.target.value});
  }

  getBannersData(){
    BannerService.getBanners().then((response) => {
        this.setState({ banners: response.data});
      });
  }

  getCategoriesData(){
    CategoriesService.getCategories().then((response) => {
        this.setState({ categories: response.data});
      });
  }

  componentDidMount() {
    this.getBannersData();
    this.getCategoriesData();
  }

  getListItem(search) {
      return this.state.banners.map(
        (banner) =>
          !banner.deleted && 
          banner.name.toUpperCase().includes(search.toUpperCase()) && (
            <ListItem
              selected={this.state.selectedId === banner.id}
              button
              key={banner.id}
              onClick={() =>
                this.setState({
                  banId: "id: " + banner.id,
                  banName: banner.name,
                  originName: banner.name,
                  banPrice: banner.price,
                  banText: banner.content,
                  selectedId: banner.id,
                  banCategory: banner.categoryId.name,
                  isNew:false,
                  isError:false,
                }) 
              }
            >
              <ListItemText primary={banner.name} />
            </ListItem>
          )
      );
  }

  render() {
    const { classes } = this.props;

    let listItems=this.getListItem(this.state.searchString);

    const listCategories = this.state.categories.map(
        (category) => 
        !category.deleted && (
            <MenuItem 
                key={category.id} 
                value={category.name}>
                {category.name}
            </MenuItem>
            )
    )
    
    return (
      <div className={classes.root}>
        <Grid container spacing={5}>
          {/* Left side with banners list */}
          <Paper className={classes.paper1}>
            <Typography
              gutterBottom
              variant="button"
              display="block"
              color="textSecondary"
            >
              Banners list:{" "}
            </Typography>
            <TextField
              size="small"
              label="Search field" 
              type="search"
              onChange={this.onSearch}
              >
              </TextField>
            {listItems}
          </Paper>

          <Paper className={classes.paper2}>
            <div className={classes.div_border}>
              <Typography
                gutterBottom
                align="left"
                variant="button"
                display="block"
                color="textSecondary"
              >
                {(this.state.selectedId>0) ? "id: " + this.state.selectedId : "id"}
              </Typography>
              <Divider />
            </div>

            <table cellPadding="10">
              <tr>
                <td>
                  <Typography variant="button" display="block" color="primary">
                    Name:
                  </Typography>
                </td>
                <td>
                  <TextField
                    autoFocus
                    className={classes.TextField}
                    label={(this.state.isError) ? "Error" : ""}
                    error={(this.state.isError) ? true : false}
                    helperText={(this.state.isError) ? "Banner with same name allready exists!" : ""}

                    id="outlined-basic"
                    value={this.state.banName}
                    disabled={(this.state.isNew || (this.state.selectedId>0)) ? false : true}
                    variant={(this.state.isNew || (this.state.selectedId>0)) ? "outlined" : "filled"}
                    size="small"
                    onChange={this.onChangeName}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="button" display="block" color="primary">
                    Category:
                  </Typography>{" "}
                </td>
                <td>
                  <TextField
                    select
                    className={classes.TextField}
                    id="outlined-basic"
                    //value={(this.state.selectedId>0 && (this.state.selectedBanner.categoryId != null)) ? this.state.selectedBanner.categoryId.name : ""}
                    value={this.state.banCategory}
                    disabled={(this.state.isNew || (this.state.selectedId>0)) ? false : true}
                    variant={(this.state.isNew || (this.state.selectedId>0)) ? "outlined" : "filled"}
                    size="small"
                    onChange={this.onChangeCategory}
                  >
                    {listCategories}
                  </TextField>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="button" display="block" color="primary">
                    Price:
                  </Typography>{" "}
                </td>
                <td>
                  <TextField
                    className={classes.TextField}
                    id="outlined-basic"
                    type="number"
                    value={this.state.banPrice}
                    disabled={(this.state.isNew || (this.state.selectedId>0)) ? false : true}
                    variant={(this.state.isNew || (this.state.selectedId>0)) ? "outlined" : "filled"}
                    size="small"
                    onChange={this.onChangePrice}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="button" display="block" color="primary">
                    Text:
                  </Typography>{" "}
                </td>
                <td>
                  <TextField
                    className={classes.TextField}
                    multiline={true}
                    rowsMax="10"
                    id="outlined-basic"
                    value={this.state.banText}
                    disabled={(this.state.isNew || (this.state.selectedId>0)) ? false : true}
                    variant={(this.state.isNew || (this.state.selectedId>0)) ? "outlined" : "filled"}
                    size="small"
                    onChange={this.onChangeText}
                  />
                </td>
              </tr>
            </table>
          </Paper>

          {/* Buttons */}
          <Paper className={classes.paper3}>
            <Button
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              fullWidth={true}
              color="primary"
              onClick={this.onCreateNew}
            >
              Create
            </Button>
          </Paper>
          <Paper className={classes.paper4}>
            <Button
              disabled={(this.state.isNew || this.state.selectedId>0) && !this.state.isError ? false : true}
              variant="contained"
              disableElevation
              startIcon={<SaveIcon />}
              fullWidth={true}
              color="primary"
              onClick={this.onSaveClicked}
            >
              Save
            </Button>
          </Paper>
          <Paper className={classes.paper5}>
            <Button
              disabled={(this.state.selectedId>0) ? false : true}
              variant="contained"
              disableElevation
              color="secondary"
              fullWidth={true}
              startIcon={<DeleteIcon />}
              onClick={this.onDeleteClicked}
            >
              Delete
            </Button>
          </Paper>
        </Grid>
      </div>
    );
  }
  
}



export default withStyles(useStyles) (BannerComponent)
