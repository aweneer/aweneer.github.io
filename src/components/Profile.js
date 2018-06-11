import React, { Component } from "react";

export default class Profile extends Component {
  profileExists() {
    return localStorage.getItem("profileName");
  }

  //on submit in creaton, the profile is created via global function
  handleSubmit() {
    createProfile();
  }

  //on submit in deletion, the profile is deleted via global function
  handleDeleteSubmit() {
    deleteProfile();
  }

  //on submit in change, the profile is edited via global function
  handleChangeName() {
    changeName();
  }
  //function to show profile registration form
  showProfileForm() {
    return (
      <main>
        <section>
          <p>It looks like you have no profile yet. Create it now!</p>
          <form className="profileCreate" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="your desired name"
              class="name"
              autoFocus
              required
            />
            <input id="submit" type="submit" value="Create profile" required />
          </form>
        </section>
      </main>
    );
  }

  //function to show profile
  showProfile() {
    return (
      <main>
        <section>
          <p>
            You are currently playing as {localStorage.getItem("profileName")}
          </p>
          <div>
            <form className="profileEdit" onSubmit={this.handleChangeName}>
              <input
                type="text"
                placeholder="alter your name!"
                className="name"
                autoFocus
              />
              <input id="submit" type="submit" value="Edit name" />
            </form>
            <form onSubmit={this.handleDeleteSubmit}>
              <input id="submit" type="submit" value="Delete profile" />
            </form>
          </div>
        </section>
      </main>
    );
  }
  //rendering of profile page based on existing account
  render() {
    if (!this.profileExists()) {
      return this.showProfileForm();
    } else {
      return this.showProfile();
    }
  }
}

//querySelector for input element
function getInputFieldValue() {
  return document.querySelector(".name").value;
}

//localStorage profile creation, input is protected against unusual characters and validated
function createProfile() {
  localStorage.clear();
  let input = getInputFieldValue();
  if (input.match("^[a-zA-z0-9]{4,16}$")) {
    localStorage.setItem("profileName", input);
    createScoreTable();
  } else {
    alert("Allowed: a-z, A-Z, 0-9 with length between 4 and 16 characters.");
  }
}

//localStorage profile editing, input is protected against unusual characters and validated
function changeName() {
  let input = getInputFieldValue();
  if (input.match("^[a-zA-z0-9]{4,16}$")) {
    localStorage.setItem("profileName", input);
  } else {
    alert("Allowed: a-z, A-Z, 0-9 with length between 4 and 16 characters.");
  }
}
//localStorage profile deletion, deletes everything, that means no stats are kept
function deleteProfile() {
  if (window.confirm("Do you really wish to delete your profile?")) {
    localStorage.clear();
  }
}
//creates localStorage items for scoretable
function createScoreTable() {
  localStorage.setItem("totalScore", "0");
  localStorage.setItem("gamesPlayed", "0");
  localStorage.setItem("hardScore", "0");
  localStorage.setItem("death", "0");
  localStorage.setItem("win", "0");
  localStorage.setItem("loss", "0");
}
