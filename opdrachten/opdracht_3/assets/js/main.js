// Wacht totdat het document geladen is.
$(document).ready(function () {

  // Pokedex
  var go_vr            = document.getElementById('go-vr'),
      naam_vr          = document.getElementById('naam-vr'),
      totaal_nummer_vr = document.getElementById('nummer-totaal-vr'),
      pokemon_vr       = document.getElementById('pokemon-vr'),
      nummers          = document.getElementsByClassName('nummer'),
      totaal_nummer    = "",
      pause            = false;

  // Voeg een event listener toe op de go knop.
  goEvent();

  // Voeg een event listener toe op de nummer knoppen.
  nummerEvents();

  // Voeg een event listener toe op de nummer knoppen.
  function nummerEvents() {

    // Ga door elk nummer heen.
    for(var i = 0; i < nummers.length; i++) {

      // Voeg een event listener toe aan elk nummer.
      document.getElementsByClassName('nummer')[i].addEventListener('mouseenter', function() {

        // Verkrijg het getal.
        toetsGetal(this)
      });
    }
  }

  // Reset het totale getal.
  function resetTotaalNummer() {
    totaal_nummer = ""
  }

  // Pas het ingetoetse getal aan.
  function toetsGetal(nummer) {

    // Controleer of er al een pauze is.
    if(!pause) {

      // Voeg het getal toe aan de string.
      totaal_nummer += $(nummer).attr('data-nummer');

      // Toon het nummer.
      toonNummer(totaal_nummer);
    }

    // Voer een pauze uit.
    maakPauze();
  }

  // Maake een pauze aan.
  function maakPauze() {

    // Controleer of er al een pauze is.
    if(!pause) {

      // Zet de pauze op true.
      pause = true;

      // Wacht voor 2 seconden.
      setTimeout(function () {

        // Zet de pauze op false.
        pause = false;
      }, 1000)
    }
  }

  // Toon het totale nummer in de Pokedex.
  function toonNummer(nummer) {

    // Toon het totale nummer.
    $(totaal_nummer_vr).attr('text', 'text:' + nummer)
  }

  // Go knop.
  function goEvent() {

    // Voeg een event listener toe.
    go_vr.addEventListener('mouseenter', function () {

      // Controleer of de pokemons binnen de range vallen.
      if (totaal_nummer == 0) {
        totaal_nummer = 1
      } else  if (totaal_nummer >= 150) {
        totaal_nummer = 150
      }

      // Haal de Pokemon gegevens op.
      apiCall(totaal_nummer);

      // Reset het totale getal.
      resetTotaalNummer();

      // Toon het lege nummer.
      toonNummer(totaal_nummer);
    });
  }

  function apiCall(id) {

    // Controleer of er al een pauze is.
    if(!pause) {

      // Verkrijg de Pokemon gegevens.
      $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon/' + id + '/',
        method: 'GET',
        dataType: 'json',
        success: function (msg) {

          // Sla de afbeelding van de Pokemon op.
          var afbeelding = msg.sprites.front_default;

          // Sla de naam van de Pokemon op.
          var naam = msg.species.name;

          // Toon de Pokemon.
          toonPokemon(afbeelding, naam);
        }
      });
    }

    // Voer een pauze uit.
    maakPauze();
  }

  // Toon de naam van de Pokemon.
  function toonNaam(naam) {

    // Verander het text attribuut.
    $(naam_vr).attr('text', 'text:' + naam)
  }

  // Toon de afbeelding van de Pokemon.
  function toonAfbeelding(afbeelding) {

    // Verander de source attribuut.
    $(pokemon_vr).attr('src', afbeelding)
  }

  // Toon de Pokemon.
  function toonPokemon(afbeelding, naam) {

    // Toon de naam van de Pokemon.
    toonNaam(naam);

    // Toon de afbeelding van de Pokemon.
    toonAfbeelding(afbeelding);
  }
});
