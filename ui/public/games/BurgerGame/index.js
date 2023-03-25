parent.postMessage({name: "gameEvent", score: 0, resetTime:true}, "*")
function goodBurger() {
    let ingredientsTitle = "",
        meatBtn = $(".js-meat"),
        flagBtn = $(".js-flag"),
        bunsTopBtn = $(".js-buns-top"),
        bunsBottomBtn = $(".js-buns-bottom"),
        cheesBtn = $(".js-chees"),
        saladBtn = $(".js-salad"),
        eggBtn = $(".js-egg"),
        info = $(".js-info"),
        infoText = $(".js-info-text"),
        burgerCircle = $(".js-circle");

    function _ingredientsAnimation(
        btn,
        prevIngredientsTitle,
        target,
        currentIngredientsTitle
    ) {
        btn.on("click", function () {
            if (ingredientsTitle == prevIngredientsTitle) {
                TweenMax.fromTo(
                    target,
                    0.8,
                    {
                        y: "-100%",
                        autoAlpha: 0
                    },
                    {
                        y: "0%",
                        autoAlpha: 1,
                        ease: "bounce"
                    }
                );


                ingredientsTitle = currentIngredientsTitle;
                btn.addClass("is-disabled");
                infoText.text("You are on the right path :)");
                info.removeClass("error");
                info.addClass("correct");
                if (ingredientsTitle == "flag") {
                    burgerCircle.addClass("finished");
                    infoText.text("Good Job, that burger looks delicious!...")
                    setTimeout(function () {
                        parent.postMessage({name: "gameEvent", time: 1, nextRound: 3}, "*")
                    }, 3000);
                }
            } else {
                info.removeClass("correct");
                info.addClass("error");
                infoText.text("Hmm, that looks to be the wrong order. Try again :)");
                TweenMax.to(info, 0.06, {
                    x: "+=10",
                    yoyo: true,
                    repeat: 10,
                    onComplete: function () {
                        TweenMax.set(info, {clearProps: "all"});
                    }
                });
            }
        });
    }

    _ingredientsAnimation(bunsBottomBtn, "", ".buns-bottom", "buns-bottom");
    _ingredientsAnimation(meatBtn, "buns-bottom", ".meat", "meat");
    _ingredientsAnimation(flagBtn, "buns-top", ".flag", "flag");
    _ingredientsAnimation(bunsTopBtn, "salad", ".buns-top", "buns-top");
    _ingredientsAnimation(cheesBtn, "meat", ".cheese", "cheese");
    _ingredientsAnimation(saladBtn, "egg", ".salad", "salad");
    _ingredientsAnimation(eggBtn, "cheese", ".egg", "egg");
}

goodBurger();
