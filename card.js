$(document).ready(function() {
	CARD.init();
});

var UTIL = {
    rand : function(limit) {
        return Math.floor(Math.random() * limit);
    },
    isMobile : function() {
        var isMobile = false;
        // device detection
 if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
            isMobile = true;
        }
        return isMobile;
    }
};


var CARD = {
	init : function() {
		console.log("START");
        PAGE.init();

		$("body").on("click", function() {
			if (PAGE.PAGE_COUNT === 0) {
                $("nav").addClass("blur");
                $("nav").one("transitionend", function() {
                    $("nav").css("display", "none");
                });
            } else {
                PAGE.clearPage();
            }
            
            //END condition
            if (PAGE.PAGE_COUNT >= PAGE.getTotalPage()) {
                this._endEvent();
                return;
			}
            
            PAGE.PAGE_COUNT++;
            console.log("PAGE: " + PAGE.PAGE_COUNT);
            
            PAGE.setPage(CONTENTS["page" + PAGE.PAGE_COUNT]);
            
		}.bind(this));
	},
    _endEvent : function() {
        
        $("body").off();
        $("nav").css("display", "block");
        $("nav").css("opacity");
        $("nav").removeClass("blur");
        $("h3").text("END");
		$("#retryButton").css("display", "inline").one("click", function() {
            this.init();
        }.bind(this));
        console.log("END");
    }
};

var PAGE = {
    PAGE_COUNT : 0,
    PAGE_COLORS : ["#FF9F93", "#EF9A9A", "#CDAFA3", "#E1BEE7", "#9FA8DA", "#90CAF9", "#DCE775", "#FFCC80", "#FFCA28", "#FFAB91"],
    init : function() {
        this.PAGE_COUNT = 0;
        
        var startText = "";
        if (UTIL.isMobile()) {
            startText = "TOUCH TO START";
        } else {
            startText = "CLICK TO START";
        }
        $("h3").text(startText);
        
        var nav = $("nav");
        nav.removeClass("blur");
        
        $("#retryButton").css("display", "none");
    },
    getTotalPage : function() {
        return Object.keys(CONTENTS).length;
    },
    clearPage : function() {
        //BOX.animateOut();
        $(".row").empty();
	},
    setPage : function(page) {
		//Page Background
		this._setBgColor(page.bgColor);
        
		//each Box setting
		for (var i = 1; i <= BOX.getTotalPage(this.PAGE_COUNT); i++) {
            BOX.BOX_COUNT = i;
			BOX.addBox(page["box" + i]);
            BOX.animateIn($("#box" + i));
		}
        BOX.BOX_COUNT = 0;
	},
    _setBgColor : function() {
        var colorIndex = UTIL.rand(this.PAGE_COLORS.length);
		$("main").css("background-color", this.PAGE_COLORS[colorIndex]);
	}
}

var BOX = {
    BOX_COUNT : 0,
    getTotalPage : function(pageNum) {
        return Object.keys(CONTENTS["page" + pageNum]).length;
    },
    addBox : function(boxInfo) {
        this._setBoxInfo(boxInfo);
        
        $(".row").append(this._boxTemplate(boxInfo));
        
		this._scaleText($("#" + boxInfo.id).children(), boxInfo);
	},
    animateIn : function(box) {
        //add transition-delay by boxId
        var delay = box.attr("id").substring(3,4) * 0.4;
        box.css("transition-delay", delay + "s");

        //delay start 400ms
        setTimeout(function() {
            box.removeClass("left")
               .removeClass("top")
               .removeClass("right")
               .removeClass("bottom");
        }, 400);
    },
    animateOut : function() {
        $("#spinBox").addClass("spinning");
    },
    _setBoxInfo : function(boxInfo) {
        this._setBoxId(boxInfo);
        this._setTextDirection(boxInfo);
        this._setTextLength(boxInfo.text);

    },
    _setFrom : function(boxInfo) {
        $("#" + boxInfo.id).data("from", boxInfo.from);
    },
    _setBoxId : function(boxInfo) {
        boxInfo.id = "box" + this.BOX_COUNT;
    },
    _setTextDirection : function(boxInfo) {
        //vertical = "span" / horisontal = "nobr"
        var col = parseInt(boxInfo.grid.col.substring(1,2));
        if (col === 1) {
            boxInfo.text.tag = "span"
        } else {
            boxInfo.text.tag = "nobr"
        }
    },
    _boxTemplate : function(boxInfo) {
        var template = $("#" + boxInfo.text.tag + "Template").html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, {
            boxId: boxInfo.id,
            col: boxInfo.grid.col,
            row: boxInfo.grid.row,
            margin: boxInfo.grid.margin,
            from: boxInfo.from,
            boxText: boxInfo.text.contents
        });
        return rendered;   
    },
    _setTextLength : function(text) {
        text.length = text.contents.length;
	},
	_scaleText : function(text, boxInfo) {
        var textLenghth = parseFloat(boxInfo.text.length);
        var col = parseFloat(boxInfo.grid.col.substring(1,2));
        var row = parseInt(boxInfo.grid.row.substring(1,2));
        if (boxInfo.text.tag === "span") {
            text.css("transform", "scaleY(" + row/textLenghth + ")");
        } else {
            text.css("transform", "scale(" + col/textLenghth + "," + row + ")")
                .css("padding", "2px 3px");
        }
	},
    boxInfomation : function(boxData) {
        return {
            "id" : "",
            "grid" : {
                "col" : boxData[0],
                "row" : boxData[1],
                "margin" : boxData[2]
            },
            "text" : {
                "contents" : boxData[3],
                "length" : 0,
                "tag" : ""
            },
            "from" : boxData[4]
        }
    }
}

//BOX.boxInfomation([grid.col, grid.row, grid.margin, text.content, from]);
var CONTENTS = {
    "page1" : {
		"box1" : BOX.boxInfomation(["c3", "r3", "", "안녕", "left"]),
		"box2" : BOX.boxInfomation(["c1", "r3", "", "반가워", "top"]),
		"box3" : BOX.boxInfomation(["c4", "r1", "", "헬로월드", "bottom"])
	},
    "page2" : {
        "box1" : BOX.boxInfomation(["c1", "r4", "", "시간차를", "left"]),
		"box2" : BOX.boxInfomation(["c3", "r1", "", "어떻게", "top"]),
		"box3" : BOX.boxInfomation(["c3", "r3", "", "둘것인가", "right"])
	},
    "page3" : {
        "box1" : BOX.boxInfomation(["c2", "r2", "", "나", "top"]),
		"box2" : BOX.boxInfomation(["c2", "r2", "", "너", "right"]),
		"box3" : BOX.boxInfomation(["c4", "r1", "", "우리", "left"]),
        "box4" : BOX.boxInfomation(["c4", "r1", "", "호오잇!", "bottom"])
	}
};