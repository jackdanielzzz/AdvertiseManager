import React  from "react"
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Paper, Grid, Typography, Button } from '@material-ui/core'
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
      test: {
        padding: theme.spacing(1),
        textAlign: 'center',
        bottom: 41,
        fontSize: 8,
        backgroundColor: theme.palette.secondary.main,
        position: 'absolute',
        left: '31vw',
        width: '68vw',
      },
      TextField: {
        width: '43vw',
        },
  });

class CategoryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      listErrors: [],
      selectedId: 0,
      isNew: false,
      isError: false,
      isErrorRequest: false,
      catId: "id",
      catName: "",
      originName: "",
      originRequestName: "",
      catRequestName: "",
      searchString:"",
    };
  }

  onChangeName = (item) => {
    let Err = false;
    for (let i = 0; i < this.state.categories.length; i++) {
        if (this.state.categories[i].name !== this.state.originName)
        if (this.state.categories[i].name === item.target.value) {
            Err=true;
        }
    }
    this.setState({ catName: item.target.value, isError: Err});
  };
  
  onClick = (item) => {
    this.setState({listErrors:[]});
  };

  onChangeCategory = (item) => {
    let Err = false;
    for (let i = 0; i < this.state.categories.length; i++) {
        if (this.state.categories[i].requestName !== this.state.originRequestName)
        if (this.state.categories[i].requestName === item.target.value) {
            Err=true;
        }
    }
    this.setState({ catRequestName: item.target.value, isErrorRequest: Err});
  };
  
  onCreateNew = (item) => {
    this.setState({originName:"", originRequestName:"", selectedId:0, isError:false, isNew: true, catName:"", catRequestName:""});
  };

  onSaveClicked = () => {
    const cat = {
      id: null,
      name: this.state.catName,
      requestName: this.state.catRequestName,
      deleted: false,
    };
    
    let res;
    this.state.isNew
       ? res = CategoriesService.addNewCategory(cat)
       : res = CategoriesService.editCategory(this.state.selectedId, cat);
       
    setTimeout(() => {
        window.location.reload();
    }, 50);
  };

  onDeleteClicked = () => {
    CategoriesService.deleteCategories(this.state.selectedId).then((response) => {
        this.setState({ listErrors: response.data});
        if (response.data.length === 0) {
            const cat = Object.assign([], this.state.categories);
            let ind = -1;
            for (let i = 0; i < cat.length; i++) {
              if (cat[i].id === this.state.selectedId) 
                  ind=i;
              }
            cat.splice(ind, 1);
            this.setState({categories: cat, originName:"", selectedId:0, isError:false, catName:"", catRequestName:""})
        }
    });
  };

  getCategoriesData(){
    CategoriesService.getCategories().then((response) => {
        this.setState({ categories: response.data});
      });
  }

  componentDidMount() {
    this.getCategoriesData();
  }

  onSearch = (item) => {
    this.setState({ searchString: item.target.value});
  }

  getListItem(search) {
   return this.state.categories.map(
     (category) =>
       !category.deleted &&
       category.name.toUpperCase().includes(search.toUpperCase()) && (
         <ListItem
           selected={this.state.selectedId === category.id}
           button
           key={category.id}
           onClick={() =>
             this.setState({
               catId: "id: " + category.id,
               catName: category.name,
               originName: category.name,
               originRequestName: category.requestName,
               catRequestName: category.requestName,
               selectedId: category.id,
               isNew: false,
               isError: false,
               isErrorRequest: false,
               listErrors:[],
             })
           }
         >
           <ListItemText primary={category.name} />
         </ListItem>
       )
   );
  }

  render() {
    const { classes } = this.props;

    let listItems=this.getListItem(this.state.searchString);
    
    const listErr = this.state.listErrors.map((error) => <li>{error}</li>);
    
    //console.log(this.state.selectedId);
    //console.log(listErr.length>0 ? "true":"false");
    //console.log(this.state.tempcat);

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
              Categories list:{" "}
            </Typography>
            {/* <Divider /> */}
            <TextField
              size="small"
              label="Search field"
              type="search"
              onChange={this.onSearch}
            ></TextField>
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
                {this.state.selectedId > 0
                  ? "id: " + this.state.selectedId
                  : "id"}
              </Typography>

              <Divider />
            </div>

            <table cellpadding="10">
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
                    label={this.state.isError ? "Error" : ""}
                    error={this.state.isError ? true : false}
                    helperText={
                      this.state.isError
                        ? "Category with same name allready exists!"
                        : ""
                    }
                    id="outlined-basic"
                    value={this.state.catName}
                    disabled={
                      this.state.isNew || this.state.selectedId > 0
                        ? false
                        : true
                    }
                    variant={
                      this.state.isNew || this.state.selectedId > 0
                        ? "outlined"
                        : "filled"
                    }
                    size="small"
                    onChange={this.onChangeName}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="button" display="block" color="primary">
                    Request id:
                  </Typography>{" "}
                </td>
                <td>
                  <TextField
                    className={classes.TextField}
                    label={this.state.isErrorRequest ? "Error" : ""}
                    error={this.state.isErrorRequest ? true : false}
                    helperText={
                      this.state.isErrorRequest
                        ? "Category with same request id allready exists!"
                        : ""
                    }
                    id="outlined-basic"
                    value={this.state.catRequestName}
                    disabled={
                      this.state.isNew || this.state.selectedId > 0
                        ? false
                        : true
                    }
                    variant={
                      this.state.isNew || this.state.selectedId > 0
                        ? "outlined"
                        : "filled"
                    }
                    size="small"
                    onChange={this.onChangeCategory}
                  ></TextField>
                </td>
              </tr>
            </table>

            <Paper className={classes.test} 
                   hidden={listErr.length>0 ? false : true}
                   onClick={this.onClick}
                  >
              <ul>
                Cannot delete this category because some banners use it:
                {listErr}
              </ul>
            </Paper>
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
              disabled={
                (this.state.isNew || this.state.selectedId > 0) &&
                !this.state.isError &&
                !this.state.isErrorRequest
                  ? false
                  : true
              }
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
              disabled={this.state.selectedId > 0 ? false : true}
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



export default withStyles(useStyles) (CategoryComponent)
