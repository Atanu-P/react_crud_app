import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

class Display extends Component {
  state = {
    recipes: [
      // {
      //   title: "Brew",
      //   slug: "brew",
      //   ingredients: ["bananas", "coffee", "milk"],
      //   id: "1",
      // },
      // {
      //   title: "Juice",
      //   slug: "juice",
      //   ingredients: ["mango", "lime", "juice"],
      //   id: "2",
      // },
    ],
  };

  componentDidMount() {
    this.getData();
    document.title = "React CRUD app";
  }
  getData = async () => {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    //console.log(querySnapshot);

    querySnapshot.forEach((recipe) => {
      //store data inside array
      let item = recipe.data();
      item.id = recipe.id;
      let recipes = [...this.state.recipes];
      recipes.push(item);

      this.setState({ recipes: recipes });
    });

    // const q = query(collection(db, "recipes"));
    // const onsnapshot1 = onSnapshot(q, (snapshot) => {
    //   snapshot.docChanges().forEach((recipe) => {
    //     let item = recipe.doc.data();
    //     item.id = recipe.doc.id;
    //     let recipes = [...this.state.recipes];
    //     recipes.push(item);
    //     this.setState({ recipes: recipes });
    //   });
    // });
  };

  handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Recipe?")) {
      await deleteDoc(doc(db, "recipes", id));

      //delete data inside array
      const recipes = this.state.recipes.filter((r) => r.id != id);
      // console.log(recipes);

      this.setState({ recipes: recipes });
      // console.log(id, "deleted");
    } else {
      // Do nothing!
      console.log("Cancel delete");
    }
  };

  render() {
    // console.log(this.state.recipes);
    return (
      <div className="container">
        <h4 className="center-align indigo-text">List of Recipe</h4>
        <div className="index ">
          {this.state.recipes.map((m) => (
            <div className="card" key={m.id}>
              <div className="card-content">
                <i
                  className="material-icons delete"
                  title="Delete Recipe"
                  onClick={() => this.handleDelete(m.id)}>
                  delete
                </i>
                <h2 className="indigo-text">{m.title}</h2>
                <ul className="ingredients">
                  {m.ingredients.map((i, id) => (
                    <li key={id} title="Ingredient">
                      <span className="chip">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={`/editrecipe/${m.id}`} title="Edit Recipe">
                <span className="btn-floating btn-large halfway-fab pink">
                  <i className="material-icons edit">edit</i>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Display;
