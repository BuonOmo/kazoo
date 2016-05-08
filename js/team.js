/*
 * team object
 */

function Team(dom_name, dom_score, dom_error_circles) {
    this.score = 0;
    this.errors = 0;

    this.dom_name = dom_name;
    this.dom_score = dom_score;
    this.dom_error_circles = dom_error_circles;

    this.setName = function(name) {
        this.dom_name.html(name);
    };

    this.scoreUp = function() {
        this.dom_score.html(++this.score);
    };

    this.scoreLow = function() {
        this.dom_score.html(--this.score);
    };

    this.setScore = function(score) {
        this.dom_score.html(score);
        this.score = score;
    };

    this.error = function() {
        this.dom_error_circles.slice(0, ++this.errors).addClass('error');
    };

    this.removeError = function() {
      this.errors--;
      this.dom_error_circles[this.errors%3].classList.remove('error');
    }
}
