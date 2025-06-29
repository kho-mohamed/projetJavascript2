import "../assets/styles/styles.scss";
import { products } from "../../data/productlist.js";
import { afficheProduit } from "../components/products/product.js";

const content = document.querySelector("#gelerycontent");

afficheProduit(products, content);
