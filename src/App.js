import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import InventoryItem from "./components/InventoryItem/InventoryItem";
import AddInventoryItem from "./components/AddInventoryItem/AddInventoryItem";
import EditInventoryItem from "./components/EditInventoryItem/EditInventoryItem";
import "./App.scss";
import Warehouses from "./pages/Warehouses/Warehouses";
import ManageWarehouse from "./components/ManageWarehouse/ManageWarehouse";
import CurrentWarehouse from "./pages/CurrentWarehouse/CurrentWarehouse";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Redirect exact from="/" to="/warehouse" />
        <Route path="/warehouse" exact component={Warehouses} />
        <Route path="/warehouse/add" component={ManageWarehouse} />
        <Route
          path="/warehouse/edit/:warehouseId"
          exact
          component={ManageWarehouse}
        />
        <Route
          path="/warehouse/:warehouseId"
          exact
          component={CurrentWarehouse}
        />
        <Route path="/inventory" exact component={InventoryPage} />
        <Route path="/inventory/add" component={AddInventoryItem} />
        <Route path="/inventory/:inventoryId" exact component={InventoryItem} />
        <Route
          path="/inventory/edit/:inventoryId"
          component={EditInventoryItem}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
