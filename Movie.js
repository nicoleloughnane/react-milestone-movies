"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movie = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Movie = /*#__PURE__*/function () {
  function Movie(id, title, genre, year_released, rating, image, video) {
    (0, _classCallCheck2["default"])(this, Movie);
    (0, _defineProperty2["default"])(this, "id", -1);
    (0, _defineProperty2["default"])(this, "title", "");
    (0, _defineProperty2["default"])(this, "genre", "");
    (0, _defineProperty2["default"])(this, "year_released", 1984);
    (0, _defineProperty2["default"])(this, "rating", 100);
    (0, _defineProperty2["default"])(this, "image", "");
    (0, _defineProperty2["default"])(this, "video", "");
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.year_released = year_released;
    this.rating = rating;
    this.image = image;
    this.video = video;
  }

  (0, _createClass2["default"])(Movie, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Genre",
    get: function get() {
      return this.genre;
    },
    set: function set(genre) {
      this.genre = genre;
    }
  }, {
    key: "Title",
    get: function get() {
      return this.title;
    },
    set: function set(title) {
      this.title = title;
    }
  }, {
    key: "Year_Released",
    get: function get() {
      return this.year_released;
    },
    set: function set(year_released) {
      this.year_released = year_released;
    }
  }, {
    key: "Rating",
    get: function get() {
      return this.rating;
    },
    set: function set(rating) {
      this.rating = rating;
    }
  }, {
    key: "Image",
    get: function get() {
      return this.image;
    },
    set: function set(value) {
      this.image = value;
    }
  }, {
    key: "Video",
    get: function get() {
      return this.video;
    },
    set: function set(value) {
      this.video = value;
    }
  }]);
  return Movie;
}();

exports.Movie = Movie;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvTW92aWUudHMiXSwibmFtZXMiOlsiTW92aWUiLCJpZCIsInRpdGxlIiwiZ2VucmUiLCJ5ZWFyX3JlbGVhc2VkIiwicmF0aW5nIiwiaW1hZ2UiLCJ2aWRlbyIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFBYUEsSztBQVVULGlCQUFZQyxFQUFaLEVBQXVCQyxLQUF2QixFQUFxQ0MsS0FBckMsRUFBbURDLGFBQW5ELEVBQTBFQyxNQUExRSxFQUEwRkMsS0FBMUYsRUFBeUdDLEtBQXpHLEVBQ0E7QUFBQTtBQUFBLGlEQVRxQixDQUFDLENBU3RCO0FBQUEsb0RBUndCLEVBUXhCO0FBQUEsb0RBUHdCLEVBT3hCO0FBQUEsNERBTmdDLElBTWhDO0FBQUEscURBTHlCLEdBS3pCO0FBQUEsb0RBSndCLEVBSXhCO0FBQUEsb0RBSHdCLEVBR3hCO0FBQ0ksU0FBS04sRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDRjs7OztTQUVGLGVBQ0E7QUFDSSxhQUFPLEtBQUtOLEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUNBO0FBQ0ksV0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtFLEtBQVo7QUFDSCxLO1NBQ0QsYUFBVUEsS0FBVixFQUNBO0FBQ0ksV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtELEtBQVo7QUFDSCxLO1NBQ0QsYUFBVUEsS0FBVixFQUNBO0FBQ0ksV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtFLGFBQVo7QUFDSCxLO1NBQ0QsYUFBa0JBLGFBQWxCLEVBQ0E7QUFDSSxXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxNQUFaO0FBQ0gsSztTQUNELGFBQVdBLE1BQVgsRUFDQTtBQUNJLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIOzs7U0FDRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxLQUFaO0FBQ0gsSztTQUNELGFBQWlCRSxLQUFqQixFQUNBO0FBQ0ksV0FBS0YsS0FBTCxHQUFhRSxLQUFiO0FBQ0g7OztTQUNELGVBQ0E7QUFDSSxhQUFPLEtBQUtELEtBQVo7QUFDSCxLO1NBQ0QsYUFBaUJDLEtBQWpCLEVBQ0E7QUFDSSxXQUFLRCxLQUFMLEdBQWFDLEtBQWI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNb3ZpZVxyXG57XHJcbiAgICBwcml2YXRlIGlkOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgdGl0bGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGdlbnJlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSB5ZWFyX3JlbGVhc2VkOiBudW1iZXIgPSAxOTg0O1xyXG4gICAgcHJpdmF0ZSByYXRpbmc6IG51bWJlciA9IDEwMDtcclxuICAgIHByaXZhdGUgaW1hZ2U6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHZpZGVvOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIHRpdGxlOnN0cmluZywgZ2VucmU6c3RyaW5nLCB5ZWFyX3JlbGVhc2VkOiBudW1iZXIsIHJhdGluZzogbnVtYmVyLCBpbWFnZTogc3RyaW5nLCB2aWRlbzogc3RyaW5nIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZ2VucmUgPSBnZW5yZTtcclxuICAgICAgICB0aGlzLnllYXJfcmVsZWFzZWQgPSB5ZWFyX3JlbGVhc2VkO1xyXG4gICAgICAgIHRoaXMucmF0aW5nID0gcmF0aW5nO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICB0aGlzLnZpZGVvID0gdmlkZW87XHJcbiAgICAgfVxyXG5cclxuICAgIGdldCBJZCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG4gICAgc2V0IElkKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEdlbnJlKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VucmU7XHJcbiAgICB9XHJcbiAgICBzZXQgR2VucmUoZ2VucmU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZ2VucmUgPSBnZW5yZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVGl0bGUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aXRsZTtcclxuICAgIH1cclxuICAgIHNldCBUaXRsZSh0aXRsZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBZZWFyX1JlbGVhc2VkKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueWVhcl9yZWxlYXNlZDtcclxuICAgIH1cclxuICAgIHNldCBZZWFyX1JlbGVhc2VkKHllYXJfcmVsZWFzZWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMueWVhcl9yZWxlYXNlZCA9IHllYXJfcmVsZWFzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFJhdGluZygpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhdGluZztcclxuICAgIH1cclxuICAgIHNldCBSYXRpbmcocmF0aW5nOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhdGluZyA9IHJhdGluZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSW1hZ2UoKTogc3RyaW5nIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJbWFnZSh2YWx1ZTogc3RyaW5nKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLmltYWdlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFZpZGVvKCk6IHN0cmluZyBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52aWRlbztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgVmlkZW8odmFsdWU6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZGVvID0gdmFsdWU7XHJcbiAgICB9XHJcbn0iXX0=