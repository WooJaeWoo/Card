$(document).ready(function() {
	CARD.init();
});

var UTIL = {
	"PAGE_COUNT" : 1
};

//TODO: box 개수가 바뀔 수도 있음...
//TODO: info를 배열로 넣을 수 있게 object template 만들기
/* 기본 아이디어
template = function (data) {
    return {
        name: "Alfred",
        stats: {
            age: 32,
            position: {
                level: 10,
                title: data.title
            }
        }
    }
}
*/

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
				"length" : 0,
                "tag" : "nobr"
			},
            "from" : "left"
		},
		"box2" : {
			"id" : "box2",
			"grid" : {
				"col" : "c1",
				"row" : "r3",
				"margin" : ""
			},
			"text" : {
				"contents" : "굳굳",
				"length" : 0,
                "tag" : "span"
			},
            "from" : "top"
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
				"length" : 0,
                "tag" : "nobr"
			},
            "from" : "bottom"
		}
	},
    "page2" : {
		"bgColor" : "#CD1FA3",
		"box1" : {
			"id" : "box1",
			"grid" : {
				"col" : "c1",
				"row" : "r4",
				"margin" : ""
			},
			"text" : {
				"contents" : "요구사항이",
				"length" : 0,
                "tag" : "span"
			},
            "from" : "left"
		},
		"box2" : {
			"id" : "box2",
			"grid" : {
				"col" : "c2",
				"row" : "r4",
				"margin" : ""
			},
			"text" : {
				"contents" : "야호",
				"length" : 0,
                "tag" : "nobr"
			},
            "from" : "top"
		},
		"box3" : {
			"id" : "box3",
			"grid" : {
				"col" : "c1",
				"row" : "r4",
				"margin" : ""
			},
			"text" : {
				"contents" : "드럽군요ㅋ",
				"length" : 0,
                "tag" : "span"
			},
            "from" : "bottom"
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

		//TODO: easein animation

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
		this.setText(targetBox.children(), boxInfo.text);
		this.setGrid(targetBox, boxInfo.grid);
		this.scaleText(targetBox.children(), boxInfo);
	},
	setGrid : function(box, grid) {
		box.addClass(grid.col).addClass(grid.row).addClass(grid.margin);
	},
	setText : function(box, text) {
        //attach text on <nobr> or <span> tag
        var textTag = $(document.createElement(text.tag));
        textTag.text(text.contents);
		box.append(textTag);
		text.length = text.contents.length;
	},
	scaleText : function(text, boxInfo) {
        var textLenghth = parseFloat(boxInfo.text.length);
        var col = parseFloat(boxInfo.grid.col.substring(1,2));
        var row = parseInt(boxInfo.grid.row.substring(1,2));
        if (boxInfo.text.tag === "span") {
            text.css("transform", "scaleY(" + row/textLenghth + ")");
        } else {
            text.css("transform", "scale(" + col/textLenghth + "," + row + ")").css("padding", "2px 4px");
        }
	},
	clearPage : function() {
		for (var i = 1; i <= 3; i++) {
            $("#box" + i).removeClass();
            $("#box" + i + " p").empty();
		}
        //TODO: easeout animation
	}
};