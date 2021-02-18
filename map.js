function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: {
      lat: 47.09622022962026,
      lng: 37.54794999094026
    },
  });
  directionsRenderer.setMap(map);
  let startPlace = document.getElementById("start");
  let endPlace = document.getElementById("end");

  const onChangeHandler = function (event) {
    event.preventDefault();// чтобы не было перезагрузки страницы при отправке формы
    if (startPlace.value && endPlace.value) {
      calculateAndDisplayRouteInput(directionsService, directionsRenderer);
      map.zoom = 16
    } else {
      alert('Введите адрес!')
    }
    
  };
  document.getElementById("town").addEventListener('submit', onChangeHandler);
}



function calculateAndDisplayRouteInput(directionsService, directionsRenderer) {
  directionsService.route({
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Запрос маршрутов не удался из-за " + status);
      }
    }
  );
}