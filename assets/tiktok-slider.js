
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slidev8");

    slides.forEach(slide => {
        const playButton = slide.querySelector(".play-buttonv8");
        const pauseButton = slide.querySelector(".pause-buttonv8");
        const video = slide.querySelector("video");

        let hidePauseButtonTimeout;

        const showPauseButton = () => {
            pauseButton.classList.remove("hiddenv8");
            clearTimeout(hidePauseButtonTimeout);
            hidePauseButtonTimeout = setTimeout(() => {
                pauseButton.classList.add("hiddenv8");
            }, 1000);
        };

        playButton.addEventListener("click", () => {
            document.querySelectorAll("video").forEach(v => {
                if (v !== video) {
                    v.pause();
                    v.classList.remove("playingv8");
                }
            });

            video.play();
            video.classList.add("playingv8");
            playButton.style.display = "none";
            pauseButton.style.display = "flex";
            showPauseButton();
        });

        pauseButton.addEventListener("click", () => {
            video.pause();
            video.classList.remove("playingv8");
            playButton.style.display = "flex";
            pauseButton.style.display = "none";
        });

        video.addEventListener("mousemove", showPauseButton);
        video.addEventListener("click", showPauseButton);

        video.addEventListener("play", () => {
            playButton.style.display = "none";
            pauseButton.style.display = "flex";
            showPauseButton();
        });

        video.addEventListener("pause", () => {
            playButton.style.display = "flex";
            pauseButton.style.display = "none";
        });
    });
});
