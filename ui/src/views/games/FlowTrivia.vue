<script>
export default {
  name: "CookingBurger",
  props: ['display1Name', 'display2Name', 'player1Address', 'player2Address', 'admin'],
  data() {
    return {
      gameName: false,
      gameTitle: 'Cooking',
      currentRound: 2,
      won: false,
      burgerLayers: [{
        iconName: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499.2 499.2\"><path fill=\"#6d3113\" d=\"M444 361.6c0 16.8-14.4 32-32.8 32H88c-18.4 0-32.8-15.2-32.8-32s14.4-32 32.8-32h323.2c18.4 0 32.8 15.2 32.8 32z\"/><path fill=\"#562306\" d=\"M444 362.4c0 16.8-14.4 31.2-32.8 31.2H88c-18.4 0-32.8-14.4-32.8-31.2 0-16.8 14.4-32.8 32.8-8.8h323.2c18.4-24 32.8-8 32.8 8.8z\"/></svg>",
        brandName: "Meat",
        shownOrder: 0,
        selectedOrder: null,
      }, {
        iconName: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499.2 499.2\"><ellipse cx=\"249.6\" cy=\"115.2\" fill=\"#c98028\" rx=\"32\" ry=\"8\"/><path fill=\"#562306\" d=\"M257.6 107.2c0 4.8-4 8-8 8s-8-4-8-8V8c0-4.8 4-8 8-8s8 4 8 8v99.2z\"/><path fill=\"#f73939\" d=\"M257.6 7.2v65.6L334.4 40z\"/><path fill=\"#d32e26\" d=\"M257.6 37.6v35.2L334.4 40z\"/></svg>",
        brandName: "Flag",
        shownOrder: 0,
        selectedOrder: null,
      }, {
        iconName: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499.2 499.2\"><path fill=\"#a56016\" d=\"M460.8 432.8c0 58.4-94.4 66.4-211.2 66.4s-211.2-8.8-211.2-66.4 94.4-51.2 211.2-51.2 211.2-7.2 211.2 51.2z\"/><path fill=\"#d38d31\" d=\"M460.8 432.8c0 58.4-94.4 66.4-211.2 66.4s-211.2-8.8-211.2-66.4 94.4-21.6 211.2-21.6 211.2-36.8 211.2 21.6z\"/><path fill=\"#c67822\" d=\"M249.6 411.2c116.8 0 211.2-36 211.2 21.6s-94.4 66.4-211.2 66.4\"/><path fill=\"#e5a641\" d=\"M113.6 450.4c-4.8 11.2-22.4 15.2-38.4 8.8-16.8-6.4-26.4-20-21.6-30.4C58.4 417.6 76 413.6 92 420c16 5.6 26.4 19.2 21.6 30.4z\"/><g fill=\"#e5a641\"><ellipse cx=\"161.6\" cy=\"427.2\" rx=\"12.8\" ry=\"4.8\"/><ellipse cx=\"200\" cy=\"457.6\" rx=\"12.8\" ry=\"4.8\"/><ellipse cx=\"222.4\" cy=\"435.2\" rx=\"12.8\" ry=\"4.8\"/></g><g fill=\"#a56016\"><ellipse cx=\"340\" cy=\"436\" rx=\"12.8\" ry=\"4.8\"/><ellipse cx=\"297.6\" cy=\"460.8\" rx=\"12.8\" ry=\"4.8\"/><ellipse cx=\"380\" cy=\"463.2\" rx=\"12.8\" ry=\"4.8\"/></g></svg>",
        brandName: "Bun",
        shownOrder: 0,
        selectedOrder: null,
      },
      ]
    }
  },
  mounted() {
    this.goodBurger()
  },
  methods: {
    nextRound(round) {
      localStorage.setItem('fgtCurrentRound', round)
    },
    goodBurger() {
      let correct = 0;
      let total = 0;
      const totalDraggableItems = 3;
      const totalMatchingPairs = 3; // Should be <= totalDraggableItems
      var prevButton = 0; //The button that was cilcked before: 0 if no button has been clicked yet
      var howManyButtons = 7; // How many buttons do you want
    }
  }
}
</script>
<style>
iframe#gameIframe {
  border-radius: 4px !important;
}

.score {
  font-family: monospace;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.25rem;
  margin: 1rem;
  position: relative;
  transition: opacity 0.2s;
}

#play-again-btn {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  margin-left: -50px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #111;
  border: 5px double #fff;
  border-radius: 14px;
  padding: 8px 10px;
  outline: none;
  letter-spacing: .05em;
  cursor: pointer;
  display: none;
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s, background-color 0.2s;
}

#play-again-btn:hover {
  background-color: #333;
}

#play-again-btn:active {
  background-color: #555;
}

#play-again-btn.play-again-btn-entrance {
  opacity: 1;
  transform: translateX(6rem);
}

.draggable-items {
  display: flex;
  justify-content: center;
  margin: 1rem 1rem 1.5rem 1rem;
  transition: opacity 0.5s;
}

.draggable {
  height: 5rem;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: bold;
  margin: 0rem 0.5rem;
  cursor: move;
  transition: opacity 0.2s;
}

.draggable:hover {
  opacity: 0.5;
}

.matching-pairs {
  transition: opacity 0.5s;
}

.matching-pair {
  height: 6rem;
  width: 22rem;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
}

.matching-pair span {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
}

.label {
  width: 15rem;
  font-size: 2rem;
}

.droppable {
  width: 6rem;
  font-size: 4rem;
  background-color: #fff;
  border: 3px dashed #111;
  transition: 0.2s;
}

.droppable-hover {
  background-color: #bee3f0;
  transform: scale(1.1);
}

.dropped {
  border-style: solid;
}

.dragged {
  user-select: none;
  opacity: 0.1;
  cursor: default;
}

.draggable.dragged:hover {
  opacity: 0.1;
}

@media (max-width: 600px) {
  html {
    font-size: 14px;
  }

  #play-again-btn {
    top: -0.4rem;
  }

  #play-again-btn.play-again-btn-entrance {
    transform: translateX(7rem);
  }
}
</style>

<template>
  <div class="mx-auto text-center">
    <h2>
      {{ gameTitle }}
    </h2>
  </div>
  <VRow>
    <VCol
      cols="12"
      md="12"
      class="text-center mx-auto"
    >
      <div class="text-gray-600 text-center mx-auto">

        <main class="container mx-auto">
          <section className="score">
            <span className="correct">0</span>/<span className="total">0</span>
            <button id="play-again-btn">Play Again</button>
          </section>
          <section className="draggable-items">
            <!-- Will be dynamically populated - Example Element: -->
            <!-- <i class="fab fa-codepen draggable" draggable="true" style="color: #111111;" id="codepen"></i> -->
          </section>
          <section className="matching-pairs">
            <!-- Will be dynamically populated - Example Element: -->
            <!-- <div class="matching-pair">
              <span class="label">Codepen</span><span class="droppable" data-brand="codepen"></span>
            </div> -->
          </section>

          <!--Burger-->
          <div class="burger">
            <!--Burger wrapp-->
            <div class="burger__wrapp">

              <!--Burger info-->
              <div class="burger__info js-info">
                <span class="js-info-text">Click on circles and try to make your "Good Burger"</span>
              </div>
              <!--/Burger info-->

              <!--Burger results-->
              <div class="burger__circle js-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.2 499.2">
                  <g class="buns-top">
                    <path fill="#c98028"
                          d="M465.6 217.6c0 68-96.8 49.6-216 49.6s-216 18.4-216-49.6 96.8-124 216-124 216 55.2 216 124z"/>
                    <path fill="#e5a641"
                          d="M465.6 217.6c0 68-96.8-1.6-216-1.6s-216 69.6-216 1.6 96.8-124 216-124 216 55.2 216 124z"/>
                    <path fill="#d89636" d="M249.6 93.6c119.2 0 216 55.2 216 124 0 68-96.8-1.6-216-1.6"/>
                    <g fill="#d38d31">
                      <ellipse cx="188.8" cy="131.2" rx="15.2" ry="5.6"/>
                      <ellipse cx="229.6" cy="158.4" rx="15.2" ry="5.6"/>
                    </g>
                    <g fill="#e5a641">
                      <ellipse cx="318.4" cy="154.4" rx="15.2" ry="5.6"/>
                      <ellipse cx="288" cy="125.6" rx="11.2" ry="4"/>
                      <ellipse cx="383.2" cy="183.2" rx="11.2" ry="4"/>
                    </g>
                    <ellipse cx="146.4" cy="157.6" fill="#d38d31" rx="11.2" ry="4"/>
                    <path fill="#f2c56d"
                          d="M119.2 150.4c8 7.2 0 27.2-18.4 44s-40 25.6-48 17.6c-8-7.2 0-27.2 18.4-44s40-24.8 48-17.6z"/>
                  </g>
                  <g class="salad">
                    <path fill="#52a305"
                          d="M140.8 284.8S67.2 247.2 32 262.4c-34.4 16-20 48.8-2.4 50.4 0 0-8.8 16.8 1.6 22.4s12 2.4 12 2.4-12.8 6.4-9.6 28.8S74.4 396 80.8 340c4-34.4 48-46.4 48-46.4l22.4-1.6-10.4-7.2z"/>
                    <path fill="#448400"
                          d="M80.8 340.8c4-34.4 48-46.4 48-46.4l22.4-1.6-9.6-8s-35.2-18.4-68.8-24c-14.4-2.4-28.8-2.4-40 2.4"/>
                    <g fill="#76ce19">
                      <path
                        d="M35.2 268.8c2.4 1.6 0 7.2-4 12.8-4.8 5.6-10.4 8-12 6.4-2.4-1.6 0-7.2 4-12.8 4.8-4.8 9.6-8 12-6.4zM42.4 295.2c2.4.8 3.2 4.8 1.6 10.4-1.6 5.6-4 9.6-6.4 8.8s-3.2-5.6-1.6-10.4 4-8.8 6.4-8.8zM50.4 340.8c2.4.8.8 5.6-1.6 10.4-3.2 4.8-7.2 8-8.8 7.2s-1.6-5.6 1.6-10.4c3.2-5.6 7.2-8.8 8.8-7.2z"/>
                    </g>
                    <path fill="#52a305"
                          d="M358.4 284.8s73.6-37.6 108.8-22.4c34.4 16 20 48.8 2.4 50.4 0 0 8.8 16.8-1.6 22.4s-12 2.4-12 2.4 12.8 6.4 9.6 28.8-40.8 29.6-47.2-26.4c-4-34.4-48-46.4-48-46.4L348 292l10.4-7.2z"/>
                    <path fill="#448400"
                          d="M418.4 340.8c-4-34.4-48-46.4-48-46.4l-22.4-1.6 9.6-8s35.2-18.4 68.8-24c14.4-2.4 28.8-2.4 40 2.4"/>
                    <g fill="#76ce19">
                      <path
                        d="M464 268.8c-2.4 1.6 0 7.2 4 12.8 4.8 5.6 10.4 8 12 6.4 2.4-1.6 0-7.2-4-12.8-4.8-4.8-9.6-8-12-6.4zM456.8 295.2c-2.4.8-3.2 4.8-1.6 10.4s4 9.6 6.4 8.8c2.4-.8 3.2-5.6 1.6-10.4s-4-8.8-6.4-8.8zM448.8 340.8c-2.4.8-.8 5.6 1.6 10.4 3.2 4.8 7.2 8 8.8 7.2 1.6-.8 1.6-5.6-1.6-10.4-3.2-5.6-7.2-8.8-8.8-7.2z"/>
                    </g>
                  </g>
                  <g class="buns-bottom">
                    <path fill="#a56016"
                          d="M460.8 432.8c0 58.4-94.4 66.4-211.2 66.4s-211.2-8.8-211.2-66.4 94.4-51.2 211.2-51.2 211.2-7.2 211.2 51.2z"/>
                    <path fill="#d38d31"
                          d="M460.8 432.8c0 58.4-94.4 66.4-211.2 66.4s-211.2-8.8-211.2-66.4 94.4-21.6 211.2-21.6 211.2-36.8 211.2 21.6z"/>
                    <path fill="#c67822" d="M249.6 411.2c116.8 0 211.2-36 211.2 21.6s-94.4 66.4-211.2 66.4"/>
                    <path fill="#e5a641"
                          d="M113.6 450.4c-4.8 11.2-22.4 15.2-38.4 8.8-16.8-6.4-26.4-20-21.6-30.4C58.4 417.6 76 413.6 92 420c16 5.6 26.4 19.2 21.6 30.4z"/>
                    <g fill="#e5a641">
                      <ellipse cx="161.6" cy="427.2" rx="12.8" ry="4.8"/>
                      <ellipse cx="200" cy="457.6" rx="12.8" ry="4.8"/>
                      <ellipse cx="222.4" cy="435.2" rx="12.8" ry="4.8"/>
                    </g>
                    <g fill="#a56016">
                      <ellipse cx="340" cy="436" rx="12.8" ry="4.8"/>
                      <ellipse cx="297.6" cy="460.8" rx="12.8" ry="4.8"/>
                      <ellipse cx="380" cy="463.2" rx="12.8" ry="4.8"/>
                    </g>
                  </g>
                  <g class="cheese">
                    <path fill="#ffd400"
                          d="M447.2 309.6c0 11.2-10.4 20-22.4 20H74.4c-12.8 0-22.4-8.8-22.4-20s10.4-20 22.4-20h350.4c12 0 22.4 8.8 22.4 20z"/>
                    <path fill="#ffb000" d="M447.2 308.8c0 11.2-10.4 20.8-22.4 20.8H74.4c-12.8 0-22.4-8.8-22.4-20.8"/>
                  </g>
                  <g class="meat">
                    <path fill="#6d3113"
                          d="M444 361.6c0 16.8-14.4 32-32.8 32H88c-18.4 0-32.8-15.2-32.8-32s14.4-32 32.8-32h323.2c18.4 0 32.8 15.2 32.8 32z"/>
                    <path fill="#562306"
                          d="M444 362.4c0 16.8-14.4 31.2-32.8 31.2H88c-18.4 0-32.8-14.4-32.8-31.2 0-16.8 14.4-32.8 32.8-8.8h323.2c18.4-24 32.8-8 32.8 8.8z"/>
                  </g>
                  <g class="egg">
                    <path fill="#fff"
                          d="M440.8 280.8c0 16.8-85.6 8-191.2 8s-191.2 8.8-191.2-8 85.6-31.2 191.2-31.2 191.2 14.4 191.2 31.2z"/>
                    <path fill="#e2d9c5" d="M249.6 249.6c105.6 0 191.2 13.6 191.2 30.4s-85.6 8-191.2 8"/>
                    <path fill="#ffb000"
                          d="M349.6 252.8c0 16-44.8 7.2-100 7.2s-100 8.8-100-7.2 44.8-28.8 100-28.8c55.2.8 100 13.6 100 28.8z"/>
                    <path fill="#ff8b00" d="M249.6 224.8c55.2 0 100 12.8 100 28.8s-44.8 7.2-100 7.2"/>
                    <path fill="#ffd400"
                          d="M234.4 233.6c.8 3.2-10.4 8.8-24.8 11.2-14.4 2.4-26.4 1.6-27.2-1.6-.8-3.2 10.4-8.8 24.8-11.2 14.4-2.4 26.4-1.6 27.2 1.6z"/>
                    <path fill="#fff"
                          d="M123.2 290.4s9.6-1.6 14.4 7.2c4 8.8 15.2 8.8 31.2 2.4 15.2-6.4 21.6-.8 29.6 8.8 8 9.6 20-12.8 27.2-4s12.8 12.8 15.2 15.2c6.4 5.6 8.8 0 8.8 0v-39.2l-81.6-7.2-24 9.6-20.8 7.2z"/>
                    <path fill="#e2d9c5"
                          d="M376 290.4s-9.6-1.6-14.4 7.2c-4 8.8-15.2 8.8-31.2 2.4-15.2-6.4-21.6-.8-29.6 8.8-8 9.6-20-12.8-27.2-4s-12.8 12.8-15.2 15.2c-6.4 5.6-8.8 0-8.8 0v-39.2l81.6-7.2 24 9.6 20.8 7.2z"/>
                  </g>
                  <g class="flag">
                    <ellipse cx="249.6" cy="115.2" fill="#c98028" rx="32" ry="8"/>
                    <path fill="#562306" d="M257.6 107.2c0 4.8-4 8-8 8s-8-4-8-8V8c0-4.8 4-8 8-8s8 4 8 8v99.2z"/>
                    <path fill="#f73939" d="M257.6 7.2v65.6L334.4 40z"/>
                    <path fill="#d32e26" d="M257.6 37.6v35.2L334.4 40z"/>
                  </g>
                </svg>
              </div>
              <!--/Burger results-->

              <!--Burger ingredients-->
              <ul class="burger__ingredients">
                <li class="burger__ingredients-item burger__ingredients-item--meat">
                  <div class="burger__ingredients-item-inner js-meat">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.2 499.2">
                      <path fill="#6d3113"
                            d="M444 361.6c0 16.8-14.4 32-32.8 32H88c-18.4 0-32.8-15.2-32.8-32s14.4-32 32.8-32h323.2c18.4 0 32.8 15.2 32.8 32z"/>
                      <path fill="#562306"
                            d="M444 362.4c0 16.8-14.4 31.2-32.8 31.2H88c-18.4 0-32.8-14.4-32.8-31.2 0-16.8 14.4-32.8 32.8-8.8h323.2c18.4-24 32.8-8 32.8 8.8z"/>
                    </svg>
                  </div>
                  <span class="burger__ingredients-item-title">Meat</span>
                </li>
                <li class="burger__ingredients-item burger__ingredients-item--flag">
                  <div class="burger__ingredients-item-inner js-flag">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.2 499.2">
                      <ellipse cx="249.6" cy="115.2" fill="#c98028" rx="32" ry="8"/>
                      <path fill="#562306" d="M257.6 107.2c0 4.8-4 8-8 8s-8-4-8-8V8c0-4.8 4-8 8-8s8 4 8 8v99.2z"/>
                      <path fill="#f73939" d="M257.6 7.2v65.6L334.4 40z"/>
                      <path fill="#d32e26" d="M257.6 37.6v35.2L334.4 40z"/>
                    </svg>
                  </div>
                  <span class="burger__ingredients-item-title">Flag</span>
                </li>
                <li class="burger__ingredients-item burger__ingredients-item--buns-bottom">
                  <div class="burger__ingredients-item-inner js-buns-bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.2 499.2">
                      <path fill="#a56016"
                            d="M460.8 432.8c0 58.4-94.4 66.4-211.2 66.4s-211.2-8.8-211.2-66.4 94.4-51.2 211.2-51.2 211.2-7.2 211.2 51.2z"/>
                      <path fill="#d38d31"
                            d="M460.8 432.8c0 58.4-94.4 66.4-211.2 66.4s-211.2-8.8-211.2-66.4 94.4-21.6 211.2-21.6 211.2-36.8 211.2 21.6z"/>
                      <path fill="#c67822" d="M249.6 411.2c116.8 0 211.2-36 211.2 21.6s-94.4 66.4-211.2 66.4"/>
                      <path fill="#e5a641"
                            d="M113.6 450.4c-4.8 11.2-22.4 15.2-38.4 8.8-16.8-6.4-26.4-20-21.6-30.4C58.4 417.6 76 413.6 92 420c16 5.6 26.4 19.2 21.6 30.4z"/>
                      <g fill="#e5a641">
                        <ellipse cx="161.6" cy="427.2" rx="12.8" ry="4.8"/>
                        <ellipse cx="200" cy="457.6" rx="12.8" ry="4.8"/>
                        <ellipse cx="222.4" cy="435.2" rx="12.8" ry="4.8"/>
                      </g>
                      <g fill="#a56016">
                        <ellipse cx="340" cy="436" rx="12.8" ry="4.8"/>
                        <ellipse cx="297.6" cy="460.8" rx="12.8" ry="4.8"/>
                        <ellipse cx="380" cy="463.2" rx="12.8" ry="4.8"/>
                      </g>
                    </svg>
                  </div>
                  <span class="burger__ingredients-item-title">Buns</span>
                </li>
                <li class="burger__ingredients-item burger__ingredients-item--chees">
                  <div class="burger__ingredients-item-inner js-chees">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.2 499.2">
                      <path fill="#ffd400"
                            d="M447.2 309.6c0 11.2-10.4 20-22.4 20H74.4c-12.8 0-22.4-8.8-22.4-20s10.4-20 22.4-20h350.4c12 0 22.4 8.8 22.4 20z"/>
                      <path fill="#ffb000" d="M447.2 308.8c0 11.2-10.4 20.8-22.4 20.8H74.4c-12.8 0-22.4-8.8-22.4-20.8"/>
                    </svg>
                  </div>
                  <span class="burger__ingredients-item-title">Cheese</span>
                </li>
                <li class="burger__ingredients-item burger__ingredients-item--salad">
                  <div class="burger__ingredients-item-inner js-salad">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.2 499.2">
                      <path fill="#52a305"
                            d="M140.8 284.8S67.2 247.2 32 262.4c-34.4 16-20 48.8-2.4 50.4 0 0-8.8 16.8 1.6 22.4s12 2.4 12 2.4-12.8 6.4-9.6 28.8S74.4 396 80.8 340c4-34.4 48-46.4 48-46.4l22.4-1.6-10.4-7.2z"/>
                      <path fill="#448400"
                            d="M80.8 340.8c4-34.4 48-46.4 48-46.4l22.4-1.6-9.6-8s-35.2-18.4-68.8-24c-14.4-2.4-28.8-2.4-40 2.4"/>
                      <g fill="#76ce19">
                        <path
                          d="M35.2 268.8c2.4 1.6 0 7.2-4 12.8-4.8 5.6-10.4 8-12 6.4-2.4-1.6 0-7.2 4-12.8 4.8-4.8 9.6-8 12-6.4zM42.4 295.2c2.4.8 3.2 4.8 1.6 10.4-1.6 5.6-4 9.6-6.4 8.8s-3.2-5.6-1.6-10.4 4-8.8 6.4-8.8zM50.4 340.8c2.4.8.8 5.6-1.6 10.4-3.2 4.8-7.2 8-8.8 7.2s-1.6-5.6 1.6-10.4c3.2-5.6 7.2-8.8 8.8-7.2z"/>
                      </g>
                    </svg>
                  </div>
                  <span class="burger__ingredients-item-title">Salad</span>
                </li>
                <li class="burger__ingredients-item burger__ingredients-item--buns-top">
                  <div class="burger__ingredients-item-inner js-buns-top">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.2 499.2">
                      <path fill="#c98028"
                            d="M465.6 217.6c0 68-96.8 49.6-216 49.6s-216 18.4-216-49.6 96.8-124 216-124 216 55.2 216 124z"/>
                      <path fill="#e5a641"
                            d="M465.6 217.6c0 68-96.8-1.6-216-1.6s-216 69.6-216 1.6 96.8-124 216-124 216 55.2 216 124z"/>
                      <path fill="#d89636" d="M249.6 93.6c119.2 0 216 55.2 216 124 0 68-96.8-1.6-216-1.6"/>
                      <g fill="#d38d31">
                        <ellipse cx="188.8" cy="131.2" rx="15.2" ry="5.6"/>
                        <ellipse cx="229.6" cy="158.4" rx="15.2" ry="5.6"/>
                      </g>
                      <g fill="#e5a641">
                        <ellipse cx="318.4" cy="154.4" rx="15.2" ry="5.6"/>
                        <ellipse cx="288" cy="125.6" rx="11.2" ry="4"/>
                        <ellipse cx="383.2" cy="183.2" rx="11.2" ry="4"/>
                      </g>
                      <ellipse cx="146.4" cy="157.6" fill="#d38d31" rx="11.2" ry="4"/>
                      <path fill="#f2c56d"
                            d="M119.2 150.4c8 7.2 0 27.2-18.4 44s-40 25.6-48 17.6c-8-7.2 0-27.2 18.4-44s40-24.8 48-17.6z"/>
                    </svg>
                  </div>
                  <span class="burger__ingredients-item-title">Buns</span>
                </li>
                <li class="burger__ingredients-item burger__ingredients-item--egg">
                  <div class="burger__ingredients-item-inner js-egg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499.2 499.2">
                      <path fill="#fff"
                            d="M440.8 280.8c0 16.8-85.6 8-191.2 8s-191.2 8.8-191.2-8 85.6-31.2 191.2-31.2 191.2 14.4 191.2 31.2z"/>
                      <path fill="#e2d9c5" d="M249.6 249.6c105.6 0 191.2 13.6 191.2 30.4s-85.6 8-191.2 8"/>
                      <path fill="#ffb000"
                            d="M349.6 252.8c0 16-44.8 7.2-100 7.2s-100 8.8-100-7.2 44.8-28.8 100-28.8c55.2.8 100 13.6 100 28.8z"/>
                      <path fill="#ff8b00" d="M249.6 224.8c55.2 0 100 12.8 100 28.8s-44.8 7.2-100 7.2"/>
                      <path fill="#ffd400"
                            d="M234.4 233.6c.8 3.2-10.4 8.8-24.8 11.2-14.4 2.4-26.4 1.6-27.2-1.6-.8-3.2 10.4-8.8 24.8-11.2 14.4-2.4 26.4-1.6 27.2 1.6z"/>
                      <path fill="#fff"
                            d="M123.2 290.4s9.6-1.6 14.4 7.2c4 8.8 15.2 8.8 31.2 2.4 15.2-6.4 21.6-.8 29.6 8.8 8 9.6 20-12.8 27.2-4s12.8 12.8 15.2 15.2c6.4 5.6 8.8 0 8.8 0v-39.2l-81.6-7.2-24 9.6-20.8 7.2z"/>
                      <path fill="#e2d9c5"
                            d="M376 290.4s-9.6-1.6-14.4 7.2c-4 8.8-15.2 8.8-31.2 2.4-15.2-6.4-21.6-.8-29.6 8.8-8 9.6-20-12.8-27.2-4s-12.8 12.8-15.2 15.2c-6.4 5.6-8.8 0-8.8 0v-39.2l81.6-7.2 24 9.6 20.8 7.2z"/>
                    </svg>
                  </div>
                  <span class="burger__ingredients-item-title">Egg</span>
                </li>
              </ul>
              <!--/Burger ingredients-->

            </div>
            <!--/Burger wrapp-->
          </div>

        </main>

      </div>
    </VCol>
  </VRow>

</template>

