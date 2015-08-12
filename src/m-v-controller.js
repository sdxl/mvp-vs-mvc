(function () {
  // // // // // //
  // M V Controller
  // // // // // //


  window.People = {}

  // Controller
  People.controller = {
    // Controller Action
    rotate: function (e) {
      // This is not very special (but it could be!)
      e.preventDefault()
      Roster.rotate()
    },
    addPerson: function(e) {
      e.preventDefault()
      var name = $('[name="firstname"]').val();
      var age = $('[name="age"]').val();
      var personObj ={
        id: Roster.lastID + 1,
        name: name,
        age: age
      }
      Roster.add(personObj)
    }
  }

  // Views
  People.view = function () {

    // <form>Add Name:
    // <input type='text' name='firstname'>
    // Age:
    // <input type='text' name='age'>
    // <button class='submit'>Submit</button>
    // </form>

    return $('<div class="people">').append(
      $('<h3>').text("All People:"),

      // Example of the View connecting to a Controller action
      $('<input type="text" name="firstname" value="Name">'),
      $('<input type="text" name="age" value="age">'),
      $('<button class="submit">').text("Submit")
                                  .on('click', People.controller.addPerson),
      $('<br>'),
      $('<br>'),
      $('<button>').text('Rotate').on('click', People.controller.rotate),
      // Example of the View reading from the Model
      Roster.map(personView)
    )
  }
  // Helper view
  function personView (person) {
    return $('<div class="person">').append(
      $('<p>').append("Name: ", person.name),
      $('<p>').append("Age: ", person.age),

      // Example of the View manipulating the Model
      $('<a href="#">').text('Remove').on('click', function(e) {
        e.preventDefault()
        Roster.remove(person.id)
      })


    )
  }

  // ---------------------------------------------------------
  // EVERYTHING BELOW THIS LINE YOU WOULD NORMALLY NOT HAVE TO
  // DEAL WITH IF YOU WERE WORKING WITH A PROPER FRAMEWORK
  // ---------------------------------------------------------

  // This function inserts the view into a given DOM element.
  People.render = function (element) {
    var peopleDOM = People.view()
    $(element).empty().append(peopleDOM)
  }

  // The function puts the view on the page,
  // then gets ready to update the view on model changes.
  People.mount = function (element) {
    People.render(element)
    App.pubsub.on('change:roster', function() {
      People.render(element)
    })
  }
})()
