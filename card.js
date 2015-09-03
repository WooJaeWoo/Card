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
//boxTemplate([id, grid.col, grid.row, grid.margin, text.content, text.length, text.tag, from]);
boxTemplate(["box1", "c3", "r3", "", "안녕", 0, "nobr", "left"]);
boxTemplate(["box2", "c3", "r3", "", "안녕", 0, "nobr", "left"]);
boxTemplate(["box3", "c3", "r3", "", "안녕", 0, "nobr", "left"]);

var boxTemplate = function(boxData) {
    return {
        "id" : boxData[0],
        "grid" : {
            "col" : boxData[1],
            "row" : boxData[2],
            "margin" : boxData[3]
        },
        "text" : {
            "contents" : boxData[4],
            "length" : boxData[5],
            "tag" : boxData[6]
        },
        "from" : boxData[7]
    }
}
var INFO = {
	"page1" : {
		"bgColor" : "#FF9F93",
        "angle" : "18deg",
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
        "angle" : "-12deg",
		"box1" : {
			"id" : "box1",
			"grid" : {
				"col" : "c1",
				"row" : "r4",
				"margin" : ""
			},
			"text" : {
				"contents" : "내이름은",
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
				"contents" : "우재우",
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
				"contents" : "입니다",
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
        this.setAngle(page.angle);
        
		//TODO: easein animation

        
		//each Box setting
		for (var i = 1; i <= 3; i++) {
			this.setBox(page["box" + i]);
		}
	},
	setBgColor : function(bgColor) {
		$("main").css("background-color", bgColor);
	},
    setAngle : function(angle) {
        $(".cardGrid").css("transform", "rotate(" + angle + ")");
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