/* =========================================================
   PREMIUM PAGE CONTROLLER
========================================================= */

function showPage(pageId) {

    const currentPage =
        document.querySelector(".page.active");

    const nextPage =
        document.getElementById(pageId);


    if (!nextPage) {
        return;
    }


    if (currentPage === nextPage) {
        return;
    }


    /*
       Current page hide
    */

    if (currentPage) {

        currentPage.classList.remove("active");

    }


    /*
       Small delay creates
       smooth page transition
    */

    setTimeout(function () {

        nextPage.classList.add("active");


        /*
           Always scroll to top
        */

        nextPage.scrollTop = 0;

    }, 120);

}



/* =========================================================
   PAGE 1 → PAGE 2
========================================================= */

function nextPage() {

    showPage("page2");

}



/* =========================================================
   PAGE 2 → LOVE PAGE
========================================================= */

function chooseLove() {

    showPage("lovePage");

}



/* =========================================================
   PAGE 2 → MONEY PAGE
========================================================= */

function chooseMoney() {

    showPage("moneyPage");

}



/* =========================================================
   LOVE ANSWERS
========================================================= */

function loveAnswer(answer) {

    /*
       যেকোনো Love option select করলে
       First Memory page open হবে।

       পরে চাইলে প্রতিটা answer অনুযায়ী
       আলাদা message/animation যোগ করা যাবে।
    */

    showPage("memoryPage1");

}



/* =========================================================
   MONEY ANSWERS
========================================================= */

function moneyAnswer(answer) {

    /*
       যেকোনো Money option select করলে
       First Memory page open হবে।
    */

    showPage("memoryPage1");

}



/* =========================================================
   MEMORY 1 → MEMORY 2
========================================================= */

function showMemoryPage2() {

    showPage("memoryPage2");

}



/* =========================================================
   MEMORY 2 → MEMORY 3
========================================================= */

function showMemoryPage3() {

    showPage("memoryPage3");

}



/* =========================================================
   MEMORY 3 → FINAL MESSAGE
========================================================= */

function showFinalPage() {

    showPage("finalPage");

}



/* =========================================================
   FINAL MESSAGE → BIRTHDAY VIDEO
========================================================= */

function showBirthdayPage() {

    showPage("birthdayPage");

}



/* =========================================================
   3D CARD EFFECT
========================================================= */

function setup3DCard(cardId) {

    const card =
        document.getElementById(cardId);


    if (!card) {
        return;
    }


    /*
       Desktop mouse movement
    */

    card.addEventListener(
        "mousemove",
        function (event) {


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 7;


            const rotateX =
                ((centerY - y) / centerY) * 7;


            card.style.transform =
                `perspective(1100px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.025)`;


        }
    );



    /*
       Mouse leave
    */

    card.addEventListener(
        "mouseleave",
        function () {


            card.style.transform =
                "perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)";


        }
    );



    /*
       Mobile touch
    */

    card.addEventListener(
        "touchmove",
        function (event) {


            const touch =
                event.touches[0];


            const rect =
                card.getBoundingClientRect();


            const x =
                touch.clientX - rect.left;

            const y =
                touch.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 5;


            const rotateX =
                ((centerY - y) / centerY) * 5;


            card.style.transform =
                `perspective(1100px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.02)`;


        },
        {
            passive: true
        }
    );



    /*
       Mobile touch end
    */

    card.addEventListener(
        "touchend",
        function () {


            card.style.transform =
                "perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)";


        }
    );

}



/* =========================================================
   BIRTHDAY VIDEO
========================================================= */

function playBirthdayVideo() {

    const video =
        document.getElementById("birthdayVideo");

    const overlay =
        document.getElementById("videoOverlay");


    if (!video) {
        return;
    }


    /*
       Sound ON
    */

    video.muted = false;


    /*
       Play after user's click.
       This allows sound in modern browsers.
    */

    const playPromise =
        video.play();


    if (playPromise !== undefined) {

        playPromise
            .then(function () {


                /*
                   Hide custom play overlay
                */

                if (overlay) {

                    overlay.style.opacity = "0";

                    overlay.style.visibility =
                        "hidden";

                }


            })
            .catch(function (error) {


                console.log(
                    "Video play error:",
                    error
                );


            });

    }

}



/* =========================================================
   VIDEO ENDED
========================================================= */

function resetVideoOverlay() {

    const overlay =
        document.getElementById("videoOverlay");


    if (overlay) {

        overlay.style.opacity = "1";

        overlay.style.visibility =
            "visible";

    }

}



/* =========================================================
   INITIALIZE EVERYTHING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
           First memory card
        */

        setup3DCard("memoryCard1");


        /*
           Second memory card
        */

        setup3DCard("memoryCard2");


        /*
           Third memory card
        */

        setup3DCard("memoryCard3");


        /*
           Birthday video card
        */

        setup3DCard("birthdayVideoCard");



        /*
           Video reference
        */

        const video =
            document.getElementById("birthdayVideo");


        if (video) {


            /*
               When video finishes,
               show play overlay again.
            */

            video.addEventListener(
                "ended",
                function () {

                    resetVideoOverlay();

                }
            );


        }

    }
);