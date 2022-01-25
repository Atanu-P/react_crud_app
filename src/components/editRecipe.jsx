import React, { Component } from "react";
import { db } from "../firebase";
import { doc, getDoc, addDoc, collection, setDoc } from "firebase/firestore";
import slugify from "slugify";
import react from "react";

class EditRecipe extends Component {
  state = {
    data: {
      title: "",
      ingredients: [],
      slug: "",
    },
    feedback: "",
  };

  handleChange = (e) => {
    // this.setState({});
    let data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;

    const slug = slugify(e.currentTarget.value, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    });
    data["slug"] = slug;

    this.setState({ data: data });

    // console.log(data, "handle change");
  };

  addIngredients = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value;
      let obj = this.state.data;
      obj["ingredients"] = obj["ingredients"] ? obj["ingredients"] : [];
      obj["ingredients"].push(value);
      this.setState({ obj: obj });
      document.querySelector("#ingredients").value = "";
      // console.log(obj, e);
    }
  };

  deleteIngredients = (e) => {
    // console.log(e, "delete");
    const ingredients = this.state.data.ingredients.filter((i, id) => id !== e);
    let obj = this.state.data;
    obj["ingredients"] = [...ingredients];
    // console.log(obj, "filter");
    this.setState({ obj: obj });
  };

  submitRecipe = async (e) => {
    e.preventDefault();

    if (this.state.data.title === "") {
      const feedback = "You must enter a title";
      this.setState({ feedback: feedback });
    } else if (this.state.data.ingredients.length == 0) {
      const feedback = "You must enter an ingredient";
      this.setState({ feedback: feedback });
    } else {
      console.log("submit");
      const id = this.props.match.params.id;
      await setDoc(doc(db, "recipes", id), {
        title: this.state.data.title,
        ingredients: this.state.data.ingredients,
        slug: this.state.data.slug,
      });
      // this.props.history.replace("/display ");
      window.location.pathname = "/display";
    }
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const doc = docSnap.data();
      const data = { ...this.state.data };
      data["title"] = doc.title;
      data["slug"] = doc.slug;
      data["ingredients"] = [...doc.ingredients];

      this.setState({ data: data });

      console.log(data, "data");
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  render() {
    console.log(this.state.data, "render");
    return (
      <react.Fragment>
        <div className="add-item container">
          <h4 className="center-align indigo-text">Edit Recipe</h4>
          <form onSubmit={this.submitRecipe}>
            <div className="field title">
              <label htmlFor="title" style={{ cursor: "pointer" }}>
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={this.state.data.title}
                onChange={this.handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {/* <!-- displaying the added ingredients --> */}
            {this.state.data.ingredients.map((i, id) => (
              <div className="field" key={id}>
                <label htmlFor="ingredients">Ingredient added</label>
                <input type="text" name="ingredients" value={i} readOnly />
                <i
                  style={{ cursor: "pointer" }}
                  className="material-icons delete"
                  onClick={() => this.deleteIngredients(id)}>
                  delete
                </i>
              </div>
            ))}
            <div className="field ingredients">
              <label htmlFor="ingredients">
                Add an ingredient (press ENTER to add):
              </label>
              <input
                id="ingredients"
                type="text"
                name="ingredients"
                // value={this.state.data.ingredients}

                onKeyDown={this.addIngredients}
              />
            </div>
            <div className="field center-align">
              {this.state.feedback && (
                <p className="red-text">{this.state.feedback}</p>
              )}

              <button className="btn pink">Update</button>
            </div>
          </form>
        </div>
      </react.Fragment>
    );
  }
}

export default EditRecipe;
