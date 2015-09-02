$(document).ready(function() {
	CARD.init();
});

var UTIL = {
	"PAGE_COUNT" : 1
};

//TODO: box 개수가 바뀔 수도 있음...
var INFO = {
	"page1" : {
		"bgColor" : "#FF9F93",
		"box1" : {
			"id" : "box1",
			"grid" : {
				"col" : "c3",
				"row" : "r3",
				"margin" : ""
			},
			"text" : {
				"contents" : "안녕",
				"length" : 0
			}
		},
		"box2" : {
			"id" : "box2",
			"grid" : {
				"col" : "c1",
				"row" : "r3",
				"margin" : ""
			},
			"text" : {
				"contents" : "굳",
				"length" : 0
			}
		},
		"box3" : {
			"id" : "box3",
			"grid" : {
				"col" : "c4",
				"row" : "r1",
				"margin" : ""
			},
			"text" : {
				"contents" : "헬로반가워",
				"length" : 0
			}
		}
	}
};


var CARD = {
	init : function() {
		console.log("START");
		var pages = Object.keys(INFO).length;
		$("main").on("click", function() {
			console.log("PAGE: " + UTIL.PAGE_COUNT);
			this.clearPage();
			this.setPage(INFO["page" + UTIL.PAGE_COUNT]);
			UTIL.PAGE_COUNT++;
			
			//END
			if (UTIL.PAGE_COUNT > pages) {
				$("main").off()
				console.log("END");
			}
		}.bind(this));
	},
	setPage : function(page) {
		//Page Background
		this.setBgColor(page.bgColor);

		//TODO: CSS 애니메이션 추가

		//each Box setting
		for (var i = 1; i <= 3; i++) {
			this.setBox(page["box" + i]);
		}
	},
	setBgColor : function(bgColor) {
		$("main").css("background-color", bgColor);
	},
	setBox : function(boxInfo) {
		var targetBox = $("#" + boxInfo.id);
		this.setText(targetBox, boxInfo.text);
		this.setGrid(targetBox, boxInfo.grid);
		this.scaleText(targetBox.children(), boxInfo);
	},
	setGrid : function(box, grid) {
		box.addClass(grid.col).addClass(grid.row).addClass(grid.margin);
	},
	setText : function(box, text) {
		box.children().text(text.contents);
		text.length = text.contents.length;
	},
	scaleText : function(text, boxInfo) {

	},
	clearPage : function() {
		for (var i = 1; i <= 3; i++) {
			$("#box" + i).removeClass();
		}
	}
};