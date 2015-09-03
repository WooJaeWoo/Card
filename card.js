$(document).ready(function() {
	CARD.init();
});

var UTIL = {
	"PAGE_COUNT" : 1,
    boxTemplate : function(boxData) {
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
};

//TODO: box 개수가 바뀔 수도 있음...

//boxTemplate([id, grid.col, grid.row, grid.margin, text.content, text.length, text.tag, from]);
var INFO = {
	"page1" : {
		"bgColor" : "#FF9F93",
        "angle" : "18deg",
		"box1" : UTIL.boxTemplate(["box1", "c3", "r3", "", "안녕", 0, "nobr", "left"]),
		"box2" : UTIL.boxTemplate(["box2", "c1", "r3", "", "반가워", 0, "span", "top"]),
		"box3" : UTIL.boxTemplate(["box3", "c4", "r1", "", "헬로월드", 0, "nobr", "bottom"])
	},
    "page2" : {
		"bgColor" : "#CDAFA3",
        "angle" : "-12deg",
        "box1" : UTIL.boxTemplate(["box1", "c1", "r4", "", "시간차를", 0, "span", "left"]),
		"box2" : UTIL.boxTemplate(["box2", "c3", "r1", "", "어떻게", 0, "nobr", "top"]),
		"box3" : UTIL.boxTemplate(["box3", "c3", "r3", "", "둘것인가", 0, "nobr", "right"])
	},
    "page3" : {
		"bgColor" : "#D2D111",
        "angle" : "-12deg",
        "box1" : UTIL.boxTemplate(["box1", "c4", "r1", "", "자바스크립트", 0, "nobr", "right"]),
		"box2" : UTIL.boxTemplate(["box2", "c2", "r3", "", "엄청", 0, "nobr", "left"]),
		"box3" : UTIL.boxTemplate(["box3", "c2", "r3", "", "재밌다", 0, "nobr", "bottom"])
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
        this.setDirectionFrom(targetBox, boxInfo.from);
		this.setText(targetBox.children(), boxInfo.text);
		this.setGrid(targetBox, boxInfo.grid);
		this.scaleText(targetBox.children(), boxInfo);
	},
    setDirectionFrom : function(box, direction) {
        box.addClass("from" + direction);
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
            $("#box" + i).css("animation-name");
		}
        //TODO: easeout animation
	}
};